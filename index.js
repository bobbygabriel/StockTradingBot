const express = require('express');
const path = require('path');
const request = require('request');
require('dotenv').config()
const Alpaca = require("@alpacahq/alpaca-trade-api");
const { momentumTrading } = require('./public/js/momentum_trade.js');
const { vwaptrading } = require('./public/js/vwap_trade.js');
const { initializeApp } = require('firebase/app');
const { getDatabase, push, ref, set } = require('firebase/database')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv7YesHh5bwUjEzOf-s8QCpIt2PhAdO0I",
  authDomain: "trademind-42b3d.firebaseapp.com",
  projectId: "trademind-42b3d",
  storageBucket: "trademind-42b3d.appspot.com",
  messagingSenderId: "574010239698",
  appId: "1:574010239698:web:b0356fcb8bb3e56ccddb0b",
  measurementId: "G-9YNYEVE9CR",
  databaseURL: "https://trademind-42b3d-default-rtdb.firebaseio.com/"
};

 // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp)



var bodyParser = require('body-parser');
var symbol = "";
var order = "";
var quantity = 0;
var risk_reward = "";
var modelSymbol = "";
var modelQuantity = "";
var modelRisk = "";
var modelReward = "";
var modelTime = "";
var modelIndicator = "";
var modelIndicatorSpec = "";
var modelMomentum = "";

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
  console.log(`Symbol: ${symbol} Quantity: ${quantity}`)
  response.write(symbol)
  response.write(order)
  response.write(quantity)

  order = order.toLowerCase()
  
  const price = await alpaca.getLatestQuote(symbol)
  console.log("An order has been sent to Alpaca with: ", price)
  
  alpaca.createOrder({
    symbol: symbol,
    qty: quantity,
    side: order,
    type: "market",
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

app.post('/data8', async (request, response) => {
  try {
    const result = await momentumTrading(modelSymbol, modelQuantity, modelMomentum, modelRisk, modelReward);
    response.json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }

})

app.get('/data9', async (request, response) => {
  const alpaca = new Alpaca(options);
  var portfolioHistory1 = await alpaca.getPortfolioHistory({
    period: '1M',
    timeframe: '1D'
  });
  response.send(portfolioHistory1);
})

app.get('/data12', async (request, response) => {
  const alpaca = new Alpaca(options);
  var portfolioHistory2 = await alpaca.getPortfolioHistory({
    period: '1D',
    timeframe: '1H'
  });
  response.send(portfolioHistory2);
})

app.get('/data13', async (request, response) => {
  const alpaca = new Alpaca(options);
  var portfolioHistory3 = await alpaca.getPortfolioHistory({
    period: '1A',
    timeframe: '1D'
  });
  response.send(portfolioHistory3);
})

app.post('/data10', async (request, response) => {
  modelSymbol = request.body.modelSymbol;
  modelQuantity = request.body.modelQuantity;
  modelRisk = request.body.modelRisk;
  modelReward = request.body.modelReward;
  modelTime = request.body.modelTime;
  modelIndicator = request.body.modelIndicator;
  modelIndicatorSpec = request.body.modelIndicatorSpec;
  modelMomentum = request.body.modelMomentum;
  console.log(modelSymbol, modelQuantity, modelRisk, modelReward, modelTime, modelIndicator, modelIndicatorSpec, modelMomentum)
})

app.post('/data11', async (request, response) => {
  modelName = request.body.modelName;
  modelSymbol = request.body.modelSymbol;
  modelQuantity = request.body.modelQuantity;
  modelRisk = request.body.modelRisk;
  modelReward = request.body.modelReward;
  modelTime = request.body.modelTime;
  modelIndicator = request.body.modelIndicator;
  modelIndicatorSpec = request.body.modelIndicatorSpec;
  modelMomentum = request.body.modelMomentum;
  
  const modelRef = push(ref(database, 'models'));
  set(modelRef, {
    name: modelName,
    symbol: modelSymbol,
    quantity: modelQuantity,
    risk: modelRisk,
    reward: modelReward,
    time: modelTime,
    indicator: modelIndicator,
    indicatorSpec: modelIndicatorSpec,
    momentum: modelMomentum
  });
})


app.post('/data14', async (request, response) => {
  try {
    const result = await vwaptrading(modelSymbol, modelQuantity, modelIndicator, modelIndicatorSpec, modelRisk, modelReward);
    response.json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
})


app.get('/data15', async (request, response) => {
  const data = {
    indicator: modelIndicator,
    indicatorSpec: modelIndicatorSpec,
    momentum: modelMomentum
  }
  response.send(data);
})


app.post('/tradingstopped', async (request, response) => {
  console.log("Trading has been stopped");
  response.end();
})

// Start the server
app.listen(port, function() {
    console.log(`app listening on http://localhost:${port}`);
  })