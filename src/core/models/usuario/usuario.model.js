'use strict';

const { mongoose } = require('../../database');
const bcrypt = require('bcryptjs');
const { saltWorkFactor } = require('../../constants');

const usuarioSchema = mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  descricao: String,
  reputacao: Number,
  fotoPerfil: String,
});

usuarioSchema.pre('save', function(next) {
  const user = this;

  const salt = bcrypt.genSaltSync(saltWorkFactor);

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  next();
});

usuarioSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
