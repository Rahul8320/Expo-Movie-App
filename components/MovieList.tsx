import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";
import MovieCard from "./MovieCard";

type IMovieListProps = {
  movies: Movie[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  listHeaderComponent?: React.JSX.Element;
  listEmptyComponent?: React.JSX.Element;
};

export default function MovieList({
  movies,
  contentContainerStyle,
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
      contentContainerStyle={contentContainerStyle}
      className="mt-2 pb-32"
      scrollEnabled={false}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={listEmptyComponent}
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
