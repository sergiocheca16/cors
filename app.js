const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results;
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los personajes');
  }
});

app.get('/characters/:name', async (req, res) => {
  const characterName = req.params.name;

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
    const character = response.data.results[0];

    if (character) {
      res.json(character);
    } else {
      res.status(404).send('Personaje no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el personaje');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
