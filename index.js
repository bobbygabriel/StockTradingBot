const express = require('express');
const path = require('path');
const request = require('request');
const Alpaca = require("@alpacahq/alpaca-trade-api");
var bodyParser = require('body-parser')

const port = 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// 'Home' Route
app.get('/', function(req, res){
  res.render('index');
})

app.post('/data', (request, response) => {
  const formData = request.body;
  console.log(formData);
  response.status(200).render('index');
});

app.post('/data1', (request, response) => {
  var symbol = request.body.TickerSymbol;
  var order = request.body.OrderType
  console.log(symbol);
  console.log(order);

  /*
  const alpaca = new Alpaca();
  alpaca.createOrder({
    symbol: symbol,
    qty: 1,
    side: "buy",
    type: order,
    time_in_force: "day",
  });
  */

});

// Start the server
app.listen(port, function() {
    console.log(`app listening on http://localhost:${port}`);
  })


/*
  const options = {
    keyId: "PKVQDMIOIX8C99X0KCI5",
    secretKey: "IK8N5HWG7KBCvF6L9yPJUvJVpaFwQJttPY9vL0AG",
    paper: true,
  };
  const alpaca = new Alpaca(options);
  alpaca.getAccount().then((account) => {
    console.log("Current Account:", account);
  });
  */