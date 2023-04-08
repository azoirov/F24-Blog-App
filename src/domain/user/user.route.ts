import { Router } from "express";
import UserController from "./user.controller";

class UserRoute {
    public path = "/users";
    public router = Router();
    public controller = new UserController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.controller.getAll);
        this.router.post("/register", this.controller.register);
    }
}

export default UserRoute;
