import Background from "@/components/Background";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import appwriteService from "@/services/appwrite.service";
import { useFetch } from "@/services/useFetch";
import { useEffect, useState } from "react";
import { Text, Image, View, ActivityIndicator } from "react-native";

interface ISearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  loading: boolean;
  error: Error | null;
  movies: Movie[] | null;
}

const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  loading,
  error,
  movies,
}: ISearchHeaderProps) => {
  return (
    <>
      <View>
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-10 mx-auto" />

        <SearchBar
          placeholder="Search for a movie"
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          inputMode="search"
        />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="my-3" />
      )}

      {error && <Text className="text-red-500 my-3">{error?.message}</Text>}

      {!loading &&
        !error &&
        searchQuery.trim() &&
        movies &&
        movies.length > 0 && (
          <Text className="text-xl text-white font-bold mb-5">
            Search Results for{" "}
            <Text className="text-accent">{searchQuery.trim()}</Text>
          </Text>
        )}
    </>
  );
};

const EmptyList = ({
  loading,
  error,
  searchQuery,
}: {
  loading: boolean;
  error: Error | null;
  searchQuery: string;
}) => {
  return (
    <>
      {!loading && !error && (
        <View className="mt-10">
          <Text className="text-gray-500 text-center">
            {searchQuery.trim() ? "No results found" : "Search for a movie"}
          </Text>
        </View>
      )}
    </>
  );
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: movies,
    refetch: loadMovies,
    reset: resetMovies,
    loading,
    error,
  } = useFetch<Movie[]>(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetMovies();
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchQuery]);

  useEffect(() => {
    const func = async () => {
      if (!movies || movies.length == 0) {
        return;
      }

      await appwriteService.updateSearchCount(searchQuery, movies[0]);
    };

    func();
  }, [movies]);

  return (
    <Background>
      <View className="px-5">
        <MovieList
          movies={movies ?? []}
          contentContainerStyle={{ paddingBottom: 100 }}
          listHeaderComponent={
            <SearchHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              loading={loading}
              error={error}
              movies={movies}
            />
          }
          listEmptyComponent={
            <EmptyList
              error={error}
              loading={loading}
              searchQuery={searchQuery}
            />
          }
        />
      </View>
    </Background>
  );
}
