const {Router} = require("express");

const router = Router();

router.get("/set", (req, res) =>{
    res.cookie("cookieTest","Cookie de prueba", {maxAge: 60000 , signed:true}).send("cookie")
})

router.get("/get", (req, res) =>{
    console.log(req.signedCookies);
    res.json({cookies: req.signedCookies})
})

router.get("/clear", (req, res) =>{
    res.clearCookie("cookieTest").send("Se elimino cookie")
})

module.exports = router;