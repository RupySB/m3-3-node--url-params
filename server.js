"use strict";

const morgan = require("morgan");
const express = require("express");
const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const app = express();
//this is used to make the stuff on line 20 easier to write

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    myName: "Rupy",
    top50,
  });
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//1.5 - popularArtist - I tried it below...not sure how to continue
// const popularArtist = (req, res) => {
//     const song.artist = {};
//     top50.forEach((song) => {
//         if (song.artist === "Justin Beiber"){
//             popularArtist.push(song.artist);
//         }
//         else (
//         res.render("pages/fourOhFour", {
//           title: "I got nothing",
//           path: req.originalUrl,)
//         });

//         )
//     })
