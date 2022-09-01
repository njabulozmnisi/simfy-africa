import { DataTypes, Optional } from "sequelize";
import sequelizeContext from "../config";
import Playlist from "./playlist";
import Track from "./track";

interface PlaylistTracksAttributes {
  playlistId: number;
  trackId: number;
}

export interface PlaylistTracksInput extends Required<PlaylistTracksAttributes> {}

const PlaylistTracks = sequelizeContext.define("playlistTracks", {
  playlistId: {
    type: DataTypes.INTEGER,
    references: {
        model: Playlist,
        key: "id"
    }
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
        model: Track,
        key: "id"
    }
  },
});

// Track.belongsToMany(Playlist, { through: PlaylistTracks })
Playlist.belongsToMany(Track, { through: PlaylistTracks })

export default PlaylistTracks;
