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
        this.router.get("/users/:id", middleware.authenticateToken, userController.getUserById);
        
        // POST
        this.router.post("/user", middleware.authenticateToken, userController.createUser);

        // UPDATE
        this.router.put("/user/username/:id", middleware.authenticateToken, userController.updateUsername);
        this.router.put("/user/password/:id", middleware.authenticateToken, userController.updatePassword);
        this.router.put("/user/addrole/:id", middleware.authenticateToken, userController.addRole);
        this.router.put("/user/removerole/:id", middleware.authenticateToken, userController.removeRole);

        // DELETE
        this.router.delete("/user/:id", middleware.authenticateToken, userController.deleteUser);
    }

    private async loadBusinessRoutes() {
        // GETTERS
        this.router.get("/business", middleware.authenticateToken, businessController.getBusinesses);
        this.router.get("/business/:id", middleware.authenticateToken, businessController.getBusinessById);
    }

    private async loadRoleRoutes() {
        // GETTERS
        this.router.get("/roles", middleware.authenticateToken, roleController.getRoles);
        this.router.get("/role/:id", middleware.authenticateToken, roleController.getRoleById);
    }

    private async loadModuleRoutes() {
        // GETTERS
        this.router.get("/modules", middleware.authenticateToken, moduleController.getModules);
        this.router.get("/module/:id", middleware.authenticateToken, moduleController.getModuleById);
    }

    public getRouter() {
        return this.router;
    }
}