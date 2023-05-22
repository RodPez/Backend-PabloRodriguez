const {Router} = require("express");
const Users = require("../dao/models/Users.model");
const { createHash } = require("../utils/cryptPassword.utils");
const passport = require("passport");
const { generateToken } = require("../utils/jwt.utils");

const router = Router();

router.post("/",passport.authenticate("login",{failureRedirect:"/auth/faillogin"} ), async (req,res) =>{
    try {
        if (!req.user){
            return res.status(401).json({status:"error", error:"El usuario y la contraseña no coinciden"})
        }

         req.session.user = {
             first_name: req.user.first_name,
             last_name: req.user.last_name,
             email: req.user.email
         }
        const access_token = generateToken({email: req.user.email})

        //res.json({status:"success", message:"Sesión iniciada", token:access_token})
        res.cookie("authToken", access_token,{maxAge:60000, httpOnly: true}).json({status:"success", message:"Sesión iniciada"})
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"error", error: "Internal server error"})
    }
})

router.get("/github",passport.authenticate("github",{scope:["user: email"]}), 
    async (req, res) =>{}
)

router.get("/githubcallback", passport.authenticate("github",{failureRedirect:"/login"}), 
    async (req, res) =>{
        req.session.user = req.user;
        res.redirect("/")
    }
)

router.get("/logout", (req,res) =>{
    req.session.destroy(error => {
        if (error) return res.json({error})
        res.redirect("/login")
    })
})

router.patch("/forgotpassword", async (req,res) =>{
    try {
        const {email, password} = req.body
        const passwordEncrypted = createHash(password)
        await Users.updateOne({email},{password:passwordEncrypted})
        res.json({message: "Contraseña actualizada"})
    } catch (error) {
        res.json({error: error.message})
    }
})

router.get("faillogin", (req, res) =>{
    console.log("Fallo de inicio de sesión");
    res.json({error: "Failed login"})
})

module.exports = router;