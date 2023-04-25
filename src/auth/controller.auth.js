const {Router} = require("express");
const Users = require("../dao/models/Users.model");

const router = Router();

router.post("/", async (req,res) =>{
    try {
        const {email, password} = req.body

        const user = await Users.findOne({email})
        if (!user) return res.status(400).json({status:"error", error:"El usuario y la contraseña no coincide"})

        if (user.password !== password) return res.status(400).json({status:"error", error:"El usuario y la contraseña no coincide"})

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

module.exports = router;