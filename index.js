import { apiKey } from "./apikey.js";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const apikey = apiKey


app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    res.render("index.ejs");
})


app.post("/weather", async (req,res) => {
    const cityData = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.inputCity}&limit=1&appid=${apikey}`)
    const lat = cityData.data[0].lat
    const lon = cityData.data[0].lon
    
    const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=de&appid=${apikey}`)
    // console.log(weatherData.data.daily[0])
    res.render("index.ejs", { 
        cityName: req.body.inputCity, 
        current: weatherData.data.current, 
        day1: weatherData.data.daily[0],
        day2: weatherData.data.daily[1],
        day3: weatherData.data.daily[2],
        day4: weatherData.data.daily[3],
        day5: weatherData.data.daily[4],
        day6: weatherData.data.daily[5],
        day7: weatherData.data.daily[6]
    })
})



app.listen(port, () => {
    console.log(`This server runs on port ${port}`)
})