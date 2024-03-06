const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).send(people);
  } catch (error) {
    console.error('Error in GET /people:', error);
    res.status(500).send(error);
  }
});


module.exports = router;
