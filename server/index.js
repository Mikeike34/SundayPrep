require('dotenv').config({path: '../.env' });
const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', recipeRoutes);

app.get('/health', (req,res) => {
    res.json({status: 'OK', message: 'SundayPrep API is running'});
});

app.listen(PORT, () => {
    console.log(`SundayPrep server running on port ${PORT}`);
});
