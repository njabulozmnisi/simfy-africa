import Track, { TrackInput, TrackOuput } from "../models/track";
import logger from "../../lib/logger";

export const getAll = async (): Promise<any> => {
  return Track.findAll();
};

export const getById = async (id: number): Promise<TrackOuput> => {
  const track = await Track.findByPk(id);

  if (!track) {
    logger.warn(`track ${id} not found`);
  }

  return track;
};

export const create = async (payload: TrackInput): Promise<any> => {
  return await Track.create(payload);
};

export const update = async (id: number, payload: Partial<TrackInput>): Promise<TrackOuput> => {

  const track = await Track.findByPk(id);

  if (!track) {
    logger.warn(`track ${id} not found`);
  }

  return await track.update(payload);
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedTrackCount = await Track.destroy({
    where: { id },
  });

  return !!deletedTrackCount;
};
