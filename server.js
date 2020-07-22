"use strict";

const morgan = require("morgan");
const express = require("express");
const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const individualsongPage = (req, res) => {
  const rank = req.params.rank - 1; //fixed error for rank!
  if (top50[rank]) {
    res.render("pages/song-Page", {
      title: "Song #" + rank,
      song: top50[rank],
    });
  } else {
    res.status(404); //fixed up status!
    res.render("pages/fourOhFour", {
      //fixed typo
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
};
const app = express();

const popularArtist = (req, res) => {
  const artists = [];
  const artistCount = {};
  top50.forEach((song) => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });
  artists.forEach((artist) => {
    let count = 0;
    top50.forEach((song) => {
      if (song.artist === artist) count += 1;
    });
    artistCount[artist] = count;
  });

  const rankedArtists = [];
  Object.values(artistCount).forEach((count, id) => {
    const artist = Object.keys(artistCount)[id];
    rankedArtists.push({
      artist: artist,
      count: count,
    });
  });
  const mostPopularArtist = rankedArtists.sort((a, b) =>
    a.count < b.count ? 1 : -1
  )[0].artist;

  res.render("/pages/popularArtist", {
    title: "Most Popular Artist",
    songs: top50.filter((song) => song.artist === mostPopularArtist),
  });
};
// const popularArtist = (req, res) => {
//   function getModes(array) {
//     const top50 = {};
//     let maxFreq = 0;
//     let modes = [];

//     for (let i in array) {
//       top50[array[i]] = (top50[array[i]] || 0) + 1; // increment frequency.

//       if (top50[array[i]] > maxFreq) {
//         maxFreq = top50[array[i]]; // update max.
//       }
//     }

//     for (var k in top50) {
//       if (top50[k] == maxFreq) {
//         modes.push(k);
//       }
//     }
//     return modes;
//   }
//   res.render("pages/popularArtist", {
//     title: "Most Popular Artist",
//     songs: top50[k].modes.push(k),
//   });
// };

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

app.get("/top50/song/:rank", individualsongPage);
app.get("/top50/popularArtist", popularArtist);

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
