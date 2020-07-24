# Apollo tutorial

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:
- `start`: Starting point for the tutorial
- `final`: Final version

From within the `start` and `final` directories, there are two folders (one for `server` and one for `client`).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd final/server && npm i && npm start
```

and

```bash
cd final/client && npm i && npm start
```

## Important Apollo Good to knows

### Resolvers
A resolver is a function that's responsible for populating the data for a single field in your schema. Whenever a client queries for a particular field, the resolver for that field fetches the requested data from the appropriate data source. [See here](https://www.apollographql.com/docs/tutorial/resolvers/)

A resolver function returns one of the following:
• Data of the type required by the resolver's corresponding schema field (string, integer, object, etc.)     
• A promise that fulfills with data of the required type    

Most of the logic the `./src/resolvers.js` rely on is part of the LaunchAPI and UserAPI data sources. By keeping resolvers thin as a best practice, you can safely refactor your backing logic while reducing the likelihood of breaking your API.


Todo: https://www.apollographql.com/docs/tutorial/resolvers/