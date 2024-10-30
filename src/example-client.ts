import BookSearchApiClient from "./BookSearchApiClient";

const client = new BookSearchApiClient(
  "https://mp7859b15f3c37214c93.free.beeceptor.com"
);

const booksByShakespeare = await client.getBooksByAuthor("Shakespeare", 10);
console.log(booksByShakespeare);
