'use strict';

const { mongoose } = require('../../database');

const ObjectId = mongoose.Schema.Types.ObjectId;

const perguntaSchema = mongoose.Schema({
  titulo: String,
  descricao: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  usuarioId: ObjectId,
  dataCriacao: Date,
  tags: Array,
});

module.exports = mongoose.model('Pergunta', perguntaSchema);
