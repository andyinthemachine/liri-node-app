


// liri-node app

// Spotify Client ID bfb08deb54d546a7a4f7af2e0e894865
// Spotify Client Secret 52b56af3e1e745fcbc5c9111d12449fe


require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

var inquirer = require("inquirer");

function new_line() { console.log("\n") }

function bands_in_town_api(media_item) {
    axios.get("https://rest.bandsintown.com/artists/" + media_item + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data.length > 0) {
                console.log("Upcoming " + media_item + " concerts");
                var i = 0;
                while ((i++ < 3) && (i <= response.data.length)) {
                    new_line();
                    console.log(`Venue: ${response.data[i].venue.name}`);
                    console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
                    console.log(`Date: ${moment(response.data[i].datetime).format('L')}`);
                }
                new_line();
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request)
                console.log(error.request);
            else
                console.log("Error", error.message);
            console.log(error.config);
        });
}


function spotify_api(media_item) {
    spotify.search({ type: 'track', query: media_item, limit: 3 }, function (err, data) {
        if (err)
            console.log('Error occurred: ' + err);
        else {
            new_line();
            console.log(`Song: ${data.tracks.items[0].name}`);
            new_line();
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            new_line();
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            new_line();
            console.log(`Link: ${data.tracks.items[0].href}`);
            new_line();
        }
    });
}



// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

function imdb_api(media_item) {
    console.log("imdb api: ", media_item);
    axios.get("http://www.omdbapi.com/?t=" + media_item + "&y=&plot=short&apikey=trilogy")
    .then(
        function (response) {
            // console.log(response.data);
            new_line();
            console.log(`Title: ${response.data.Title}`);
            new_line();
            console.log(`Year: ${response.data.Year}`);
            new_line();
            console.log(`IMDB Rating: ${response.data.imdbRating}`);
            new_line();
            console.log(`Rotten Tomatoes: ${response.data.Ratings[1].Value}`);
            new_line();
            console.log(`Country: ${response.data.Country}`);
            new_line();
            console.log(`Language: ${response.data.Language}`);
            new_line();
            console.log(`Plot: ${response.data.Plot}`);
            new_line();
            console.log(`Actors: ${response.data.Actors}`);
            new_line();
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


function display_info(media_choice, media_item) {
    new_line();
    switch (media_choice) {
        case "concert":
            bands_in_town_api(media_item);
            break;
        case "song":
            if (media_item === "")
                spotify_api("The Sign");
            else
                spotify_api(media_item);
            break;
        case "movie":
            imdb_api(media_item);
            break;
        default:
            console.log(media_choice + " search not available");
    }

}


new_line();
inquirer.prompt([
    {
        type: "list",
        name: "media_choice",
        message: "What would you like to look up?",
        choices: ["concert", "song", "movie", "Read from file"]
    }
]).then(function (response) {
    if (response.media_choice === "Read from file") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error)
                return console.log(error);
            var dataArr = data.split(",");
            display_info(dataArr[0], dataArr[1]);
        });
    } else {
        new_line();
        inquirer.prompt([
            {
                type: "input",
                name: "media_item",
                message: "What " + response.media_choice + " would you like to look up?",
            }
        ]).then(function (response2) {
            display_info(response.media_choice, response2.media_item);
        });
    }
});


















