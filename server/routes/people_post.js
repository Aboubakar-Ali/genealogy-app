const express = require('express');
const router = express.Router();
const Person = require('../models/Person');



router.post('/', async (req, res) => {
    try {
      const newPerson = new Person(req.body);
      await newPerson.save();
      console.log('Person saved:', newPerson);
      res.status(201).send(newPerson);
    } catch (error) {
      console.error('Error in POST / route:', error);
      res.status(400).send(error);
    }
});  

module.exports = router;
