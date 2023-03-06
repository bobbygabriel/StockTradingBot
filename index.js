const express = require('express');
const path = require('path');
const request = require('request');
require('dotenv').config()
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

const options = {
  keyId: process.env.APIKEY,
  secretKey: process.env.SECRET,
  paper: true,
};
const alpaca = new Alpaca(options);

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

app.post('/data5', async (request, response) => {
  response.write(symbol)
  response.write(order)
  response.write(quantity)

  order = order.toLowerCase()
  
  const price = await alpaca.getLatestQuote(symbol)
  console.log(price)
  const bars = await alpaca.getLatestBar(symbol)
  console.log(bars)
  //console.log(bars)
  
  alpaca.createOrder({
    symbol: symbol,
    qty: quantity,
    side: "buy",
    type: order,
    time_in_force: "day",
  });
  
  response.end();
})

app.get('/data6', async (request, response) => {
  const alpaca = new Alpaca(options);
  var positions = await alpaca.getPositions();
  response.send(positions)

})

app.get('/data7', async (request, response) => {
  const alpaca = new Alpaca(options);
  var account = await alpaca.getAccount();
  response.send(account)

})


// Start the server
app.listen(port, function() {
    console.log(`app listening on http://localhost:${port}`);
  })


  