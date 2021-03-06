var http = require("http");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop-cuiaba');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.once('open', function () {
  console.log('Conexão aberta.')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);


http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});

  var url = req.url;
  var msg = '';
  
  switch(url){
    case '/create':

      var dados = {
        name: 'Budweiser',
        description: 'Até que vai',
        alcohol: 5.0,
        price: 3.5,
        category: 'lager'
      }
      var model = new Beer(dados);
      model.save(function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cerveja Inserida: ', data);  
          msg = 'Cerveja inserida: ' + data;
        }
        res.end(msg);
      });  
    break;
    case '/retrieve': 
      Beer.find({}, function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }else{
          console.log('Listagem: ', data);
          msg = 'CervejaS LISTADAS: ' + data;
        }
        res.end(msg);
      });
    break;
    case '/update': 
      var query = {name: 'Budweiser'};
      var mod = {alcohol: 99};
      Beer.update(query, mod, function (err, data) {
        if (err){
          console.log('Erro: ', err);          
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cerveja atualizada com sucesso, quantidade: ', data);  
          msg = 'Cerveja atualizada com sucesso, quantidade: ' + data;  
        }
        res.end(msg);
      });
    break;
      case '/delete':
        var query = {name: 'Budweiser'};
        Beer.remove(query, function(err, data) {
          if(err) {
            console.log(err);        
            msg = 'Erro: ' + err;
          } else {
            console.log('Cerveja deletada com sucesso, quantidade: ', data);
          msg = 'Cerveja deletada com sucesso, quantidade: ' + data;
          }
        res.end(msg);
        });
    break;
    default: 
      res.end('ROTA NAO ENCONTRADA');
  }


}).listen(3000);
console.log('Server running at http://localhost:3000/');











