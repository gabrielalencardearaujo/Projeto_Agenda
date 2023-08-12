const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login(){
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('Usuario invalido!');
      return
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Senha invalida.')
      this.user = null;
    }
  }

  async register(){
    this.valida();
    if(this.errors.length > 0) return;

    await this.userExist();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync(); //Gerando um salt
    this.body.password = bcryptjs.hashSync(this.body.password, salt) //Criando o hash com a senha enviada e o salt.
    
    this.user = await LoginModel.create(this.body)
  }

  async userExist(){
    this.user = await LoginModel.findOne({ email: this.body.email }) //Retorna um usuario ou null
    if(this.user) this.errors.push('Usuario ja existe.')
  }

  valida(){
     //Validacao
    this.cleanUp();

    //Email valido:
    if(!validator.isEmail(this.body.email)) this.errors.push('Email invalido');

    //Senha entre 6 e 30 caracteres.
    if(this.body.password.length < 3 || this.body.password.length > 30) this.errors.push('A senha precisa ter entre 3 e 30 caracteres.');
  }

  cleanUp() {
    for(const key in this.body){
      //Verifica se foram digitados apenas valores do tipo string. 
      if(typeof this.body[key] !== 'string'){
        this.body = '';
      }
    }

    //Configura exatamente sera enviado ao banco de dados. Neste caso, exclui o csrfToken
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;