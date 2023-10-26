import { apiKey } from "./apikey.js";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const apikey = apiKey

// app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.post("/weather", async (req,res) => {
    const cityData = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.inputCity}&limit=1&appid=${apikey}`)
    const lat = cityData.data[0].lat
    const lon = cityData.data[0].lon
    
    const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=de&appid=${apikey}`)
    console.log(weatherData.data.current.weather[0].icon)
    res.render("index.ejs", { cityName: req.body.inputCity, current: weatherData.data.current })
})



app.listen(port, () => {
    console.log(`This server runs on port ${port}`)
})