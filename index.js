const express = require('express');
const path = require('path');
const request = require('request');
const Alpaca = require("@alpacahq/alpaca-trade-api");
var bodyParser = require('body-parser');
var symbol = "";
var order = "";
var quantity = 0;
var risk_reward = "";

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

app.post('/data1', (request, response) => {
  symbol = request.body.TickerSymbol;
  response.send(symbol)
});

app.post('/data2', (request, response) => {
  order = request.body.OrderType;
  response.send(order)
});

app.post('/data3', (request, response) => {
  quantity = request.body.Quantity;
  response.send(quantity)
});

app.post('/data4', (request, response) => {
  risk_reward = request.body.RiskReward;
  response.send(risk_reward)
});

app.post('/data5', (request, response) => {
  response.write(symbol)
  response.write(order)
  response.write(quantity)

  order = order.toLowerCase()
  
  const options = {
    keyId: "PKVQDMIOIX8C99X0KCI5",
    secretKey: "IK8N5HWG7KBCvF6L9yPJUvJVpaFwQJttPY9vL0AG",
    paper: true,
  };
  const alpaca = new Alpaca(options);
  alpaca.createOrder({
    symbol: symbol,
    qty: quantity,
    side: "buy",
    type: order,
    time_in_force: "day",
  });
  response.end();
})


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



  /*
    const options = {
    keyId: "PKVQDMIOIX8C99X0KCI5",
    secretKey: "IK8N5HWG7KBCvF6L9yPJUvJVpaFwQJttPY9vL0AG",
    paper: true,
  };
  const alpaca = new Alpaca();
  alpaca.createOrder({
    symbol: symbol,
    qty: 1,
    side: "buy",
    type: order,
    time_in_force: "day",
  });
  */