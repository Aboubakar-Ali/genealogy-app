import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonNode from './PersonNode';
import AddPersonForm from './AddPersonForm'; 
import './FamilyTree.css';

const FamilyTree = () => {
  const [family, setFamily] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/people')
      .then(response => {
        setFamily(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des personnes:', error);
      });
  }, []);

  // acces à `setFamily`
  const onPersonAdded = (newPerson) => {
    setFamily([...family, newPerson]);
  };

  return (
    <div className="family-tree">
      <h2>Arbre Généalogique</h2>
      <AddPersonForm onPersonAdded={onPersonAdded} /> {/* AJout formulaire*/}
      {family.map(person => (
        <PersonNode key={person._id} person={person} />
      ))}
    </div>
  );
};

export default FamilyTree;
