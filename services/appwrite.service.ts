import { Client, Databases, ID, Query } from "react-native-appwrite";

type IMetric = {
  $id: string;
  searchQuery: string;
  movie_id: number;
  title: string;
  poster_url: string;
  count: number;
};

class AppwriteService {
  private PROJECT_ID: string = String(
    process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
  );
  private DATABASE_ID: string = String(
    process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
  );
  private COLLECTION_ID: string = String(
    process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID
  );

  private database: Databases;

  constructor() {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(this.PROJECT_ID);

    this.database = new Databases(client);
  }

  public updateSearchCount = async (
    query: string,
    movie: Movie
  ): Promise<void> => {
    try {
      const documents = await this.getDocumentsByQuery(query);

      if (documents.length == 0) {
        return await this.createDocument({
          searchQuery: query,
          movie_id: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          count: 1,
        });
      }

      const existingDocument = documents[0];

      return await this.updateDocument(
        { count: existingDocument.count + 1 },
        existingDocument.$id
      );
    } catch (err) {
      console.error(err);
    }
  };

  public getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    try {
      const results = await this.database.listDocuments(
        this.DATABASE_ID,
        this.COLLECTION_ID,
        [Query.limit(5), Query.orderDesc("count")]
      );

      return results.documents as unknown as TrendingMovie[];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  private getDocumentsByQuery = async (query: string): Promise<IMetric[]> => {
    const results = await this.database.listDocuments(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      [Query.equal("searchQuery", query)]
    );

    return results.documents as unknown as IMetric[];
  };

  private updateDocument = async (
    updatedContent: object,
    id: string
  ): Promise<void> => {
    await this.database.updateDocument(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      id,
      updatedContent
    );
    return;
  };

  private createDocument = async (movie: TrendingMovie): Promise<void> => {
    await this.database.createDocument(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      ID.unique(),
      movie
    );
    return;
  };
}

export default new AppwriteService();
