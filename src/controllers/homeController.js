const HomeModel = require('../models/HomeModel.js');
const Contato = require('../models/ContatoModel.js');

exports.index = async (req, res, next) => {
  const contatos = await Contato.buscaContatos()
  res.render('index', { contatos })
}

