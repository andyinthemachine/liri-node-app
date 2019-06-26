


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
        if (response.data.length > 0){
            console.log("Upcoming " + media_item + " concerts");
            var i = 0;
            while ((i++ < 3) && (i <= response.data.length)){
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
    console.log("spotify api: ", media_item);
}

function imdb_api(media_item) {
    console.log("imdb api: ", media_item);
}


function display_info(media_choice, media_item) {
    new_line();
    switch (media_choice) {
        case "concert":
            bands_in_town_api(media_item);
            break;
        case "song":
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









//          node liri.js spotify-this-song '<song name here>'
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// If no song is provided then your program will default to "The Sign" by Ace of Base.
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from



// spotify.search({ type: 'track', query: 'Steely Dan', limit: 3 }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }
//     console.log(data);
//     console.log(data.tracks.items[0]);
// });


//           node liri.js movie-this '<movie name here>'
// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

/*
axios.get("http://www.omdbapi.com/?t=jaws&y=&plot=short&apikey=trilogy").then(
    function (response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
        console.log("The movie's title is: " + response.data.Title);
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
*/

/*
fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

});
*/


//          node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

// console.log(process.argv)
