import { DataTypes, Optional } from 'sequelize'
import sequelizeContext from "../config";

interface TrackAttributes {
  id: number;
  name: string;
  album: string;
  artist: string;
  duration: number;
  artworkUrl: string;
  audioUrl: string;
}

export interface TrackInput extends Optional<TrackAttributes, 'id'> {}

export interface TrackOuput extends Required<TrackAttributes> {}

const Track = sequelizeContext.define("track", {
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
  album: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  artworkUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  audioUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Track;
