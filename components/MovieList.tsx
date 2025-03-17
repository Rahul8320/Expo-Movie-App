import { FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";

interface IMovieListProps {
  movies: Movie[];
  listHeaderComponent?: React.ReactElement;
  listEmptyComponent?: React.ReactElement;
}

export default function MovieList({
  movies,
  listHeaderComponent,
  listEmptyComponent,
}: IMovieListProps) {
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <MovieCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapperStyle}
      className="mt-2 pb-32"
      scrollEnabled={false}
      ListHeaderComponent={listHeaderComponent ?? null}
      ListEmptyComponent={listEmptyComponent ?? null}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: "flex-start",
    gap: 20,
    paddingRight: 5,
    marginBottom: 10,
  },
});
