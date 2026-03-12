require('dotenv').config({path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());
app.use('/api', recipeRoutes);

//Server frontend in production
if(isProd){
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.get('/health', (req,res) => {
    res.json({status: 'OK', message: 'SundayPrep API is running'});
});

app.listen(PORT, () => {
    console.log(`SundayPrep server running on port ${PORT}`);
});
