const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();

app.use(cors()); 

app.use(express.json());

// Middleware pour parser le JSON
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Port du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Le serveur fonctionne sur le port ${PORT}`));

const getpeopleRoutes = require('./routes/people_get');
app.use('/get/people', getpeopleRoutes);

const postpeopleRoutes = require('./routes/people_post');
app.use('/post/people', postpeopleRoutes);

