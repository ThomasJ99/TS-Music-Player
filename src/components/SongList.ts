import type { Song } from "../models/Song.js";

// containerId is the id of my song list container which is my main
export function renderSongs(containerId: string, songs: Song[]) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.replaceChildren();

  // Logic - creates new HTML <tags> with createElement and structure with append
  songs.forEach(({ title, artist, id, album }) => {
    // Creates html element and adds class to it
    const card = document.createElement("article");
    card.classList.add("player-card");

    // Gives each card a unique data-id
    card.dataset.id = id.toString();

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

    if (container) {
      // Creates the albums with the songlist
      container.append(card);
    }
  });
}
