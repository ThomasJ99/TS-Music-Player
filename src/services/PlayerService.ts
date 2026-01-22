import type { Song } from "../models/Song.js";

// Function for song name and artist name - yet to implement image
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