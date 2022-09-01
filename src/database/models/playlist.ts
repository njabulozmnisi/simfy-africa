import { DataTypes, Optional } from "sequelize";
import sequelizeContext from "../config";
import { TrackOuput } from "./track";

interface PlaylistAttributes {
  id: number;
  name: string;
  creator: string;
  tags: any;
}

export interface PlaylistInput extends Optional<PlaylistAttributes, "id"> {}

export interface PlaylistOuput extends Required<PlaylistAttributes> {
  tracks: TrackOuput[]
}

const Playlist = sequelizeContext.define("playlist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
});

export default Playlist;
