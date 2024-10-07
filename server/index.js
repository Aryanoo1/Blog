import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import UserModel from "./models/UserModel.js";
import BlogModel from "./models/BlogModel.js";
import router from "./routes/index.js";

const app = express();
dotenv.config();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://vercel.live"],
    },
  })
);

app.use(express.json());
app.use(
  cors({
    origin: "https://blog-client-mu-amber.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api", router);
app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

db().then(() => {
  app.listen(8080, () => {
    console.log("Server started");
  });
});

export default app;
