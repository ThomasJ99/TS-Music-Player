import type { Song } from "../models/Song.js";

// Will hold code for player status, player states and the playSong function

// Functions - yet to be fully implemented - should be moved out to playerservice alongside status and states ---------
export function playSong(id: number, playlist: Song[], songTitleElement: HTMLElement | null, songArtistElement: HTMLElement | null) {
  // find checks if you have something and if that matches something
  const songToPlay = playlist.find((song) => song.id === id);

  if (!songToPlay) return; // If no id, leave

  if (songTitleElement) {
    songTitleElement.textContent = songToPlay.title;
  }

  if (songArtistElement) {
    songArtistElement.textContent = songToPlay.artist;
  }

//   if (coverImageElement) {
//     if (songToPlay.album.coverUrl) {
//       coverImageElement.src = songToPlay.album.coverUrl;
//     }
//   }
}