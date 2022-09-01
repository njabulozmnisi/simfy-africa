import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { HttpStatusCode } from "../../lib/httpStatusCodes";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }

  const secret = process.env.ACCESS_TOKEN_SECRET || "";

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(HttpStatusCode.FORBIDDEN);
    }

    // req.user = user;

    next();
  });
};

export default verifyToken;
