import Background from "@/components/Background";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import appwriteService from "@/services/appwrite.service";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch<TrendingMovie[]>(appwriteService.getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>(() => fetchMovies({ query: "" }), true);

  return (
    <Background>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-12 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text className="text-red-500 text-center mt-10">
            {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              inputMode="none"
              onPress={() => router.push("/search")}
            />

            {trendingMovies && (
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  data={trendingMovies}
                  horizontal={true}
                  renderItem={({ item, index }) => (
                    <TrendingMovieCard trendingMovie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  className="mb-4 mt-3"
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </>
            )}

            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              {movies && <MovieList movies={movies} />}
            </>
          </View>
        )}
      </ScrollView>
    </Background>
  );
}
