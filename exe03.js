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
  }
  else{
    console.log('Cerveja Inserida: ', data);  
  }
});


