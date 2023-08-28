import express from "express";
import { userController } from "../controller/user.controller";
import { middleware } from "../middleware";

export const router = new class Router {

    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    public async loadRoutes() {
        this.router.get("/user", middleware.isAuthenticated, userController.getUsers);
    }

    public getRouter() {
        return this.router;
    }
}