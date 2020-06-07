

const express = require("express") //funcao que recebe express logo a variavel com nome express recebe o valor express
const server = express() //nosso servidor

//configurar pasta publica = arquivos css, js, imagem etc..
server.use(express.static("Public")) //com essa linha de codigo conseguimos pegar todos os arquivos css,jsimagem etc... para que os arquivos em html funcione
//a palavra public quer dizer que esta pegando todos os arquivos e mostrando pra todos os arquivos que necessitam um do outro





const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //
})



//get pedir algo neste caso esta pedindo a barra /
//pagina inicial
//req:pergunta = requisicao = pedido
//res: resposta
//__dirname = diretorio
server.get("/",function(req, res){
    return res.render("index.html",{ title: "Um titulo" }) //aqui seria a resposta que o servidor faz
})


//segunda rota
server.get("/create-point",function(req, res){
    return res.render("create-point.html") //aqui seria a resposta que o servidor faz
})


server.get("/search",function(req, res){
    return res.render("search-results.html") //aqui seria a resposta que o servidor faz
})
//ligar o servidor 
server.listen(3000) //aqui estamos marcado qual porta irá abrir o servidor

// server.get("/create-point",function(req, res){
//     res.sendFile(__dirname + "/views/create-point.html") //aqui seria a resposta que o servidor faz
// })