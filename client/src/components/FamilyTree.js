import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonNode from './PersonNode';
import AddPersonForm from './AddPersonForm';
import AddChildrenForm from './AddChildrenForm';
import './FamilyTree.css';

const FamilyTree = () => {
  const [family, setFamily] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null); // Correctement défini comme état

  useEffect(() => {
    axios.get('http://localhost:5000/people')
      .then(response => {
        setFamily(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des personnes:', error);
      });
  }, []);

  const onChildAdded = (newChild) => {
    setFamily([...family, newChild]);
  };

  const onPersonAdded = (newPerson) => {
    setFamily([...family, newPerson]);
  };

  const selectParent = (parentId) => {
    setSelectedParentId(parentId); // Correctement implémentée pour définir l'ID du parent sélectionné
  };

  return (
    <div className="family-tree">
      <h2>Arbre Généalogique</h2>
      <AddPersonForm onPersonAdded={onPersonAdded} />
      {family.map(person => (
        <PersonNode key={person._id} person={person} onSelectParent={() => selectParent(person._id)} />
      ))}
      {selectedParentId && (
        <AddChildrenForm parentId={selectedParentId} onChildAdded={onChildAdded} />
      )}
    </div>
  );
};

export default FamilyTree;
