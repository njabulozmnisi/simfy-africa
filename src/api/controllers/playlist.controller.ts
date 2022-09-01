import { Request, Response } from "express";
import { PlaylistInput, PlaylistOuput } from "../../database/models/playlist";
import { PlaylistTracksInput } from "../../database/models/playlistTrack";
import * as playlistService from "../../database/services/playlist.service";
import * as trackService from "../../database/services/track.service";
import { HttpStatusCode } from "../../lib/httpStatusCodes";
import moment from "moment";
import { deleteFromCache, getCacheKey, setCache } from "../middleware/cache";
import logger from "../../lib/logger";

export const getAll = async (req: Request, res: Response) => {
  const data = await playlistService.getAll();

  if (!data) {
    return res.sendStatus(HttpStatusCode.NOT_FOUND);
  }

  const dataTransformed = data.map((m) => toPlaylistDTO(m));

  res.status(HttpStatusCode.OK).send(dataTransformed);
};

export const get = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await playlistService.getById(parseInt(id));

  if (!data) {
    return res.sendStatus(HttpStatusCode.NOT_FOUND);
  }

  const dataTransformed = toPlaylistDTO(data);

  const { cacheKey } = getCacheKey(req);
  setCache(cacheKey, dataTransformed);

  res.status(HttpStatusCode.OK).send(dataTransformed);
};

export const create = async (req: Request, res: Response) => {
  const payload = req.body as PlaylistInput;

  const data = await playlistService.create(payload);

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body as PlaylistInput;

  if (!id) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await playlistService.update(parseInt(id), payload);

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const { cacheKey } = getCacheKey(req);
  deleteFromCache(cacheKey, data);

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const addTrack = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body as PlaylistTracksInput;

  payload.playlistId = parseInt(id);

  const track = trackService.getById(payload.trackId);
  const playlist = playlistService.getById(payload.trackId);

  if (!track || !playlist) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .send("the track/playlist does not exist");
  }

  if (!!playlistService.playlistTrakExists(payload)) {
    res.status(HttpStatusCode.OK).send({ success: true, messge: "already added" });
  }

  const data = await playlistService.addTrackToPlaylist(payload);

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const { entity } = getCacheKey(req);
  const cacheKey = `${entity}:${id}`;
  deleteFromCache(cacheKey, data);

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const removeTrack = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body as PlaylistTracksInput;

  payload.playlistId = parseInt(id);

  const data = await playlistService.removeTrackFromPlaylist(payload);

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const { entity } = getCacheKey(req);
  const cacheKey = `${entity}:${id}`;
  deleteFromCache(cacheKey, data);

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await playlistService.deleteById(parseInt(id));

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const { cacheKey } = getCacheKey(req);
  deleteFromCache(cacheKey, data);

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const toPlaylistDTO = (data: PlaylistOuput) => ({
  id: data.id,
  name: data.name,
  creator: data.creator,
  tags: data.tags,
  playtime: moment
    .utc(data.tracks.reduce((accum, obj) => accum + obj.duration, 0) * 1000)
    .format("HH:mm:ss"),
  trackList: data.tracks.map((dt) => ({
    id: dt.id,
    name: dt.name,
    album: dt.album,
    artist: dt.artist,
    duration: moment.utc(dt.duration * 1000).format("HH:mm:ss"),
    artwork: dt.artworkUrl,
    audio: dt.audioUrl,
  })),
});
