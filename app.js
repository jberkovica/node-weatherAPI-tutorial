// adding native http module
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

// express app setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    console.log("POST request received");
    console.log(req.body.cityName);

    // weather API url params
    const query = req.body.cityName;
    const units = "metric";
    const appid = "put you api token here";
    const url = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + query + "&units=" + units + "&appid=" + appid;

    https.get(url, function (response) {
        console.log("City name: " + response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(description);

            // we can use res.send only one time
            // res.send("Server is up and running");
            res.write("<h1>The temperature in Riga is " + temp + " degrees Celcius</h1>");
            res.write("<p>Weathear description: " + description + "</p>");
            res.write("<image src=" + imageUrl + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
