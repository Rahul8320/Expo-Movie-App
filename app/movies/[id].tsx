import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { formatDate } from "@/services/dateFormatService";
import { useFetch } from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Image } from "react-native";

type MovieInfoProps = {
  label: string;
  value?: string | number | null;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-sm text-light-200 font-normal">{label}</Text>
    <Text className="text-sm text-light-100 font-bold mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const {
    data: movieDetails,
    loading,
    error,
  } = useFetch<MovieDetails>(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
          }}
          className="w-full h-[550px]"
          resizeMode="stretch"
        />

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-2xl font-bold text-white">
            {movieDetails?.title}
          </Text>

          <View className="flex-row items-center gap-x-4 mt-2">
            <Text className="text-sm text-light-200">
              {formatDate(movieDetails?.release_date ?? "")}
            </Text>
            <Text className="text-sm text-light-200">
              {movieDetails?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm font-bold">
              {Math.round(movieDetails?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movieDetails?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movieDetails?.overview} />
          <MovieInfo
            label="Genres"
            value={movieDetails?.genres?.map((g) => g.name).join(" - ")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
