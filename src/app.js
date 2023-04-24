const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const FileStore = require("session-file-store");
const router = require("./router/index.js");
const mongoConnect = require("../db/index.js");
const cookieParser = require("cookie-parser");

const fileStorage = FileStore(session);

const app = express();

const hbs = handlebars.create({
    defaultLayout: "main",
    extname: ".handlebars",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  });

app.use(cookieParser(process.env.COOKIE_HASH));
app.use(express.json());
app.use(session({
  store: new fileStorage({path:"./sessions", ttl: 15, retries:0 }),
  secret: process.env.SESSION_HASH,
  resave: false,
  saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine(".handlebars", hbs.engine);
app.set("views", __dirname + "/views")
app.set("view engine", ".handlebars")

mongoConnect();
      
router(app)  



module.exports = app;