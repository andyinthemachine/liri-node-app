


// Spotify liri-node app
// Client ID bfb08deb54d546a7a4f7af2e0e894865
// Client Secret 52b56af3e1e745fcbc5c9111d12449fe

require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

//          node liri.js concert-this <artist/band name here>
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

//          node liri.js spotify-this-song '<song name here>'
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// If no song is provided then your program will default to "The Sign" by Ace of Base.
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

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

//          node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.