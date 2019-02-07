
require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify (keys.spotify);

var searchType = process.argv[2];

var song = process.argv.slice(3).join(" ");

function searchSpotify(songName){
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
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

function chooseSearch(searchType, searchTerm){
  switch(searchType){
    case "spotify-this-song": 
      searchSpotify(searchTerm);
      break;
    
    default: 
      console.log("Could not understand search.")
  }
}

chooseSearch(searchType, song);