import asyncHandler from "../middleware/asyncHandler.js";
import Song from "../models/Song.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import createSongOrArtistObject from "../utils/controllersUtils.js";
import { getOrCreateArtist } from "./artistsController.js";

const findSong = (async (req) => {
    const filter = createSongOrArtistObject(req.body)
    const song = await Song.find(filter).populate('artist');
    if (song) return song
  });

// @desc    Get a single song by name/artist/album
//@route    GET /api/v1/harmony/songs
// @access  Public
const getSong = asyncHandler(async (req, res, next) => {
    const song = await findSong(req)
    if (!song) {
      return next(
        new ErrorResponse(
          `song not found`,
          404
        )
      );
    }
    res.status(200).json({
      success: true,
      data: song,
    });
  });

// @desc    Create a Song (only after check that is non-existent)
// @route   POST /api/v1/harmony/songs
// @access  dev
const createSong = asyncHandler(async (req, res, next) => {

    //Add a function here that scrapes the song, translates it and returns the information bellow (name, lyrics, album...) in one object
    // const data =  scrapeAndTranslateSong(req.body)

    //Finding the artist using the song data (cross-referencing with artist name and the album of the song)
    const artistName = data.artistName.toLowerCase()
    const album = data.album
    const artist = getOrCreateArtist(artistName, album)

    const newSongObject = createSongOrArtistObject(data)

    const song = await Song.create({...newSongObject, artist: artist._id});
    if (!song) {
      return next(new ErrorResponse(`Server error, song not created! Song data: ${newSongObject}`));
    }
    res.status(200).json({
      success: true,
      data: song,
    });
  });


  export {getSong, createSong}