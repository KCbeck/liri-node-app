// DEPENDENCIES
require("dotenv").config();

// creates a const of Spotify and brings in the node-spotify-api node package.
const Spotify = require("node-spotify-api");

// creates a const of keys and brings in the API keys
const keys = require("./keys");

// createa a const of axios and brings in the axios node package.
const axios = require("axios");

// brings in the the moment node package.
const moment = require("moment");

// creates the FS package  and allows to for read/write.
const fs = require("fs");

// creates a const and sets it equal to keys.spotify
const spotify = new Spotify(keys.spotify);

// FUNCTIONS


// Helper function that gets the bandNames name
const sbandNamess = function(bandNames) {
    return bandNames.name;};

// creates a const and a function for track and inputs the song "Thesign"
const sSpotify = function(track) { if(!track) { 
    track = "The Sign, Ace of Base";
}
//https://www.npmjs.com/package/node-spotify-api
  spotify.search({type: "track", query: track,limit: 1}, function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      const songs = data.tracks.items;

      for (const i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("bandNames(s): " + songs[i].bandNamess.map(sbandNamess));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};

const concerts = function(bandNames) {
  const queryURL = "https://rest.bandsintown.com/bandNamess/" + bandNames + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      const jsonData = response.data;

      if (!jsonData.length) { console.log("No results found for " + bandNames);
        return;
      }

      console.log("Upcoming concerts for " + bandNames + ":");

      for (const i = 0; i < jsonData.length; i++) {
        const show = jsonData[i];

        // Print data about each concert
        // If a concert doesn't have a region, display the country instead
        // Use moment to format the date
        console.log(
          show.venue.city +
            "," +
            (show.venue.region || show.venue.country) +
            " at " +
            show.venue.name +
            " " +
            moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};

// Function for running a Movie Search
const Movies = function(movieTitles) {
    if (!movieTitles) {
        movieTitles = "Mr. Nobody."; 
        console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>")
        console.log("It's on Netflix!");
    }


  const urlHit =
    "http://www.omdbapi.com/?t=" + movieTitles + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(urlHit).then( function(response) {
      const 
      sonData = response.data;

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);{
 
    }
      
    }
  );
};

// Function for running a command based on text file
const doWhatItSays = function() { fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    const dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
const pick = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    concerts(functionData);
    break;
  case "spotify-this-song":
    sSpotify(functionData);
    break;
  case "movie-this":
    Movies(functionData);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};

// Function which takes in command line arguments and executes correct function accordingly
const runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));
