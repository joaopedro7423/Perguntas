const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// conecção com o banco de dados , para funcionar descomente no arquivo /database/database.js
const connection = require("./database/database.js");
const Pergunta = require("./database/Pergunta.js");
const Resposta = require("./database/Resposta.js");


connection
   .authenticate()
    .then(()=>{
     console.log("Conection sucsses");
    })
    .catch((msgErro)=>{
       console.log(msgErro);
    })


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 


app.get("/",(req,res)=>{
  //select * from pergunta busca todos os dados no banco
    Pergunta.findAll({raw: true, order:[
      ['id','DESC']// ASC = crescente DESC = decrecente
   ]}).then(pergunta=>{
        res.render("index",{
           pergunta: pergunta

        });
      //console.log(pergunta);
    
   });
//quando estiver conectado apagar esse render
  // res.render("index");
});


app.get("/perguntar",(req,res)=>{res.render("perguntar");});
 
app.post("/salvarpergunta",(req,res)=>{
      var titulo = req.body.titulo;
      var desc = req.body.desc;
   //  res.send("Formulario Recebido! titulo: " + titulo +" "+"descrição : "+ desc);
//responsavel para salvar no banco
  Pergunta.create({
    // nome da tabela e depois o nome da variavel
      titulo: titulo,
      desc: desc
   }).then(()=>{
      //caso salve no banco, vc é redirecionado a outra página
      res.redirect("/");
   });
   
});


app.get("/pergunta/:id",(req,res)=>{
   var id = req.params.id;
   Pergunta.findOne({
      where: {id: id}
   }).then(pergunta =>{
      if(pergunta!=undefined){ // pergunta encontrada
         Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [['id','DESC']]
         }).then(respostas =>{
            res.render("pergunta",{
               pergunta: pergunta,
               respostas: respostas
               
            });
         })

      }else{ //nao encontrada
         res.redirect("/");
      }
   });
});

app.post("/responder",(req,res)=>{
      var corpo = req.body.corpo;
      var perguntaId = req.body.pergunta;
      Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId    

      }).then(()=>{
         res.redirect("/pergunta/"+perguntaId); 
      });

});


app.listen(8080,()=>{console.log("App rodando");});