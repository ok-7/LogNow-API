import express from "express";
import { userController } from "../controller/user.controller";
import { middleware } from "../middleware";
import { businessController } from "../controller/business.controller";
import { roleController } from "../controller/role.controller";
import { moduleController } from "../controller/module.controller";

export const router = new class Router {

    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    public async loadRoutes() {
        this.router.get("/users", middleware.isAuthenticated, userController.getUsers);
        this.router.get("/businesses", middleware.isAuthenticated, businessController.getBusinesses);
        this.router.get("/roles", middleware.isAuthenticated, roleController.getRoles);
        this.router.get("/modules", middleware.isAuthenticated, moduleController.getModules);

        // this.router.get("/users/:id", middleware.isAuthenticated, userController.getUsers);
    }

    public getRouter() {
        return this.router;
    }
}