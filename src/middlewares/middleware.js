exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors'); 
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user //Atribuindo as sessoes do ususario no middleware global. Assim sempre verificamos se esta logado.
  console.log('Passei no middleware global.')
  next()
}

exports.loginRequired = (req, res, next) => {
  if(!req.session.user){
    req.flash('errors', 'Voce precisa estar logado')
    req.session.save(() => res.redirect('/login'))
    return
  }
  next()
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err){
    return res.render('404')
  }
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next()
}