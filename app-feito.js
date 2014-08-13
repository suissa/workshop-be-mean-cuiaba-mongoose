var http = require("http");
var _beer = require("./controllers/beers");

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain;charset=utf8"});

  var url = req.url;
  // res.write('Hello World');
  console.log('URL: ', url);

  switch(url){
    case '/create': 
      _beer.create(req, res);
    break;
    case '/retrieve': 
      _beer.retrieve(req, res);
    break;
    case '/update': 
      _beer.update(req, res);
    break;
    case '/delete': 
      _beer.delete(req, res);
    break;
    default:
      res.end('Rota não encontrada!');
  }

}).listen(3000);
console.log('Server running at http://localhost:3000/');


