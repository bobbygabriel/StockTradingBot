require('dotenv').config()
const Alpaca = require("@alpacahq/alpaca-trade-api");
const { async } = require('@firebase/util');

const options = {
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRET,
    paper: true,
  };


const alpaca = new Alpaca(options);

// Get data from previous 2 bars
async function momentumTrading(modelSymbol, modelQuantity, modelMomentum, modelRisk, modelReward) {

  const oneMinuteMS = 60000;
  const now = new Date();
  const start = new Date(now - (20 * oneMinuteMS)).toISOString(); // for real time change to 2, for test change to 18
  const end = new Date(now - (16 * oneMinuteMS)).toISOString(); // for real time delete 0, for test change to 16
  const barsIterator = await alpaca.getBarsV2(modelSymbol, {
    start: start,
    end: end,
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.MIN),

  });

  const bars = [];
  for await (let b of barsIterator) {
    bars.push(b);
  }

  const bar1 = bars[0]; // 3 minutes behind
  const bar2 = bars[1]; // 2 minutes behind
  const bar3 = bars[2]; // 1 minute behind
  const bar4 = bars[3]; // most recent

  switch(modelMomentum){
  // check if the previous two bars have increasing prices, if so, we will buy at market price
    case "Buy when there are 2 uptrending bars":
      console.log("bar 1", bar1)
      console.log("bar 2", bar2)
      if ((bar1 && bar2) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.OpenPrice < bar2.ClosePrice)){
        const price = await alpaca.getLatestQuote(modelSymbol)
        handleTrade(modelSymbol, modelQuantity, price.AskPrice, modelRisk, modelReward) 
      }
      else{
        console.log("Criteria not satisfied")
      }
      break;
    case "Buy when there are 3 uptrending bars":
      console.log("bar 1", bar1)
      console.log("bar 2", bar2)
      console.log("bar 3", bar3)
      if ((bar1 && bar2 && bar3) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.OpenPrice < bar2.ClosePrice) && (bar3.OpenPrice < bar3.ClosePrice)){
        const price = await alpaca.getLatestQuote(modelSymbol)
        handleTrade(modelSymbol, modelQuantity, price.AskPrice, modelRisk, modelReward)
      }
      else{
        console.log("Criteria not satisfied")
      }
      break;
    case "Buy when there are 4 uptrending bars":
      console.log("bar 1", bar1)
      console.log("bar 2", bar2)
      console.log("bar 3", bar3)
      console.log("bar 4", bar4)
      if ((bar1 && bar2 && bar3 && bar4) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.OpenPrice < bar2.ClosePrice) && (bar3.OpenPrice < bar3.ClosePrice) && (bar4.OpenPrice < bar4.ClosePrice)){
        const price = await alpaca.getLatestQuote(modelSymbol)
        handleTrade(modelSymbol, modelQuantity, price.AskPrice, modelRisk, modelReward)
      }
      else{
        console.log("Criteria not satisfied")
      }
      break;
  }
}

function handleTrade(symbol, quantity, entryPrice, risk, reward){
  
  risk = risk.replace(/%/g, '')
  reward = reward.replace(/%/g, '')

  const riskPrice = parseFloat((entryPrice * (1 - (risk/100))).toFixed(2))
  const rewardPrice = parseFloat((entryPrice * (1 + (reward/100))).toFixed(2))

  console.log(`Bought ${quantity} shares of ${symbol} at ${entryPrice}`);

  alpaca.createOrder({
    symbol: symbol,
    qty: quantity,
    side: "buy",
    type: "limit",
    time_in_force: "gtc",
    limit_price: entryPrice,
    order_class: "bracket",
    stop_loss: {
      stop_price: riskPrice,
    },
    take_profit: {
      limit_price: rewardPrice,
    },
  });

  console.log(`An order has been sent with your set risk of ${risk}% and your reward of ${reward}%`)
}

// need to decide what you will handle client side vs server side
// after you enter a trade, you need to stop taking in bars and focus on selling at end of the bar
module.exports = {momentumTrading};