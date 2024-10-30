import BookSearchApiClient from "./BookSearchApiClient";
const client = new BookSearchApiClient("https://mp7859b15f3c37214c93.free.beeceptor.com/");
const response = await client.getBooksByAuthor("Shakespeare", 10);
console.log(response);
// const booksByShakespeare = client.getBooksByAuthor("Shakespeare", 10);
