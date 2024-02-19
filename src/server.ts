import "dotenv/config";
import express, { Express, json } from "express";
import { sequelize } from "./db.js";
import cors from "cors";
import routers from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error-middleware.js";

const PORT = process.env.PORT || 4000;
const app: Express = express();

app.use(cookieParser());
app.use(cors());
app.use(json());
app.use("/api", routers);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.status(200).json({message: "it's OK"});
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();