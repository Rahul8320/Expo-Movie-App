import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function TrendingMovieCard({
  trendingMovie: { movie_id, poster_url, title },
  index,
}: TrendingCardProps) {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Link>
  );
}
