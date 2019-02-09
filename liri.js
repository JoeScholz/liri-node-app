
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var request = require("request");



var spotify = new Spotify (keys.spotify);

var searchType = process.argv[2];

var searchName = process.argv.slice(3).join(" ");


switch(searchType){
  case "spotify-this-song":
    searchSpotify(searchName);
    break;
  case "movie-this":
    searchOmdb(searchName);
    break;

    
    
    default: 
      console.log("Could not understand search.")
  }


function searchSpotify(searchName){
  if (!searchName) {
    searchName = "the sign ace of base";
  };
  
  spotify.search({ type: 'track', query: searchName }, function(err, data) {
    // console.log error???
    
    var songArr = data.tracks.items
   
   for(var i = 0; i < songArr.length; i++){
     console.log(songArr[i].album.artists[0].name);
     console.log(songArr[i].name);
     console.log(songArr[i].preview_url);
     console.log(songArr[i].album.name);
     console.log("----------");
   }
  
  // reference to artist name: data.tracks.items[0].album.artists[0].name
  // reference to song name: data.tracks.items[0].name
  // preview URL: data.tracks.items[0].preview_url
  // album name: data.tracks.items[0].album.name
  });
}

function searchOmdb(searchName) {

    if (!searchName) {
      searchName = "mr nobody";
    }

    var movieSearch = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";
    axios.get(movieSearch).then(
        function (response) {
            console.log("--------------------");
            console.log("Movie Name: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("Production Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("--------------------");
            // fs.appendFile("./log.txt", function (err) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log("Liri log is updated.")
            //     }
            // })
        }
    ).catch(function (error) {
        console.log("Error")
    });
  }
  // request('http://www.omdbapi.com/?apiKey=e37064bb' + '&t='+ searchName, 
  //   function(err, response, body) {
      
  //     if (err) {
  //       return console.log('Error occurred: ' + err);
  //     }
  //         response = JSON.parse(body);
  //         console.log(' ');
  //         console.log('Title: ' + response.Title);
  //         console.log('Year: ' + response.Year);
  //         console.log('IMDb Rating: ' + response.imdbRating);
  //         console.log('Rotten Tomatoes Rating: ' + response.tomatoRating);
  //         console.log('Country: ' + response.Country);
  //         console.log('Language: ' + response.Language);
  //         console.log('Plot: ' + response.Plot);
  //         console.log('Actors: ' + response.Actors);
  //         // console.log('body:', body);
//       }
//   );
// } 
