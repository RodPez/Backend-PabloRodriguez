const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const mongoConnect = require("../db/index.js");
const cookieParser = require("cookie-parser");
const {dbAdmin, dbPassword,dbHost, dbName} = require("../src/config/db.config");
const router = require("./router/index.js");

const app = express();

const hbs = handlebars.create({
    defaultLayout: "main",
    extname: ".handlebars",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(process.env.COOKIE_HASH)); 
app.use(session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${dbAdmin}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`,
    mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    ttl: 180
  }) ,
  secret: process.env.SESSION_HASH,
  resave: false,
  saveUninitialized: false
}))

app.engine(".handlebars", hbs.engine);
app.set("views", __dirname + "/views")
app.set("view engine", ".handlebars")

mongoConnect();
      
router(app)  



module.exports = app;