import type { Song } from "../models/Song.js";

// Smart way to save string data since strings could be easily misstyped
const storage_Key = "myMusicList";

// Saving
// We input songs to reach our interface, then we save them to a json
export const saveSongs = (songs: Song[]) => {
  const json = JSON.stringify(songs);
  localStorage.setItem(storage_Key, json);
};

// Loading
export const loadSongs = (): Song[] => {
  const storedData = localStorage.getItem(storage_Key);

  // If theres nothing in our local storage, return empty list
  if (!storedData) return [];

  // Parses the json string and structures our data
  return JSON.parse(storedData) as Song[];
};
