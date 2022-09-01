import { Request, Response } from "express";
import logger from "../../lib/logger";
import { TrackInput } from "../../database/models/track";
import * as trackService from "../../database/services/track.service";
import { HttpStatusCode } from "../../lib/httpStatusCodes";
import { getCacheKey, setCache } from "../middleware/cache";

export const getAll = async (req: Request, res: Response) => {
  const data = await trackService.getAll();

  if (!data) {
    return res.sendStatus(HttpStatusCode.NOT_FOUND);
  }

  res.status(HttpStatusCode.OK).send(data);
};

export const get = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await trackService.getById(parseInt(id));

  if (!data) {
    return res.sendStatus(HttpStatusCode.NOT_FOUND);
  }

  const { cacheKey } = getCacheKey(req);
  setCache(cacheKey, data);
  
  res.status(HttpStatusCode.OK).send(data);
};

export const create = async (req: Request, res: Response) => {
  const payload = req.body as TrackInput;

  if (!payload?.name) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await trackService.create(payload);

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body as TrackInput;

  if (!id || !payload?.name) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await trackService.update(parseInt(id), payload);

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  res.status(HttpStatusCode.OK).send({ success: true });
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  const data = await trackService.deleteById(parseInt(id));

  if (!data) {
    return res.sendStatus(HttpStatusCode.BAD_REQUEST);
  }

  res.status(HttpStatusCode.OK).send({ success: true });
};
