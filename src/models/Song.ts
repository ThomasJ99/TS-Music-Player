export interface Song {
  id: number;
  title: string;
  artist: string;
  durationInSeconds: number;
  // Inherits the Album interface, allowing us to access its content
  album: Album;
}

export interface Album {
  title: string;
  year: number;
  coverUrl?: string;
}
