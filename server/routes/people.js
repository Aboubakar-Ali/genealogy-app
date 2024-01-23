const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Route pour créer une nouvelle personne
router.post('/add', async (req, res) => {
    try {
      const newPerson = new Person(req.body);
      await newPerson.save();
      console.log('Person saved:', newPerson);
      res.status(201).send(newPerson);
    } catch (error) {
      console.error('Error in /add route:', error);
      res.status(400).send(error);
    }
});
  

// router.get('/test', (req, res) => {
//     res.send('Test route is working');
//   });
  

// Ajoutez d'autres routes au besoin...

module.exports = router;
