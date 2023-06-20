import { configureStore } from "@reduxjs/toolkit";
import { hebrewSongsApi } from "../api/hebrewApiSlice";
import { arabicSongsApi } from "../api/arabicApiSlice";
import { lyricsApi } from "../api/lyricsApiSlice";
import searchsliceapi from "../api/searchsliceApi";
import artistApiSlice from "../api/artistApiSlice";
import songApiSlice from "../api/songApiSlice";
import languageSlice from "./languageSlice";

export default configureStore({
  reducer: {
    languageSelect: languageSlice,
    [hebrewSongsApi.reducerPath]: hebrewSongsApi.reducer,
    [arabicSongsApi.reducerPath]: arabicSongsApi.reducer,
    [lyricsApi.reducerPath]: lyricsApi.reducer,
    [searchsliceapi.reducerPath]: searchsliceapi.reducer,
    [artistApiSlice.reducerPath]: artistApiSlice.reducer,
    [songApiSlice.reducerPath]: songApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      hebrewSongsApi.middleware,
      arabicSongsApi.middleware,
      lyricsApi.middleware,
      searchsliceapi.middleware,
      artistApiSlice.middleware,
      songApiSlice.middleware,
    ]);
  },
});
