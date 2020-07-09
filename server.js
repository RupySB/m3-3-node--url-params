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

// 1.5 - popularArtist - I tried it below...not sure how to continue
const popularArtist = (req, res) => {
  function mode() {
    let numArtist = {};
    let highestFrequency = 0;
    let mode;
    top50.forEach(function findMode(number) {
      numArtist[number] = (numArtist[number] || 0) + 1;

      if (highestFrequency < numArtist[number]) {
        highestFrequency = numArtist[number];
        mode === number;
      }
    });
    return mode;
  }
  console.log(mode());
  res.render("pages/popularArtist", {
    title: "Most Popular Artist",
  });
};

//1.7:

// const individualsongPage = (req, res) => {
//   const rank = req.params.rank;
//   res.render;
//   function range() {
//     if (rank.length === 1) {
//       edge = start;
//       start = 0;
//     }
//     edge = edge || 0;
//     step = step || 1;
//     for (rank = []; (edge - start) * step > 0; start += step) {
//       ret.push(start);
//     }
//     e
//     return ret;
//   }
// };

const individualsongPage = (req, res) => {
  const rank = req.params.rank;
  if (top50[rank]) {
    res.render("pages/song-Page", {
      song: top50[rank],
    });
  } else {
    res.redirect("pages/fourOhfour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
};
