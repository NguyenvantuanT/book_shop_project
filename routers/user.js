const middlewareController = require("../controllers/middlewaretoken_controller");
const userController = require("../controllers/user_controller");

const router = require("express").Router();


//REGISTER
router.post("/register", userController.registerUser);

//LOGIN
router.post("/login", userController.loginUser);

//GET ALL USER
router.get("/", middlewareController.verifyToken, userController.getAllUser);

//DELTE USER
router.delete("/:id", middlewareController.verifyTokenAndAmin, userController.deleteUser);

//RERESH
router.post("/refresh", userController.requestRefeshToken);

//LOG OUT
router.post("/logout", middlewareController.verifyToken,  userController.userLogOut);


module.exports = router;