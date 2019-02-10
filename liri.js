
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");
// var request = require("request");

var spotify = new Spotify (keys.spotify);

var searchType = process.argv[2];

var searchName = process.argv.slice(3).join(" ");


switch(searchType){
  case "concert":
    searchBands(searchName);
    break;
  case "spotify":
    searchSpotify(searchName);
    break;
  case "movie":
    searchOmdb(searchName);
    break;
  case "doIt":
    doWhatItSays();
    break;
  default: 
      console.log("Could not understand search.")
  }

  function searchBands(searchName) {

    var queryURL = "https://rest.bandsintown.com/artists/" + searchName + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
          
          var data = response.data[0];

          console.log("--------------------");
          console.log(searchName);
          console.log(data.venue.name);
          console.log(data.venue.city + ", " + data.venue.region);
          console.log(data.venue.country);
          console.log(moment(data.datetime).format("MM/DD/YYYY"));
          // console.log(response.data);
          console.log("--------------------");

        }).catch(function (err) {
          console.log("Error: " + err)
      })
      }

function searchSpotify(searchName){
  if (!searchName) {
    searchName = "the sign ace of base";
  };
  

  spotify.search({ type: 'track', query: searchName, limit: 10 }, function(err, data) {
    
    if(!err){
      var songArr = data.tracks.items
 
     for(var i = 0; i < songArr.length; i++){
       console.log(songArr[i].album.artists[0].name);
       console.log(songArr[i].name);
       console.log(songArr[i].preview_url);
       console.log(songArr[i].album.name);
       console.log("--------------------");
     }
    }else{
      console.log("There is an error: " + err.toString())
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

    var queryURL = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
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
    ).catch(function (err) {
      console.log("Error: " + err)
  })
  }

  // REQUEST VERSION FOR FUTURE REFERENCE:
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

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
      if (!error) {
        var dataArr = data.split(",");
        if (dataArr[0] === 'concert') {
          searchBands(dataArr[1]);
        }else if (dataArr[0] === 'spotify') {
          searchSpotify(dataArr[1]);
        }else if (dataArr[0] === 'movie') {
          searchOmdb(dataArr[1]);
        }else {
          console.log("An error occurred: " + error);
        }
      }
  });
}
