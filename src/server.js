

const express = require("express") //funcao que recebe express logo a variavel com nome express recebe o valor express
const server = express() //nosso servidor

//configurar pasta publica = arquivos css, js, imagem etc..
server.use(express.static("Public")) //com essa linha de codigo conseguimos pegar todos os arquivos css,jsimagem etc... para que os arquivos em html funcione
//a palavra public quer dizer que esta pegando todos os arquivos e mostrando pra todos os arquivos que necessitam um do outro


//get pedir algo neste caso esta pedindo a barra /
//pagina inicial
//req:pergunta = requisicao = pedido
//res: resposta
//__dirname = diretorio
server.get("/",function(req, res){
    res.sendFile(__dirname + "/views/index.html") //aqui seria a resposta que o servidor faz
})

//ligar o servidor 
server.listen(3000) //aqui estamos marcado qual porta irá abrir o servidor