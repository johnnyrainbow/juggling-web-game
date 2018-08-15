const http = require('http');
var express = require('express');
var app = express();
const port = 2000;
var path = require('path');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || port));

app.set('views', __dirname + '/views');
app.use('/client',express.static(__dirname + '/client'));
var dbJson = require('./database/db.json');
var maxLength = 5;
var leaderboard = [];
app.use(bodyParser.urlencoded({
  extended: true
}));


var server = http.createServer(app);

var io = require('socket.io').listen(server);
server.listen(port);

app.get('/', function (req,res) {
  console.log("WOW RENDER");
  res.sendFile('index.html', {root : __dirname + '/views'});
});



if(dbJson != null) {
  console.log("loading leaderboard");
  for (j in dbJson["leaderboard"]) {
      var obj = dbJson["leaderboard"][j];
      var dbScore = parseInt(obj["best score"]);
      var dbName = obj["name"];
      
    leaderboard.push ({
      score: dbScore,
      nickname: dbName
      
    });
    
  }
  leaderboard = sort(leaderboard);
  for(var i=0;i<leaderboard.length;i++) {
  
    console.log(leaderboard[i].score)
  }
  }

  io.on('connection', function (socket) {
console.log("new connection");

    socket.emit('serverBestScores',leaderboard);
 
    socket.on('bestScore',function(data){
      console.log(data.playerScore + " : " + data.nick);
     addNewScore(data.playerScore,data.nick);
     var dbJson = {};
   dbJson["leaderboard"] = [];
   for (i = 0; i < 5; i++) {
     dbJson["leaderboard"].push ({  "best score" : leaderboard[i].score,"name" : leaderboard[i].nickname });
   }
     
       var fs = require("fs");
    fs.writeFile("./database/db.json", JSON.stringify(dbJson), "utf8");
     
      socket.emit('serverBestScores',leaderboard);
      
    });

  });

  function addNewScore(newScore,newNickname) {
    leaderboard.push ({
    
      score: newScore,
      nickname: newNickname
    })
    leaderboard = sort(leaderboard);
    
    if(leaderboard.length > maxLength)
    leaderboard.pop();
    }
    
    function sort(arr){
      var len = arr.length;
      for (var i = len-1; i>=0; i--){
        for(var j = 1; j<=i; j++){
        if(arr[j-1].score<arr[j].score){
          var temp = arr[j-1];
          arr[j-1] = arr[j];
          arr[j] = temp;
         }
        }
      }
      return arr;
     }