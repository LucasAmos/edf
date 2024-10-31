# Javascript Code Test

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstrate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. **How could you easily add other book seller APIs in the the future**: create new
   types of BookSearchApiClient that implement the `BookApiClient` interface
2. **How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js**: as all of the APIs implement the `BookApiClient` interface they will each return the same shape response. Each implementation will be responsible for reshaping the response as necessary so that it matches the `Book` type
3. **How would you implement different query types for example: by publisher, by year published etc**: implement new functions on each `BookApiClient` implementation. If the new query type should be on all implementations add it to the interface definition
4. **How your code would be tested**: mock the fetch requests or the HTTP client
