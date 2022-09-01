import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "./api/middleware/morgan";
import routes from "./api/routes";
import sequelizeContextInit from "./database/init";
import dotenv from "dotenv";
import verifyToken from "./api/middleware/auth";
import { checkCache, redisInit } from "./api/middleware/cache";
import logger from "./lib/logger";

dotenv.config();

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan);

//Routes
app.use("/auth", routes.auth);
app.use("/track", checkCache, routes.track);
app.use("/playlist", checkCache, routes.playlist);

//Routes with auth and cache middleware
// app.use("/track", [verifyToken, checkCache], routes.track);
// app.use("/playlist", [verifyToken, checkCache], routes.playlist);

//Start listening to server from port
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  logger.info(`application listening at http://localhost:${PORT}`);
});

sequelizeContextInit();
redisInit();
