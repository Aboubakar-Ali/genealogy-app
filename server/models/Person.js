const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: Date,
  deathDate: Date,
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }]
});

module.exports = mongoose.model('Person', personSchema);

