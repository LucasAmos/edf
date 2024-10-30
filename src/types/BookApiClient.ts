import { Book } from "./Book";

export interface BookApiClient {
  getBooksByAuthor(authorName: string, limit: number): Promise<Book>;
}
