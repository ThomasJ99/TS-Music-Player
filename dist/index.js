import { renderSongs } from "./components/SongList.js";
import { saveSongs, loadSongs } from "./utils/storage.js";
import { getPlaylist } from "./services/SongService.js";
import { playSong } from "./services/PlayerService.js";
import { newSongTime } from "./utils/SongTime.js";
// models - interfaces & definitions - (Your interfaces/types – "The blueprints")
// services - Our data - (Handles your data/fetching – "The warehouse")
// utils - General/reusable logic, like storage - (Small helper functions – "The tools")
// components - (Functions that create HTML – "The painters")
// Variables
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
// as = type assertion - we force the element to be a specific type
// const coverImageElement = document.getElementById(
//   "cover-img",
// ) as HTMLImageElement;
// Modern solution - new stuff
const searchInput = document.querySelector("#search-input");
const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn");
const arrowButton = document.querySelector("arrow-btn"); // Might need revision
// Modal to add songs
const dialog = document.querySelector("#add-song-dialog");
const openBtn = document.querySelector("#open-modal-btn");
const closeBtn = document.querySelector("#close-modal-btn");
const addForm = document.querySelector("#add-song-form");
const titleInput = document.querySelector("#title-input");
const artistInput = document.querySelector("#artist-input");
const durationInput = document.querySelector("#duration-input");
// Initializing Local storage & loading
// Empty list at the start, good if we dont know if our user is new or recurring
const playlist = [];
// Remove old statements below, redo with async and try catch ------
const apiSongs = getPlaylist();
const storedSongs = loadSongs();
if (storedSongs.length > 0) {
    playlist.push(...storedSongs);
}
else {
    playlist.push(...apiSongs);
    // Saves current songs
    saveSongs(playlist);
}
let state = "stopped"; // Need to figure out why I cant write status as a variable name. answer: old deprecated word
// New event for active album
if (songListContainer) {
    songListContainer.addEventListener("click", (e) => {
        // console.log(`You clicked on the container ${e.target}`)
        // console.log("You clicked", e.target);
        const target = e.target;
        // closest() - bubbling event
        const card = target.closest(".player-card");
        // If we dont click the img we get sent back
        if (!card)
            return;
        // console.log("You clicked", target);
        // console.log("Closest found", card);
        const idStr = card.dataset.id;
        if (idStr) {
            const id = Number(idStr);
            const image = card.querySelector("img");
            const currentActive = document.querySelector(".active");
            if (currentActive)
                currentActive.classList.remove("active");
            image.classList.add("active");
            state = "stopped";
            playButton.innerHTML = "&#9658";
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
        }
        else {
            state = "playing";
            // Icon for pause
            playButton.innerText = "⏸︎";
        }
    });
}
// Arrow button logic - implement - plan is to have them be +1 or -1 on the songs id, changing
if (arrowButton) {
    // logic
    // Might need to loop through the two buttons with a forEach to start with
}
// Search input field
if (searchInput) {
    // (e) is a callback, e = event, usually used
    searchInput.addEventListener("input", (e) => {
        const target = e.target; // Sends the signal - target becomes a reference to the search input
        const searchTerm = target.value.toLowerCase(); // Listens to the signal
        const allCard = document.querySelectorAll(".player-card"); // Contains the values of created player cards
        allCard.forEach((card) => {
            const title = card.querySelector("h3")?.textContent?.toLowerCase();
            if (title?.includes(searchTerm)) {
                card.classList.remove("hidden"); // Need to create "hidden" in css
            }
            else {
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
    // Safety check if its null
    if (!totalSeconds) {
        durationInput.classList.add("error");
        alert("Wrong time format! Use min:sec");
        return;
    }
    // What our new song has to contain according to our interface
    const newSong = {
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
