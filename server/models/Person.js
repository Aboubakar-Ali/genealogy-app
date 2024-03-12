const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  Adress: { type: String},
  birthDate: Date,
  Place_of_Birth: { type: String},
  profession: { type: String},
  hobbies: { type: String},
  deathDate: Date,
  image: { type: String},
  sexe: { type: String, required: true},
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }]
});

module.exports = mongoose.model('Person', personSchema);

