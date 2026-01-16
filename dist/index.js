"use strict";
// Interfaces & type
// Mock data - contains songs "data" using the above interfaces
const playlist = [
    {
        id: 1,
        title: "Keep It Tucked",
        artist: "ThxSoMch",
        durationInSeconds: 174,
        album: {
            title: "Keep It Tucked",
            year: 2022,
            coverUrl: "/assets/album-1.jpg",
        },
    },
    {
        id: 2,
        title: "Tonight",
        artist: "PinkPantheress",
        durationInSeconds: 175,
        album: {
            title: "Fancy That",
            year: 2025,
        },
    },
    {
        id: 3,
        title: "Aizo",
        artist: "King Gnu",
        durationInSeconds: 216,
        album: {
            title: "Aizo",
            year: 2026,
            coverUrl: "/assets/album-3.jpg",
        },
    },
    {
        id: 4,
        title: "Underdog",
        artist: "Eve",
        durationInSeconds: 194,
        album: {
            title: "Underdog",
            year: 2025,
            coverUrl: "/assets/album-4.jpg",
        },
    },
];
// Variables
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
// as = type assertion - we force the element to be a specific type
const coverImageElement = document.getElementById("cover-img");
// Modern solution - new stuff
const searchInput = document.querySelector("#search-input"); // Add later for a search bar
const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn");
let state = "paused";
// Logic - creates new HTML <tags> with createElement and structure with append
playlist.forEach((song) => {
    // Creates html element and adds class to it
    const card = document.createElement("article");
    card.classList.add("player-card");
    const coverImg = document.createElement("img");
    coverImg.classList.add("album-cover");
    // Logic to identify the optional type
    if (song.album.coverUrl) {
        coverImg.src = song.album.coverUrl;
    }
    const info = document.createElement("div");
    info.classList.add("artist-info");
    const title = document.createElement("h3");
    title.textContent = song.title;
    const artist = document.createElement("p");
    artist.textContent = song.artist;
    // Adds new elements to the bottom of other elements
    card.append(coverImg, info);
    info.append(title, artist);
    // Clicking a card gives the class .active to said img
    if (songListContainer) { //  <-- class on main
        coverImg.addEventListener("click", () => {
            // use this to select a css class
            const currentActive = document.querySelector(".active");
            // Makes sure that the list exists, it wont crash if it doesesnt exist
            if (currentActive) {
                // Removes class
                currentActive.classList.remove("active");
            }
            // Adds class every click
            coverImg.classList.add("active");
            playSong(song);
        });
        // Creates the albums with the songlist
        songListContainer.append(card);
    }
});
// States for play button
if (playButton) {
    playButton.addEventListener("click", () => {
        if (state === "paused") {
            state = "playing";
            console.log("playing");
            if (true) { // Look over statement, currently happens every time
                console.log("add pause icon");
                // Icon for pause
                playButton.innerText = "⏸︎";
            }
        }
        else {
            state = "paused";
            console.log("paused");
        }
        if (state === "paused") {
            // Icon for play
            console.log("add play button");
            playButton.innerHTML = "&#9658";
        }
    });
}
// Search state - implement
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
// Functions - yet to be implemented
function playSong(song) {
    if (songTitleElement) {
        songTitleElement.textContent = song.title;
    }
    if (songArtistElement) {
        songArtistElement.textContent = song.artist;
    }
    if (coverImageElement) {
        if (song.album.coverUrl) {
            coverImageElement.src = song.album.coverUrl;
        }
    }
}
