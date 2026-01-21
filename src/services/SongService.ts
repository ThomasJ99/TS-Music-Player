import type { Song } from "../models/Song.js";

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

// Two ways to write this function
// export const getPlaylist = (): Song[] => {
//     return [...playlist]
// }

// Creates a copy of the Song array without touching/mutating it
// If we ever wanted to adjust our playlist we would need to use playlist and not getPlaylist
export function getPlaylist(): Song[] {
  return [...playlist];
}
