const {Router} = require("express");
const Users = require("../dao/models/Users.model");
const { passwordValidate } = require("../utils/cryptPassword.utils");
const { createHash } = require("../utils/cryptPassword.utils");

const router = Router();

router.post("/", async (req,res) =>{
    try {
        const {email, password} = req.body

        const user = await Users.findOne({email})
        if (!user) return res.status(401).json({status:"error", error:"El usuario y la contraseña no coinciden"})

        const isPasswordValid= passwordValidate(password, user)

        if (!isPasswordValid) return res.status(401).json({status:"error", error:"El usuario y la contraseña no coinciden"})

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        res.json({status:"success", message:"Sesión iniciada"})
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"error", error: "Internal server error"})
    }
})

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

module.exports = router;