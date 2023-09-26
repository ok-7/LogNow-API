import express from "express";
import database from "./database/database";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { router } from "./routes";
import dotenvSafe from "dotenv-safe";

new class API {

    private app: express.Application;
    private server: http.Server;

    constructor() {
        dotenvSafe.config();
        this.start();
    }

    private async start() {
        await database.establishDatabaseConnection();

        this.app = express();
        this.app.use(cors({
            credentials: true,
        }));

        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(express.json());

        this.server = http.createServer(this.app);
        this.server.listen(8080, () => console.log(`Server running on http://localhost:8080/`));

        this.app.use("/", router.getRouter());
    }
}