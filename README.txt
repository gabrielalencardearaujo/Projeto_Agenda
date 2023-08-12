Pequeno manual de como foi montado este projeto.

#As paginas HTML(.ejs) usando as tags ejs (modularizando as tags HTML). Separe tag head, footer, navbar, tables etc. Mesmo raciocionio da modularizacao do codigo em javasccript.
    Use por exemplo: <%- include('includes/head.ejs') %> Para importar seu arquivo head.ejs que contenha apenas a tag <head> do html.

#Tela de login contendo um formulario para criar ou 

#Formulario login/register:
  -> Layout Padrao Bootstrap.
  -> atributo action com a rota que o formulario sera enviado.
  -> method = post.
  -> Nao esquecer o csrfToken nos formularios.

#Validando os formularios:
  -> Como o mongoDB nao esta nem ai em como as informacoes serao enviadas pro banco de dados, cabe a nos configura-las para irem no formato correto.
  -> Deve configurar o Schema para receber as chaves corretas, neste caso email e senha, e se sao requiridas ou nao.

        const LoginSchema = new mongoose.Schema({
          email: {type: String, required: true},
          password: {type: String, required: true}
        });

  -> 

#ASYNC/AWAIT:
  -> Tome cuidado com async await. Criar/ler dados no Banco de Dados requerem o uso de async/await.
  -> Se uma funcao estiver sendo usada com async, tudo oq ela retornar sera uma promisse, portanto a chamada desta funcao deve conter um await.

#BCRYPTJS:
  -> Necessario para fazer um hash das senhas do usuario. Paras que nao seja salva a senha direto no banco de dados.

