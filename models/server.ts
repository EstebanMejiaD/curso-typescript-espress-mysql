import express, { Application } from "express";
import cors from "cors";
import db from "../database/connection";

import * as userRoutes from "../routes/users.routes";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";


    // inicialize my dbConnection
    this.dbConnection()

    // inicialize my middlewares
    this.middlewares();

    // inicialize my routes
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online')
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes.default);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server rinning on port: " + this.port);
    });
  }
}

export default Server;
