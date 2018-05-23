# GraphQL Demo

### This is a very simplified GraphQL service on top of Mock REST API service consumed by a simple webapp
----------------------------------------------------

This demonstrate and compare GraphQL and REST API from the front-end point of view.

There are 3 layers in play:
- A mock REST API service
- A GraphQL server
- An angular web application that consumes both services and compare between them.


**Setup**

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
cd graphql/
npm install
```

Install the webapp dependencies
```
cd webapp/
npm install
```

**Usage**

After all dependencies installed, in each terminal, to start the service Run:
```
npm start
```

Open 3 browser tabs.

To watch the mock rest-api service and test it browse to:
<http://localhost:3000>

To play with GraphQL queries directly on the service browse to:
<http://localhost:3300/playground>

To open the Webapp browse to:
<http://localhost:4200>



