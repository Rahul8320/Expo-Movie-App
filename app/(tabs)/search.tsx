import Background from "@/components/Background";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useState } from "react";
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
      <View className="px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-5 mb-10 mx-auto" />

        <SearchBar
          placeholder="Search a movie ..."
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          inputMode="search"
        />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="my-3" />
      )}

      {error && (
        <Text className="text-red-500 px-5 my-3">{error?.message}</Text>
      )}

      {!loading &&
        !error &&
        searchQuery.trim() &&
        movies &&
        movies.length > 0 && (
          <Text className="text-xl text-white font-bold">
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
}: {
  loading: boolean;
  error: Error | null;
}) => {
  return (
    <>
      {!loading && !error && (
        <Text className="text-gray-500 text-center mt-10">No movie found</Text>
      )}
    </>
  );
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: movies,
    loading,
    error,
  } = useFetch<Movie[]>(() => fetchMovies({ query: searchQuery }), false);

  return (
    <Background>
      <Text>Search</Text>

      <MovieList
        movies={movies ?? []}
        listHeaderComponent={
          <SearchHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            error={error}
            movies={movies}
          />
        }
        listEmptyComponent={<EmptyList error={error} loading={loading} />}
      />
    </Background>
  );
}
