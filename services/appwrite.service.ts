import { Client, Databases, Query } from "react-native-appwrite";

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

  public updateSearchCount = async (query: string, movie: Movie) => {
    const documents = await this.getDocumentsByQuery(query);

    console.log(documents);
  };

  private getDocumentsByQuery = async (
    query: string
  ): Promise<TrendingMovie[] | undefined> => {
    const results = await this.database.listDocuments(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      [Query.equal("searchQuery", query)]
    );

    return results.documents as unknown as TrendingMovie[];
  };
}

export default new AppwriteService();
