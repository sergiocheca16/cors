const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

//Obtener todos los personajes
app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character/')

        res.json(response.data.results)
    } catch {
        res.status(404).json({error: 'personajes no encontrados'})
    }
});

//Obtener personaje por nombre
app.get('/characters/:name', async (req, res) => {
    const { name } = req.params
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`
   
    try {
        const response = await axios.get(url)
        const characters = response.data.results
        
        res.json(characters)
    } catch {
        res.status(404).json({error: 'personaje no encontrado'})
    }
});

app.listen(PORT, () => {
    console.log(`Express esta escuchando en el puerto http://localhost:${PORT}`)
});