const Login = require('../models/loginModel.js')

exports.index = (req, res) => {
  if(req.session.user) return res.render('login-logado.ejs') //Verificando se o usuario esta salvo (se esta logado)
  return res.render('login.ejs')
  console.log(req.session.user) //Navegador do usuario salvo nas sessions
}

exports.register = async (req, res) => {
  try{
    const login = new Login(req.body)
    await login.register() //E interessante chamar apenas uma unica funcao fora do Model que ira fazer a validacao dos dados, e internamente (no model) essa unica funcao ira chamar todas a outras.

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login')
      })
    } else{
      req.flash('success', 'Cadastro realizado com sucesso.');
      req.session.save(function() {
        return res.redirect('/login')
      });
    }

  }catch(err){
    res.render('404')
    console.log(err)
    return
  }
}

exports.login = async (req, res) => {
  try{
    const login = new Login(req.body)
    await login.login() //E interessante chamar apenas uma unica funcao fora do Model que ira fazer a validacao dos dados, e internamente (no model) essa unica funcao ira chamar todas a outras.

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login')
      })
    } else{
      req.flash('success', 'Logado com sucesso');
      req.session.user = login.user; //Salvando o browser do usuario nas sessoes do server.
      req.session.save(function() {
        return res.redirect('/login')
      });
    }

  }catch(err){
    res.render('404')
    console.log(err)
    return
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
}