import RESTClient from "./client/rest";
export default class BookSearchApiClient {
    baseUrl;
    client;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.client = new RESTClient();
    }
    async getBooksByAuthor(authorName, limit) {
        const response = await this.client.get(`${this.baseUrl}/by-author?q=${authorName}&limit=${limit}&format=json`);
        return response;
    }
}
