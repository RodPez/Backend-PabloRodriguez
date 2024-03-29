const {Router} = require("express");

const Users = require("../dao/models/Users.model");

const passport = require("passport");
const { generateToken } = require("../utils/jwt.utils");

const router = Router();

router.post("/",passport.authenticate("signup", {failureRedirect: "/users/failregister"}) , async (req,res) =>{
    try {
        const access_token = generateToken({email: req.body.email})
        res.status(201).json({status : "success", message: "Usuario registrado", token: access_token})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status: "error", error:"Internal server error"})
    }
})

router.get("/failregister", (req, res) =>{
    console.log("Falló estrategia de registro");
    res.json({error: "Failed register"})
})


module.exports = router;