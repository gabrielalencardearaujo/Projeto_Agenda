const Contato = require('../models/ContatoModel.js')

exports.index = (req, res, next) => {
  res.render('contato.ejs', { contato: {} })
}

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body)
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => res.redirect('/contato'))
      return
    }

    req.flash('success', 'Contato Registrado com Sucesso')
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
    return
  } catch (err) {
    console.log(err)
    return res.render('404.ejs')
  }
}

exports.editContato = async (req, res) => {
  console.log(req.params.id)
  if(!req.params.id) return res.render('404.ejs'); //Verificando se o parametro id foi enviado pela URL

  const contato = await Contato.buscaPorId(req.params.id)
  console.log(contato)
  if(!contato) return res.render('404.ejs')

  res.render('contato.ejs', { contato })
}

exports.edit = async function(req, res) {
  try{
    if(!req.params.id) return res.render('404.ejs')
    const contato = new Contato(req.body);
    await contato.edit(req.params.id)
  
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => res.redirect('/contato'))
      return
    }
  
    req.flash('success', 'Contato editado com Sucesso')
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
    return
  }catch(err){
    console.log(err)
    res.render('404')
  }
}

exports.deleteContato = async function(req, res) {
  if(!req.params.id) return res.render('404.ejs');

  const deletarContato = await Contato.deleteContato(req.params.id)
  if(!deletarContato) return res.render('404.ejs')

  req.flash('success', 'Contato apagado com Sucesso')
    req.session.save(() => res.redirect(`back`))
    return
}