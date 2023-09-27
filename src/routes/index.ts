import express from "express";
import { userController } from "../controller/user.controller";
import { middleware } from "../middleware";
import { businessController } from "../controller/business.controller";
import { roleController } from "../controller/role.controller";
import { moduleController } from "../controller/module.controller";
import { authController } from "../controller/auth.controller";
import { reportBookController } from "../controller/reportbook.controller";

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
        this.loadReportBookRoutes();
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
        this.router.put("/user/role/add/:id", middleware.authenticateToken, userController.addRole);
        this.router.put("/user/role/remove/:id", middleware.authenticateToken, userController.removeRole);

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
        this.router.get("/roles/:id", middleware.authenticateToken, roleController.getRoleById);
    }

    private async loadModuleRoutes() {
        // GETTERS
        this.router.get("/modules", middleware.authenticateToken, moduleController.getModules);
        this.router.get("/modules/:id", middleware.authenticateToken, moduleController.getModuleById);
    }

    private async loadReportBookRoutes() {
        // GETTERS
        this.router.get("/reportbook/logs", middleware.authenticateToken, reportBookController.getLogs);
        this.router.get("/reportbook/logs/:id", middleware.authenticateToken, reportBookController.getLogsByUserId);
        // POST
        this.router.post("/reportbook/logs/add", middleware.authenticateToken, reportBookController.createLog);
        // PUT
        this.router.put("/reportbook/logs/text/:id", middleware.authenticateToken, reportBookController.updateLogText);
        // DELETE
        this.router.delete("/reportbook/logs/:id", middleware.authenticateToken, reportBookController.deleteLog);
    }

    public getRouter() {
        return this.router;
    }
}