import { icons } from "@/constants/icons";
import { formatDate } from "@/services/dateFormatService";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function MovieCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  popularity,
  original_language,
}: Movie) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs font-bold text-white">
              {vote_average?.toFixed(1)}
            </Text>
          </View>

          <View>
            <Text className="text-xs font-bold text-white">
              👍 {Math.round(popularity)} %
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {formatDate(release_date)}
          </Text>
          <Text className="text-xs text-light-300 font-medium mt-1 uppercase">
            {original_language}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
