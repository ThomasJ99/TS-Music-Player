// Interfaces & type

interface Song {
  id: number;
  title: string;
  artist: string;
  durationInSeconds: number;
  // Inherits the Album interface, allowing us to access its content
  album: Album;
}

interface Album {
  title: string;
  year: number;
  coverUrl?: string;
}

type PlayerStatus = "playing" | "paused" | "stopped";

// Mock data - contains songs "data" using the above interfaces
const playlist: Song[] = [
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
const coverImageElement = document.getElementById(
  "cover-img"
) as HTMLImageElement;

// Modern solution - new stuff
const searchInput = document.querySelector("#search-input") as HTMLInputElement;
const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn") as HTMLButtonElement;
const arrowButton = document.querySelector("arrow-btn") as HTMLButtonElement; // Might need revision

let state: PlayerStatus = "paused"; // Need to figure out why I cant write status

// Modal to add songs
const dialog = document.querySelector("#add-song-dialog") as HTMLDialogElement;
const openBtn = document.querySelector("#open-modal-btn") as HTMLButtonElement;
const closeBtn = document.querySelector(
  "#close-modal-btn"
) as HTMLButtonElement;

const addForm = document.querySelector("#add-song-form") as HTMLFormElement;
const titleInput = document.querySelector("#title-input") as HTMLInputElement;
const artistInput = document.querySelector("#artist-input") as HTMLInputElement;
const durationInput = document.querySelector(
  "#duration-input"
) as HTMLInputElement;

function renderSongs() {
  // Empties the list at the start to not create duplicates
  if (songListContainer) {
    songListContainer.replaceChildren();
  }

  // Logic - creates new HTML <tags> with createElement and structure with append
  playlist.forEach(({ title, artist, id, album }) => {
    // Creates html element and adds class to it
    const card = document.createElement("article");
    card.classList.add("player-card");

    const coverImg = document.createElement("img");
    coverImg.classList.add("album-cover");

    // Logic to identify the optional type - needs fix
    if (album.coverUrl) {
      coverImg.src = album.coverUrl;
    }

    const info = document.createElement("div");
    info.classList.add("artist-info");

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const artistElement = document.createElement("p");
    artistElement.textContent = artist;

    // Adds new elements to the bottom of other elements
    card.append(coverImg, info);
    info.append(titleElement, artistElement);

    // Clicking a card gives the class .active to said img
    if (songListContainer) {
      //  <-- class on main
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
        playSong(id);
      });
      // Creates the albums with the songlist
      songListContainer.append(card);
    }
  });
}

renderSongs();

// States for play button
if (playButton) {
  playButton.addEventListener("click", () => {
    if (state === "paused") {
      state = "playing";
      console.log("playing");

      if (true) {
        // Look over statement, currently happens every time
        console.log("add pause icon");
        // Icon for pause
        playButton.innerText = "⏸︎";
      }
    } else {
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

// Arrow button logic - implement - plan is to have them be +1 or -1 on the songs id, changing
if (arrowButton) {
  // logic
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

// Functions - yet to be fully implemented
function playSong(id: number) {
  // find checks if you have something and if that matches something
  const songToPlay = playlist.find((song) => song.id === id);

  if (!songToPlay) return; // If no id, leave

  if (songTitleElement) {
    songTitleElement.textContent = songToPlay.title;
  }

  if (songArtistElement) {
    songArtistElement.textContent = songToPlay.artist;
  }

  if (coverImageElement) {
    if (songToPlay.album.coverUrl) {
      coverImageElement.src = songToPlay.album.coverUrl;
    }
  }
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

  //Minute, second - splits them between the : giving us two different values, minStr, secStr
  const [minStr, secStr] = timeStr.split(":");

  // Makes variables be numbers of our newly split strings
  const min = Number(minStr);
  const sec = Number(secStr);

  // If any of the numbers arent numbers and after we alert, return
  if (isNaN(min) || isNaN(sec)) {
    durationInput.classList.add("error");
    alert("Wrong time format! Use min:sec");
    return;
  }

  // Removes error class once we click submit and everything goes through
  durationInput.classList.remove("error");
  // Converts our minute, seconds to only seconds
  const totalSeconds = min * 60 + sec;

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
  renderSongs();

  // Needs comments
  addForm.reset();
  dialog.close();
});
