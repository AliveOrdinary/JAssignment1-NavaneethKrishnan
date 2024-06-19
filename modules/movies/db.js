const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;


const movieSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Year: { type: Number, required: true },
    rating: { type: String, required: true },
    Director: { type: String, required: true },
    Actors: { type: String, required: true },
    Plot: { type: String, required: true },
    Genre: { type: String, required: true },
    Runtime: { type: String, required: true },
    Poster: { type: String },
    Trailer: { type: String },
});

const Movie = mongoose.model('Movie', movieSchema);

//MONGODB FUNCTIONS


async function connect() {
    return mongoose.connect(dbUrl);
}

//get all movies\
async function getMovies() {
    await connect();
    return await Movie.find({});
}

//get movie by id
async function getMovieById(id) {
    await connect();
    return await Movie.findById(id);
}

// Add a new movie
async function addMovie(movie) {
    await connect();
    return await Movie.create(movie);
}




module.exports = {
    connect,
    getMovies,
    getMovieById,
    addMovie
};