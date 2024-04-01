const categoryController = require("../controllers/category_controller");


const router = require("express").Router();

//POST CATEGORY
router.post("/" , categoryController.addCategory);

//GET ALL CATEGORY
router.get("/" , categoryController.getAllCategory);

//GET A CATEGORY
router.get("/:id" , categoryController.getACategory);

module.exports = router;