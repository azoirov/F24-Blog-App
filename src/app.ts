import express, { Application, Response, NextFunction } from "express";
import { Sequelize } from "sequelize-typescript";
import psql from "loaders/sequelize";
import { IRoute } from "interfaces/route.interface";
import { IRequest } from "interfaces/request.interface";
import { errorResponder } from "middlewares/error.middleware";

class App {
    private routes: IRoute[];
    private app: Application = express();
    private db: Sequelize;

    constructor(routes: IRoute[]) {
        this.routes = routes;
    }

    private initApplication() {
        const PORT = process.env.PORT || 3000;

        this.app.listen(PORT, () => console.log("SERVER READY AT PORT:", PORT));
    }

    private initRoutes() {
        this.routes.map((route) => {
            if (route.router && route.path) {
                this.app.use(route.path, route.router);
            }
        });
    }

    private async initDB() {
        this.db = await psql();
        console.log("CONNECTED TO DATABASE");
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    public async run() {
        await this.initDB();
        this.initApplication();
        this.initMiddlewares();
        this.initRoutes();

        this.app.use(errorResponder);
    }
}

export default App;
