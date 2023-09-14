import express from "express";
import { userController } from "../controller/user.controller";
import { middleware } from "../middleware";
import { businessController } from "../controller/business.controller";
import { roleController } from "../controller/role.controller";
import { moduleController } from "../controller/module.controller";
import { authController } from "../controller/auth.controller";

export const router = new class Router {

    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    private async loadRoutes() {
        this.loadAuthRoutes();
        this.loadUserRoutes();
        this.loadBusinessRoutes();
        this.loadRoleRoutes();
        this.loadModuleRoutes();
    }

    private async loadAuthRoutes() {
        // POST
        this.router.post("/auth", authController.authenticate);
    }

    private async loadUserRoutes() {
        // GETTERS
        this.router.get("/users", middleware.authenticateToken, userController.getUsers);
        this.router.get("/users/:id", middleware.authenticateToken, userController.getUser);
    }

    private async loadBusinessRoutes() {
        // GETTERS
        this.router.get("/business", middleware.authenticateToken, businessController.getBusinesses);
    }

    private async loadRoleRoutes() {
        // GETTERS
        this.router.get("/roles", middleware.authenticateToken, roleController.getRoles);
    }

    private async loadModuleRoutes() {
        // GETTERS
        this.router.get("/modules", middleware.authenticateToken, moduleController.getModules);
    }

    public getRouter() {
        return this.router;
    }
}