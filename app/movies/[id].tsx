import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { formatDate } from "@/services/dateFormatService";
import { toFixedNumber } from "@/services/numberFormatService";
import { useFetch } from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

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
              {/* TODO: add date and full month name */}
              {formatDate(movieDetails?.release_date ?? "")}
            </Text>
            <Text className="text-sm text-light-200">
              {/* TODO: convert minutes to hours and minutes  */}
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

          {/* TODO: update this to billon or million as per number */}
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movieDetails?.budget &&
                `$${toFixedNumber(movieDetails?.budget / 1_000_000)} million`
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movieDetails?.revenue &&
                `$${toFixedNumber(movieDetails?.revenue / 1_000_000)} million`
              }
            />
          </View>

          {/* TODO: add logo, country name in list  */}
          <MovieInfo
            label="Production Companies"
            value={movieDetails?.production_companies
              ?.map((c) => c.name)
              .join(" - ")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
