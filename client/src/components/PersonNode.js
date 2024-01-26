import React from 'react';
import './PersonNode.css'; 

const PersonNode = ({ person }) => {
  return (
    <div className="person-node">
      <div className="person-name">{person.name}</div>
      {/* ...*/}
    </div>
  );
};

export default PersonNode;
