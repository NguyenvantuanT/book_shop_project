const bookController = require("../controllers/book_controller");


const router = require("express").Router();


//ADD BOOK
router.post("/" , bookController.addABook);

//GET ALL BOOK
router.get("/" , bookController.getAllBook);

//GET A BOOK
router.get("/:id" , bookController.getABook);

//GET A BOOK
router.put("/:id" , bookController.updateBook);

//DELETE BOOK
router.delete("/:id" , bookController.deleteBook);



module.exports = router;