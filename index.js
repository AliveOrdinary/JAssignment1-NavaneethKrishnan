const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const dotenv = require("dotenv");

//  Load the environment variables from .env
dotenv.config();


const db = require("./modules/movies/db");

// Create an Express application
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set the port
const port = process.env.PORT || 8888;

// set up the views directory
app.set("views", path.join(__dirname, "views"));
// set up the view engine
app.set("view engine", "pug");

// set up the static files directory
app.use(express.static(path.join(__dirname, "public")));


app.get("/", async (req, res) => {
    const movies = await db.getMovies();
    res.render("index", { movies });
});

app.get("/movie/:id", async (req, res) => {
    const movie = await db.getMovieById(req.params.id);
    res.render("movie", { movie });
});

// add a new movie form page
app.get("/add", (req, res) => {
    res.render("add-movie");
});

// add a new movie
app.post("/add-movie", async (req, res) => {
    console.log(req.body);
    const newMovie = {
        Title: req.body.title,
        Year: req.body.year,
        rating: req.body.rating,
        Director: req.body.director,
        Actors: req.body.actors,
        Plot: req.body.plot,
        Genre: req.body.genre,
        Runtime: req.body.runtime,
        Poster: req.body.poster,
        Trailer: req.body.trailer,
    };
    await db.addMovie(newMovie);
    res.redirect("/");
});

// about page
app.get("/about", (req, res) => {
    res.render("about");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});