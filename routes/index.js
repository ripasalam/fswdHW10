const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


const middlewareAuth = require('../middleware/auth')
//controller
const moviesController = require('../controller/moviesController')
const authenticationController = require('../controller/AuthenticationController')
const usersController = require('../controller/usersController')


//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../upload'))
  },
  filename: function (req, file, cb) {
    
    cb(
        null, 
        Date.now() + file.originalname
        )
  }
})

const upload = multer({storage})



//auth
router.post("/register", authenticationController.registerUser)
router.post("/login", authenticationController.loginUser)

//movies
router.get("/movies", middlewareAuth.verifyToken, moviesController.movies)
router.get("/movies/:id", middlewareAuth.verifyToken, moviesController.getMovies)
router.post("/movies", middlewareAuth.verifyToken, middlewareAuth.verifyAdmin, upload.single("photo"), moviesController.createMovies)
router.put("/movies/:id", middlewareAuth.verifyToken, middlewareAuth.verifyAdmin, upload.single("photo"), moviesController.updateMovies)
router.delete("/movies/:id", middlewareAuth.verifyToken, middlewareAuth.authorization, moviesController.deleteMovies)

//user
router.get("/users", middlewareAuth.verifyToken, middlewareAuth.verifyAdmin, usersController.users)
router.get("/users/:id", middlewareAuth.verifyToken, middlewareAuth.authorization, usersController.getUser)
router.put("/users/:id", middlewareAuth.verifyToken, middlewareAuth.authorization, usersController.updateUser)
router.delete("/users/:id", middlewareAuth.verifyToken, middlewareAuth.authorization, usersController.deleteUser)


//uploadFile
router.post("/profile/upload", upload.single("photo"),
(req, res)=>{
    const file = req.file.path;
    console.log(file)

    if(!file) {
      res.status(400).send({
        status: false,
        data: "No file is selected"
      })
    }
    // profiles[req.query.index].photo = req.file.path;
    res.send(file)
})
module.exports = router

