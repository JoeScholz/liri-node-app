
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
      function (response){
          
        var data = response.data[0];

        console.log("--------------------" +
        "\n" + searchName +
        "\n" + data.venue.name +
        "\n" + data.venue.city + ", " + data.venue.region +
        "\n" + data.venue.country + 
        "\n" + moment(data.datetime).format("MM/DD/YYYY") +
          // console.log(response.data);
        "\n" + "--------------------");

        fs.appendFile("./log.txt", "--------------------" + 
        "\n" + searchName +
        "\n" + data.venue.name +
        "\n" + data.venue.city + ", " + data.venue.region +
        "\n" + data.venue.country + 
        "\n" + moment(data.datetime).format("MM/DD/YYYY") +
        "\n" + "--------------------" +
        "\n" + error.response, function (err) {
          if (err) {
              console.log(err);
          } else {
              console.log("Liri log is updated.")
          }
        });
  });
}

function searchSpotify(searchName){
  
  if(!searchName){
    searchName = "the sign ace of base";
  };
  
  spotify.search({ type: 'track', query: searchName, limit: 5 }, function(err, data) {
    
    if(!err){
      var songArr = data.tracks.items
 
     for(var i = 0; i < songArr.length; i++){
      console.log(songArr[i].album.artists[0].name + 
      "\n" + songArr[i].name + 
      "\n" + songArr[i].preview_url + 
      "\n" + songArr[i].album.name + 
      "\n" + "--------------------");
        

      fs.appendFile("log.txt", "\n" + songArr[i].album.artists[0].name + 
      "\n" + songArr[i].name + 
      "\n" + songArr[i].preview_url + 
      "\n" + songArr[i].album.name + 
      "\n" + "--------------------", function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Liri log is updated.");
        }
      });
    }
    }else{
      console.log("There is an error: " + err.toString());
    }
  // reference to artist name: data.tracks.items[0].album.artists[0].name
  // reference to song name: data.tracks.items[0].name
  // preview URL: data.tracks.items[0].preview_url
  // album name: data.tracks.items[0].album.name
  });
}

function searchOmdb(searchName){

    if(!searchName){
      searchName = "mr nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(

        function (response){

            console.log("--------------------" +
            "\nMovie Name: " + response.data.Title +
            "\nRelease Year: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.tomatoRating +
            "\nProduction Country: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors: " + response.data.Actors +
            "\n--------------------");

            fs.appendFile("./log.txt", "--------------------" +
            "\nMovie Name: " + response.data.Title +
            "\nRelease Year: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.tomatoRating +
            "\nProduction Country: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors: " + response.data.Actors +
            "\n--------------------", function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Liri log is updated.")
                }
            });
        }
    );
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

function doWhatItSays(){

  fs.readFile("random.txt", "utf8", function (error, data){

      if(!error){
        var dataArr = data.split(",");
        if (dataArr[0] === 'concert'){
          searchBands(dataArr[1]);
        }else if (dataArr[0] === 'spotify'){
          searchSpotify(dataArr[1]);
        }else if (dataArr[0] === 'movie'){
          searchOmdb(dataArr[1]);
        }else{
          console.log("An error occurred: " + error);
        }
      }
  });
}
