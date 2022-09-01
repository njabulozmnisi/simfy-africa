import sequelizeContext from "./config";
import Playlist from "./models/playlist";
import PlaylistTracks from "./models/playlistTrack";
import Track from "./models/track";
import logger from "../lib/logger";
import { seedPlaylists, seedTracks } from "./seed";

//Initialize sequelize context and provide seed data

const randomizer = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const sequelizeContextInit = () =>
  sequelizeContext
    .sync({ force: true })
    .then(() => {
      //Seed Tracks
      Track.bulkCreate(
        seedTracks.map((m) => ({ ...m, duration: randomizer(180, 360) })) //180 seconds == 3 minutes && 360 seconds == 6 minutes
      );
    })
    .then(() => {
      //Seed Playlist
      Playlist.bulkCreate(seedPlaylists);
    })
    .then(() => {
      //Randomized seed playlist tracks
      for (var playlistId = 1; playlistId < (seedPlaylists.length + 1); playlistId++) {

        const playlistLength = randomizer(10, 50);

        const trackSelection = Array(playlistLength).fill(null).map(() => randomizer(1, 50));
        
        const trackSelectionUnique = [...new Set(trackSelection)];

        const playlist = trackSelectionUnique.map(trackId => ({playlistId, trackId}));

        PlaylistTracks.bulkCreate(playlist).catch((err: any) => {
          logger.error(err)
        });
      }
    });

export default sequelizeContextInit;
