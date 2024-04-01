const {Category} = require("../model/category_model");

const categoryController = {

    //POST CATEGORY
    addCategory: async (req, res) => {
        try {
            const newCategory = new Category(req.body);
            const saveCategory = await newCategory.save();
            res.json(saveCategory);
        } catch (error) {
            res.json(error);
        }
    },

    //GET ALL CATEGORY
    getAllCategory: async (req, res) => {
        try {
            const category = await Category.find();
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //GET A CATEGORY
    getACategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}


module.exports = categoryController;