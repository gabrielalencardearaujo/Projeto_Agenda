exports.paginaTeste = (req, res) => { 
  console.log(req.params) 
  console.log(req.query)
  res.send(`
    ${req.params.idUsuarios}<br>
    ${req.params.outroParametro}<br>
    ${req.query} <br>
    ${req.query.nome} <br>
    <strong>Ainda consigo acessar a rota /testes</strong>
  `)
}