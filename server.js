//jshint eversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const apiKey = "c88bf63f13fad37ad0261d3a37db971e";
  const cityName = req.body.cityName;
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid="+ apiKey+"&units="+ unit ;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);

      const cftemp = weatherData.main.feels_like;
      const ctemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].main;
      const timeZone = (weatherData.timezone)/3600;
      res.write("<h1>"+ cityName +"</h1>");
      res.write("<p>The weather is currently "+ weatherDescription +"</p>");
      res.write("<p>Temperature:"+ ctemp +" <br> Feels like: "+ cftemp +" <br>TimeZone: "+ timeZone +" hrs </p>");
      res.send();
    });
  });
});



app.listen(3000,function(){
  console.log("Server started on port 3000");
});
