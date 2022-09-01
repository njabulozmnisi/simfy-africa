import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { HttpStatusCode } from "../../lib/httpStatusCodes";

const generateToken = (user: any) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "";
  return jwt.sign(user, secret, { expiresIn: "360s" });
};

export const login = async (req: Request, res: Response) => {
  const { username } = req.body;
  const user = { name: username };

  const secret = process.env.REFRESH_TOKEN_SECRET || "";

  const accessToken = generateToken(user);
  const refreshToken = jwt.sign(user, secret);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
};

let refreshTokens: string[] = [];

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(HttpStatusCode.FORBIDDEN);
  }

  const secret = process.env.REFRESH_TOKEN_SECRET || "";

  jwt.verify(refreshToken, secret, (err: any, user: any) => {
    if (err) res.sendStatus(HttpStatusCode.FORBIDDEN);

    const accessToken = generateToken({ name: user.name });
    res.json({ accessToken });
  });
};
