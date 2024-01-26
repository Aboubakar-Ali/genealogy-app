// Dans votre fichier routes/people.js
const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Route pour récupérer toutes les personnes
router.get('/', async (req, res) => {
  try {
    const people = await Person.find(); // Utilise Person.find() pour récupérer tous les documents de la collection
    res.status(200).send(people);
  } catch (error) {
    console.error('Error in GET /people:', error);
    res.status(500).send(error);
  }
});

// Route pour créer une nouvelle personne
router.post('/add', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    console.log('Person saved:', newPerson);
    res.status(201).send(newPerson);
  } catch (error) {
    console.error('Error in POST /add route:', error);
    res.status(400).send(error);
  }
});

module.exports = router;
