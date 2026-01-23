// Type imports at the top - helps others know what file works with
import type { Song } from "./models/Song.js";
import { renderSongs } from "./components/SongList.js";
import { saveSongs, loadSongs } from "./utils/storage.js";
import { getPlaylist } from "./services/SongService.js";
import { playSong } from "./services/PlayerService.js";
import { newSongTime } from "./utils/SongTime.js";

/* --- Folder structure ---
// models - interfaces & definitions - (Your interfaces/types – "The blueprints")
// services - Our data - (Handles your data/fetching – "The warehouse")
// utils - General/reusable logic, like storage - (Small helper functions – "The tools")
// components - (Functions that create HTML – "The painters") - pascal
*/

// Variables
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");

// Modern solution - new stuff
// as = type assertion - we force the element to be a specific type
const searchInput = document.querySelector("#search-input") as HTMLInputElement;
const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn") as HTMLButtonElement;
const arrowButton = document.querySelector("arrow-btn") as HTMLButtonElement; // Might need revision

// Modal to add songs
const dialog = document.querySelector("#add-song-dialog") as HTMLDialogElement;
const openBtn = document.querySelector("#open-modal-btn") as HTMLButtonElement;
const closeBtn = document.querySelector(
  "#close-modal-btn",
) as HTMLButtonElement;

const addForm = document.querySelector("#add-song-form") as HTMLFormElement;
const titleInput = document.querySelector("#title-input") as HTMLInputElement;
const artistInput = document.querySelector("#artist-input") as HTMLInputElement;
const durationInput = document.querySelector(
  "#duration-input",
) as HTMLInputElement;

// Initializing Local storage & loading
// Empty list at the start, good if we dont know if our user is new or recurring
const playlist: Song[] = [];
// Remove old statements below, redo with async and try catch ------

const apiSongs = getPlaylist();
const storedSongs = loadSongs();

if (storedSongs.length > 0) {
  playlist.push(...storedSongs);
} else {
  playlist.push(...apiSongs);

  // Saves current songs
  saveSongs(playlist);
}

type PlayerStatus = "playing" | "paused" | "stopped";
let state: PlayerStatus = "stopped"; // Need to figure out why I cant write status as a variable name. Answer: old deprecated word

// New event for active album
if (songListContainer) {
  songListContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    // closest() - bubbling event - goes up the hierarchy until it reaches player-card class
    const card = target.closest(".player-card") as HTMLElement;
    // If we dont click the img we get sent back
    if (!card) return;

    const idStr = card.dataset.id;
    if (idStr) {
      const id = Number(idStr);
      const image = card.querySelector("img") as HTMLElement;

      const currentActive = document.querySelector(".active");
      if (currentActive) currentActive.classList.remove("active");

      image.classList.add("active");
      /* We set the state to stopped here so that whenever we click a new song, we always start at stopped...
       which makes our play button logic function with minimal statements*/
      state = "stopped";
      playButton.innerText = "⏵︎";

      playSong(id, playlist, songTitleElement, songArtistElement);
    }
  });
}

// States for play button
if (playButton) {
  playButton.addEventListener("click", () => {
    if (state === "playing") {
      state = "paused";
      // Icon for play
      playButton.innerHTML = "⏵︎";
    } else {
      state = "playing";
      // Icon for pause
      playButton.innerText = "⏸︎";
    }
  });
}

// Arrow button logic - implement - plan is to have them be +1 or -1 on the songs id, changing
if (arrowButton) {
  // logic
  // Listener
  // Able to discern between forward and backward
  // Might need to loop through the two buttons with a forEach to start with
}

// Search input field
if (searchInput) {
  // (e) is a callback, e = event, usually used
  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement; // Sends the signal - target becomes a reference to the search input

    const searchTerm = target.value.toLowerCase(); // Listens to the signal

    const allCard = document.querySelectorAll(".player-card"); // Contains the values of created player cards

    allCard.forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.toLowerCase();

      if (title?.includes(searchTerm)) {
        card.classList.remove("hidden"); // Need to create "hidden" in css
      } else {
        card.classList.add("hidden");
      }
    });
  });
}

// Modal
// showModal opens modal & close() closes it with the click of a button
// Names are linked to their respective button #id
openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

// SPA - Single Page Application - modern, popular solution
addForm.addEventListener("submit", (e) => {
  // Prevents the site from loading after we "submit" our form
  // What preventDefault() does is that it can stop a sites standard behaviour for a event
  e.preventDefault();

  // String values of these variables
  const title = titleInput.value;
  const artist = artistInput.value;
  const timeStr = durationInput.value; // ex "3:21"

  const totalSeconds = newSongTime(timeStr, durationInput);
  // Safety check if its 0
  if (!totalSeconds) {
    durationInput.classList.add("error");
    alert("Wrong time format! Use min:sec");
    return;
  }

  // What our new song has to contain according to our interface
  const newSong: Song = {
    id: Date.now(),
    title: title,
    artist: artist,
    durationInSeconds: totalSeconds,
    album: { title: "Singel", year: 2024 },
  };

  // Adds the new song to our playlist interface and plays the function its inside
  playlist.push(newSong);

  saveSongs(playlist);
  renderSongs("song-list-container", playlist);

  // reset removes content from modal after its submitted
  addForm.reset();
  // closes the modal
  dialog.close();
});

// Loads our songs at start
loadSongs();
renderSongs("song-list-container", playlist);
