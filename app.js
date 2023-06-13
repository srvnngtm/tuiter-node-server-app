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
    store: new session.MemoryStore(),
  })
);

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
    
//   })
// );


app.use((req, res, next) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://srvnn.netlify.app",
      "https://tuiter-node-server-app-ikp4.onrender.com",
    ];
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
  });



HelloController(app);
// UserController(app)
tuitsController(app);
AuthController(app);

const port = process.env.PORT || 4000;

app.listen(port);
