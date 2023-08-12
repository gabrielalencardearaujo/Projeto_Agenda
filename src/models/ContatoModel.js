const mongoose = require('mongoose')
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now } //Registra a data que foi criado.
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return

  this.contato = await ContatoModel.create(this.body)
  console.log(this.contato)
}

Contato.prototype.valida = function () {
  //Validacao
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email invalido');
  if (!this.body.nome) this.errors.push('Nome e um campo obrigatorio.');
  if (!this.body.email && !this.body.telefone) {
    this.errors.push('Email ou telefone sao necessarios.')
  }
}

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    //Verifica se foram digitados apenas valores do tipo string. 
    if (typeof this.body[key] !== 'string') {
      this.body = '';
    }
  }

  //Configura exatamente sera enviado ao banco de dados. Neste caso, exclui o csrfToken
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone
  }
}

Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

//Funcoes estaticas:
Contato.buscaPorId = async function (id) {
  if (typeof id !== 'string') return

  const contato = await ContatoModel.findById(id)
  return contato
}

Contato.buscaContatos = async function () {
  const contatos = await ContatoModel.find().sort({ criadoEm: -1 })
  return contatos
}

Contato.deleteContato = async function(id){
  console.log(id)
  if (typeof id !== 'string') return
  const contato = await ContatoModel.findByIdAndDelete(id)
  return contato
}

module.exports = Contato;