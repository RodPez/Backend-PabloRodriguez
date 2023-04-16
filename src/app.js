const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./router/index.js");
const mongoConnect = require("../db/index.js");

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

app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoConnect();
      
router(app)  



module.exports = app;