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
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now },
});

var Beer = mongoose.model('Beer', BeerSchema);
 
var query = {name: 'Budweiser'};
var mod = {alcohol: 99};
var optional = {
    upsert: false, 
    multi: true
  };

Beer.update(query, mod, function (err, data) {
  if (err){
    console.log('Erro: ', err);
  }
  else{
    console.log('Cerveja atualizada com sucesso', data);    
  }
  process.exit(0); 
});



