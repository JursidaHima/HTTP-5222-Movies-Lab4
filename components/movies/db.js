import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up schema and model

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String,
}); //, {collection:"movies"});

const Movie = mongoose.model("Movie", MovieSchema);

await mongoose.connect(dbUrl); //if there are user credentials (i.e. user/pwd) in the connection string, use await

//MONGODB FUNCTIONS
/* async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
} */

//Function to initialize movies collection with some sample data.
async function initializeMovies() {
  let movieArray = [
    {
      title: "Million Dollar Baby ",
      year: 2004,
      rating: "PG-13",
    },
    {
      title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      year: 2003,
      rating: "PG-13",
    },
    {
      title: "Pride & Prejudice",
      year: 2005,
      rating: "PG",
    },
    {
      title: "Lucy",
      year: 2014,
      rating: "R",
    },
    {
      title: "Charlie's Angels",
      year: 2000,
      rating: "PG-13",
    },
    {
      title: "Mr. & Mrs. Smith",
      year: 2005,
      rating: "PG-13",
    },
  ];
  await Movie.insertMany(movieArray); //insert all data in movieArray
}

//Get all movies from the movies collection
async function getMovies() {
  return await Movie.find({}); //return array for find all
}
//function to update a raiting by movie title
async function updateMovieRating(title, newRating) {
  await Movie.updateOne({ title: title }, { $set: { rating: newRating } });
}
//function to delete movies by rating
async function deleteMoviesByRating(rating) {
  await Movie.deleteMany({ rating: rating });
}

export default {
  initializeMovies,
  getMovies,
  updateMovieRating,
  deleteMoviesByRating,
};
