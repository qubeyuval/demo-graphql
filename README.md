# GraphQL Demo

### This is a very simplified GraphQL service on top of Mock REST API service consumed by a simple webapp
----------------------------------------------------

This demonstrates and compares GraphQL and REST API from the front-end point of view.

There are 3 layers in play:
- A mock REST API service.
- A GraphQL server.
- An Angular web application that consumes both services and compare between them.


## Setup

Clone this repo and open 3 terminals. Move into the local repo directory in each. Each terminal will be used to run a different service.
```
cd demo-graphql/
```

Install the rest-api service dependencies
```
cd rest-api/
npm install
```

Install the graphql service dependencies
```
cd graphql-server/
npm install
```

Install the webapp dependencies
```
cd webapp/
npm install
```

## Usage

After all dependencies installed, in each terminal, to start the service Run:
```
npm start
```

Open 3 browser tabs.

To see the mock rest-api endpoint and test it browse to:
<http://localhost:3000>

Notice how, if you want to get information on `users` and `posts` you need to make multiple requests to the service to get the data you need.

To play with GraphQL queries directly on the service browse to:
<http://localhost:3300/playground>

(Can you put a sample GraphQL query in here???)

To open the Webapp browse to:
<http://localhost:4200>

Press the **Load Using Rest API** and **Load Using GraphQL** links. This will load a list of all the users in the database, along with information on their posts.

At the end of each list you can see a comparison of:
 
 - The number of requests that were required to return the required data. Notice how:
     - 11 requests are required to get the REST data (one to get the ten `users` and one call per `user` to get their associated `posts`).
     - Only 1 request is need to get the same data via GraphQL for the initial call. 
 - The total size of data transfered with the REST requests is higher than the size of data transfered for the GraphQL query. This is because when we make the GraphQL query, we can request the information that we want to have returned, thus minimizing unnecessary network traffic transfering data associated with the entire resource.
 - The time taken to obtain the data is substantially less for the GraphQL query compared to the REST endpoint.
 
 ## FAQ
 
**Q:** _This looks great, but why not just create a REST resource that collates the information that you need and returns it in one go, similar to what the GraphQL implementation returns?_

**A:** ????
 
 **Q:** _If the schema changes, how easy is it to update the GraphQL Service to handle the change?_
 
 **A:** ????
 
 



