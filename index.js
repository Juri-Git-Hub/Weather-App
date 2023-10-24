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




app.listen(port, () => {
    console.log(`This server runs on port ${port}`)
})