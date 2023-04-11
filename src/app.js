const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./router/index.js");
const mongoConnect = require("../db/index.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoConnect();
      
router(app)  



module.exports = app;