import express from "express";
import HelloController from "./controllers/hello-controllers.js";
import UserController from "./users/users-controller.js";
import tuitsController from "./controllers/tuits/tuits-controller.js";
import cors from "cors";
import session from "express-session";
import AuthController from "./users/auth-controller.js";

const app = express();

app.use(express.json());
// app.use(cors())
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

HelloController(app);
// UserController(app)
tuitsController(app);
AuthController(app);

const port = process.env.PORT || 4000;

app.listen(port);
