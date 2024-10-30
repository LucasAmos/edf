export default class RESTClient {
    async get(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // must use any as the shape of the reponse body is unknown
        const data = await response.json();
        return data;
    }
}
