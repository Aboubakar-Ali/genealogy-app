// src/components/AddChildrenForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddChildrenForm = ({ parentId, onChildAdded }) => {
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const childData = {
      name: childName,
      birthDate: childBirthDate,
      parents: [parentId] // Assigne l'ID du parent à l'enfant
    };

    axios.post('http://localhost:5000/people/add', childData)
      .then(response => {
        onChildAdded(response.data); // Met à jour l'état dans FamilyTree ou le composant parent
        setChildName('');
        setChildBirthDate('');
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'enfant', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={childName}
        onChange={(e) => setChildName(e.target.value)}
        placeholder="Nom de l'enfant"
        required
      />
      <input
        type="date"
        value={childBirthDate}
        onChange={(e) => setChildBirthDate(e.target.value)}
        placeholder="Date de naissance de l'enfant"
        required
      />
      <button type="submit">Ajouter Enfant</button>
    </form>
  );
};

export default AddChildrenForm;
