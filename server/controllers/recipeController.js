require('dotenv').config({ path: '../env'});
const axios = require('axios');

const BASE_URL = process.env.MEALDB_BASE_URL;

const getRandomRecipe = async (req , res) => {
    try{
        const response = await axios.get(`${BASE_URL}/random.php`);
        res.json(response.data);
    }catch (error){
        res.status(500).json({error: 'Failed to fetch random recipe'});
    }
};

const searchByName = async (req, res) => {
    const { q } = req.query;
    if(!q) return res.status(400).json({error: 'Query parameter "q" is required'});

    try{
        const response = await axios.get(`${BASE_URL}/search.php?s=${q}`);
        res.json(response.data);
    }catch (error){
        res.status(500).json({ error: 'Failed to search recipes'});
    }
};

const searchByIngredient = async (req, res) => {
    const { i } = req.query;
    if(!i) return res.status(400).json({error: 'Query parameter "i" is required'});

    try{
        const response = await axios.get(`${BASE_URL}/filter.php?i=${i}`);
        res.json(response.data);
    }catch (error){
        res.status(500).json({error: 'Failed to search by ingredient'});
    }
};

const getRecipeById = async (req, res) => {
    const {id} = req.params;

    try{
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
        res.json(response.data);
    }catch (error){
        res.status(500).json({error: 'Failed to fetch recipe'});
    }
};

const getCategories = async (req,res) => {
    try{
        const response = await axios.get(`${BASE_URL}/catergories.php`);
        res.json(response.data);
    }catch (error){
        res.status(500).json({error: 'Failed to fetch categories'});
    }
};

module.exports = {
    getRandomRecipe,
    searchByName,
    searchByIngredient,
    getRecipeById,
    getCategories
};