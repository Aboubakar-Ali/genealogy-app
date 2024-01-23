const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB (Remplacez 'votre_uri_mongodb' par votre URI de connexion)
mongoose.connect('mongodb+srv://aboubakaraliabdoulaziz:2XzIUbYUHyyscjDC@cluster0.tqz1bav.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Port du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Le serveur fonctionne sur le port ${PORT}`));

const peopleRoutes = require('./routes/people');

// Utiliser les routes pour les personnes
app.use('/people', peopleRoutes);
