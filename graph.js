const imdb = require('./src/imdb');
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');
const {makeExecutableSchema} = require('graphql-tools');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}


const CONNECTION_URL =  "mongodb+srv://"+process.env.USER+process.env.PASS+"@cluster0-q3wis.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "film";
const DENZEL_IMDB_ID = 'nm0000243';
const port = 9292;

var app = Express();
var database, collection;



    try {

       

       MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("oneStar");
    })
        const typeDefs = [`
          type Query {
            movie(id: String): Movie
            populateData:Int
            search(metascore:Int,limit:Int): [Movie]
            createReview(movieId:String,review :String ,date:String):String
            randomSearch:Movie
          }
          type Movie {
            link: String
            id:String
            poster:String
            votes:Int
            rating:Int
            metascore: Int
            synopsis: String
            title: String
            year: Int
          },
            type Review{
        content: String
        date:String
      },


          schema {
            query: Query
            
          }
        `];

        const resolvers = {
          Query: {
                populateData: async () => {
                	collection.drop();
                 var movies = await imdb(DENZEL_IMDB_ID);
                const result = await collection.insertMany(movies)        
                return result.insertedCount;
            },
            movie: async (root, {id}) => {
              return await collection.findOne({ "id": id})
              
            },
        
       createReview: async (root, {id,review,date}) => {
          const result = await collection.updateOne({"movieId":id},{$set:{"review":review,"date":date}});
          console.log(result);
          return "review done !";
        },
         search: async (root, {metascore,limit}) => {
         	
         const resultat =await collection.find({"metascore":{$gte:metascore}}).limit(limit).sort({metascore:-1}).toArray() ;
    return resultat; 
    },
    randomSearch:async (root, {}) => {


    	
var res =await collection.find({"metascore":{$gte:70}}).toArray() ;
    
const index = Math.floor(Math.random() * Math.floor(res.length)); 
        res= res[index];
    return res; 
        
        },
}
}


        const schema = makeExecutableSchema({
          typeDefs,
          resolvers
        })

        app.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: true,
        }));

        app.listen(port, () => {
            console.log("Connected !");
        });

    } catch (e) {
    console.log(e);
  }

