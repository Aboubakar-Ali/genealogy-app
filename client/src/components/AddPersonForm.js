// src/components/AddPersonForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPersonForm = ({ onPersonAdded }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [parents, setParents] = useState([]);
  const [peopleOptions, setPeopleOptions] = useState([]); // Pour stocker les options des parents

  useEffect(() => {
        // Charger la liste des personnes existantes pour les options des parents
        axios.get('http://localhost:5000/people')
        .then(response => {
            setPeopleOptions(response.data.map(person => ({
            value: person._id,
            label: person.name
            })));
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des personnes', error);
        });
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois au montage

    const handleChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(o => o.value);
        // nouvelle sélection tout en limitant le nombre total à deux
        setParents(prevParents => {
          const newSelection = selectedOptions.filter(option => !prevParents.includes(option));
          if (newSelection.length > 0 && prevParents.length < 2) {
            return [...prevParents, ...newSelection].slice(0, 2); // Garantit que le tableau ne dépasse pas deux éléments
          }
          return prevParents; // Si aucune nouvelle sélection ou si déjà deux parents, ne changez rien
        });
    };
      

    const handleSubmit = (event) => {
        event.preventDefault();
        const personData = {
        name,
        birthDate,
        deathDate: deathDate || undefined, // Envoie `undefined` si le champ est vide
        parents: parents.length ? parents : undefined, // Envoie `undefined` si aucun parent n'est sélectionné
        };

    axios.post('http://localhost:5000/people/add', personData)
      .then(response => {
        onPersonAdded(response.data); // Met à jour l'état dans FamilyTree
        // Réinitialiser les champs après l'ajout
        setName('');
        setBirthDate('');
        setDeathDate('');
        setParents([]);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        required
      />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        placeholder="Date de naissance"
        required
      />
      <input
        type="date"
        value={deathDate}
        onChange={(e) => setDeathDate(e.target.value)}
        placeholder="Date de décès (facultatif)"
      />
      <select
        multiple={true}
        value={parents}
        onChange={handleChange}
      >
        {peopleOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button type="submit">Ajouter Personne</button>
    </form>
  );
};



export default AddPersonForm;
