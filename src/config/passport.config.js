const passport = require("passport");
const jwt = require("passport-jwt")
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const { createHash } = require("../utils/cryptPassword.utils");
const Users = require("../dao/models/Users.model");
const { passwordValidate } = require("../utils/cryptPassword.utils");
const cookieExtractor = require("../utils/cookieExtractor.utils");


const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const initializePassport = () =>{
    passport.use("signup", 
        new LocalStrategy({passReqToCallback:true, usernameField:"email"}, 
            async (req, username, password, done) => {
                try {
                    const {first_name, last_name, email, age, password } = req.body;
                    const newUserInfo = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password)
                    }

                    const user = await Users.create(newUserInfo);
                    
                    done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )
    passport.use("login",
        new LocalStrategy({usernameField: "email"},
            async (username, password, done) =>{
                try {
                    const user = await Users.findOne({email:username})
                    if (!user) {
                        console.log("El usuario no existe");
                        return done(null, false)
                    }

                    if (!passwordValidate(password, user)) {
                        done(null, false)
                    }

                    done(null, user)
                } catch (error) {
                    done(error)
                }
            } 
        )
    )

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.TOKEN_KEY
        }, async (jwt_payload, done) => {
                try {
                    done(null,jwt_payload)
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.use("github", new GithubStrategy({
        clientID: process.env.GITHUB_ID ,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://localhost:8080/auth/githubcallback"
    }, async (accessToken, refreshToken, profile, done) =>{
            try {
                console.log(profile);
                const user = await Users.findOne({email: profile._json.email})
                if (!user) {
                    const newUserInfo = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: 18 ,
                        email: profile._json.email,
                        password: ""
                    }
                    const newUser = await Users.create(newUserInfo);
                    return done(null, newUser)
                }

                done(null, user)
            } catch (error) {
                done(error)
            }
        })
    )

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        const user = await Users.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport