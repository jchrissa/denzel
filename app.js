const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const CONNECTION_URL =  "mongodb+srv://jchrissa1:Jocelyn@1955@cluster0-q3wis.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "film";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("oneStar");
        console.log("Connected to `" + DATABASE_NAME + "`!");
         console.log("Check localhost:9292");
    })
});

async function populateDB(IDactor) {
  try {
    console.log(`Fetching movies from Denzel  ${IDactor}...`);
    return await imdb(IDactor);
  } catch (e) {
    console.error(e);
  }
}


//GET /movies/populate
app.get("/movies/populate", async (request, response) => {
  const movies = await populateDB(DENZEL_IMDB_ID);
  collection.insertMany(movies, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send({
      total: result.result.n
    });
  })
})

//GET /movies
app.get("/movies", async (request, response) => {

    collection.find({metascore:{$gte:70}}).toArray((error, result) => {   //greater than 70
        if(error) {
            return response.status(500).send(error);
        }
        const index = Math.floor(Math.random() * Math.floor(result.length)); //get random Int
        result = result[index];
        response.send(result);
    });
});
//GET /movies/search
app.get("/movies/search", (request, response) => {
  let query = {
    "metascore": {
      $gte: parseInt(request.query.metascore)
    }
  };
  let options = {
    "limit": parseInt(request.query.limit),
    "sort": [
      ['metascore', 'desc']
    ]
  };
  collection.find(query, options).toArray((error, results) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send({
      limit: parseInt(request.query.limit),
      results: results,
      total: results.length
    });
  })
})

//GET /movies/:id
app.get("/movies/:id", (request, response) => {

    collection.findOne({"id": request.params.id}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
//POST /movies/:id
/*
app.post("/movies/:id", (request, response) => {
  let selector = {
    "id": request.params.id
  };
  let document = {
    $set: request.body
  };
  let options = {
    "upsert": true
  };
  collection.updateMany(selector, document, options, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result)
  })
})
*/

app.post("/movies/:id", (request, response) => {
    var date = request.body.date;
    var review = request.body.review;
    var query = { "id": request.params.id };
    collection.updateOne(query, { $set: { date: date, review: review } }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
        console.log("Added new review");
    });
});



















