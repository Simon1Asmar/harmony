import cors from 'cors'
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import {connectDB, closeDBConnection} from "./config/db.js";
import scrapeTopArabicSongs from "./scrapping/scrappingTopArabicSongs.js";
import scrapeTopHebrewSongs from "./scrapping/scrappingTopHebrewSongs.js";
import { getAlbumFromSongAndArtist } from './spotify.js';

const app = express();
dotenv.config({ path: join(__dirname, "./config/config.env") });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get('/album/:songName/:artistName', async (req, res) => {
  const { songName, artistName } = req.params;
  try {
    const albumName = await getAlbumFromSongAndArtist(songName, artistName);
    const lyrics = await getLyricsForSong(songName, artistName);
    res.json({ albumName, lyrics });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.use(cors())

app.get("/topArabicSongs", scrapeTopArabicSongs)
app.get("/topHebrewSongs", scrapeTopHebrewSongs)

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV

let server;
connectDB().then(() => {
  server = app.listen(
    PORT,
    console.log(
      `Server is running in ${NODE_ENV} mode on port ${PORT}`
        
    )
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
  closeDBConnection()
});


