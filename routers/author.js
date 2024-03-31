const authorController = require("../controllers/author_controller");

const router = require("express").Router();


//ADD AUTHOR
router.post("/" , authorController.addAuthor);

//GET ALL AUTHOR
router.get("/" , authorController.getAllAuthors);

//GET AN AUTHOR
router.get("/:id" , authorController.getAnAuthor);

//UPDATE AUTHOR
router.put("/:id" , authorController.updateAuthor);

//DELETE AUTHOR
router.delete("/:id" , authorController.deleteAuthor);


module.exports = router;