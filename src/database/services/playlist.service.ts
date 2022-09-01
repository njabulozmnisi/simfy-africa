import Playlist, { PlaylistInput, PlaylistOuput } from "../models/playlist";
import { PlaylistTracksInput } from "../models/playlistTrack";
import Track from "../models/track";
import logger from "../../lib/logger";
import PlaylistTracks from "../models/playlistTrack";
import { Op } from "sequelize";

export const getAll = async (): Promise<PlaylistOuput[]> => {
  return Playlist.findAll({
    include: {
      model: Track,
    },
  });
};

export const getById = async (id: number): Promise<PlaylistOuput> => {
  const playlist = await Playlist.findByPk(id, {
    include: {
      model: Track,
    },
  });

  if (!playlist) {
    logger.warn(`playlist ${id} not found`);
  }

  return playlist;
};

export const create = async (
  payload: PlaylistInput
): Promise<PlaylistOuput> => {
  return await Playlist.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<PlaylistInput>
): Promise<PlaylistOuput> => {
  const playlist = await Playlist.findByPk(id);

  if (!playlist) {
    logger.warn(`playlist ${id} not found`);
  }

  return await playlist.update(payload);
};

export const addTrackToPlaylist = async (
  payload: PlaylistTracksInput
): Promise<any> => {
  const addPlaylistItem = await PlaylistTracks.create(payload);

  return addPlaylistItem;
};

export const removeTrackFromPlaylist = async (
  payload: PlaylistTracksInput
): Promise<any> => {
  const deletedPlaylistItemCount = await PlaylistTracks.destroy({
    where: {
      ...payload,
    },
  });

  logger.info({ deletedPlaylistItemCount })

  return !!deletedPlaylistItemCount;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const [deletedPlaylistTrackCount, deletedPlaylistCount] = await Promise.all([
    PlaylistTracks.destroy({
      where: {
        playlistId: id,
      },
    }),
    Playlist.destroy({
      where: { id },
    }),
  ]);

  return !!deletedPlaylistTrackCount;
};

export const playlistTrakExists = (payload: PlaylistTracksInput) => {
  return PlaylistTracks.findAndCountAll({
    where: {
      [Op.and]: [
        { playlistId: payload.playlistId },
        { trackId: payload.trackId },
      ],
    },
  });
};
