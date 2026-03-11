const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/random', recipeController.getRandomRecipe);
router.get('/search', recipeController.searchByName);
router.get('/ingredient', recipeController.searchByIngredient);
router.get('/recipe/:id', recipeController.getRecipeById);
router.get('/categories', recipeController.getCategories);

module.exports = router;