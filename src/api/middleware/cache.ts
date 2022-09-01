import { RedisClientType } from "@redis/client";
import { Request, Response, NextFunction } from "express";
import * as redis from "redis";
import logger from "../../lib/logger";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_EXPIRATION = 60;

let client: RedisClientType;

export const redisInit = () => {
  try {
    client = redis.createClient({url: `redis://${process.env.CACHE_HOST}:${process.env.CACHE_PORT}`});
    client.connect();
  } catch (err) {
    logger.error(err);
  }
};

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, method, cacheKey } = getCacheKey(req);

  if (method !== "GET" && !id) {
    next();
  }

  try {
    const data = await client.get(cacheKey);

    if (data) {
      res.send(JSON.parse(data));
      logger.info(`Retrieved from cache ${cacheKey}`);
    } else {
      next();
    }
  } catch (error) {
    logger.error({ cacheKey: cacheKey, error });
  }
};

export const setCache = async (key: string, data: any) => {
  await client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(data));
  logger.info(`Caching new key ${key}`);
};

export const getCacheKey = (request: Request) => {
  const { baseUrl, method } = request;

  const id = `${request.url.split("/").join("").trim()}`;

  const entity = `${baseUrl.replace("/", "")}`;

  const cacheKey = `${entity}:${id}`;

  return {
    id,
    method,
    entity,
    cacheKey,
  };
};
