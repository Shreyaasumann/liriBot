require("dotenv").config();

var keys = require("./keys.js");
var request = require("request")
var Spotify = require("node-spotify-api")
var spotify = requirel("request");
var dateFormat = require("dateFormat")
var fs = require("fs")

var userOption = process.argv[2];
var inputParameter = process.argv[3];

userInputs(userOption, inputParameter);

function userInput(userOption, inputParameter) {
    switch(userOption) {
    case 'concert-this':
       showConcertInfo(inputParameter);
       break;
    case 'spotify-this-song':
       showSongInfo(inputParameter);
       break;
    case 'movie-this':
       showMovieInfo(inputParameter);
       break;
    case 'do-what-itsays':
       doWhatItSays();
       break;
    default:
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

function showConcertInfo(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp"
    request(queryUrl, function(error, response, body) {
    
    if(!error && response.statusCode === 200){
        var concerts = JSON.parse(body);
        for (var i = 0; i< concerts.length; i++) {
            console.log("****Event Info****");
            fs.appendFileSync("log.txt", "****EVENT Info****\n")
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            console.log("Name of the place: " + concerts[i].place.name);
            console.log("Place Location: " + concerts[i].place.city);
            fs.appendFileSync("log.txt", "Place Location: " +  concerts[i].place.city+"\n");
            console.log("Date of the Event: " +  concerts[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
            console.log("Let's party");
            fs.appendFileSync("log.txt", "Let's party"+"\n");
        }
    } else{
        console.log('Its an error dude.');
    }
    });}

    function showSongInfo(inputParameter) {
        if (inputParameter === undefined) {
            inputParameter = "I can't get enough"; //default Song
        }
        spotify.search(
            {
                type: "track",
                query: inputParameter
            },
            function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                }
                var songs = data.tracks.items;

                for (var i = 0; i < songs.length; i++) {
                    console.log("****SONG INFO****");
                    fs.appendFileSync("log.txt", "****SONG INFO****\n");
                    console.log(i);
                    fs.appendFileSync("log.txt", i +"\n");
                    console.log("Song name: " + songs[i].name);
                    fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                    console.log("Preview song: " + songs[i].preview_url);
                    fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                    console.log("Album: " + songs[i].album.name);
                    fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                    console.log("Artist(s): " + songs[i].artists[0].name);
                    fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                    console.log("****");  
                    fs.appendFileSync("log.txt", "****\n");
                 }
            }
        );
    };

    function showMovieInfo(inputParameter){
        if (inputParameter === undefined) {
            inputParameter = "Mr. Nobody"
            console.log("--------");
            fs.appendFileSync("log.txt", "--------\n");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
            console.log("It's on Netflix!");
            fs.appendFileSync("log.txt", "It's on Netflix!\n");
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=b3c0b435";
        var queryUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + showMovieInfo;
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var movies = JSON.parse(body);
        console.log("****MOVIE INFO****");  
        fs.appendFileSync("log.txt", "****MOVIE INFO****\n");
        console.log("Title: " + movies.Title);
        fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
        console.log("Release Year: " + movies.Year);
        fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
        console.log("Language: " + movies.Language);
        fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
        console.log("Plot: " + movies.Plot);
        fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
        console.log("Actors: " + movies.Actors);
        fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
        console.log("****");  
        fs.appendFileSync("log.txt", "****\n");
    } else{
      console.log('Error occurred.');
    }

});}

function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }
 
function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}

var concertThis = function(artist){
    var request = ""
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"

    request(queryUrl, function(err, response, body){
}


