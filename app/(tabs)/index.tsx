import Background from "@/components/Background";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
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

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-10 mb-5">
            {moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              inputMode="none"
              onPress={() => router.push("/search")}
            />

            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </Background>
  );
}
