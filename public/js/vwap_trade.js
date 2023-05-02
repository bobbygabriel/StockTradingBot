require('dotenv').config()
const Alpaca = require("@alpacahq/alpaca-trade-api");

const options = {
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRET,
    paper: true,
  };


const alpaca = new Alpaca(options);

// Get data from previous 2 bars
async function vwaptrading(modelSymbol, modelQuantity, modelIndicator, modelIndicatorSpec, modelRisk, modelReward) {

  const oneMinuteMS = 60000;
  const now = new Date();
  const start = new Date(now - (18 * oneMinuteMS)).toISOString(); // for real time change to 2, for test change to 18
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

  const bar1 = bars[0]; // 1 minute behind
  const bar2 = bars[1]; // most recent

  switch(modelIndicatorSpec){
    case "Buy when the price crosses the VWAP":
      console.log("VWAP is ", bar2.VWAP)
      console.log(bar1)
      console.log(bar2)
      if ((bar1 && bar2) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.ClosePrice >= bar2.VWAP)){
        const price = await alpaca.getLatestQuote(modelSymbol);
        handleTrade(modelSymbol, modelQuantity, price.AskPrice, modelRisk, modelReward);
      }
      else{
        console.log("Criteria not satsified")
      }
      break;
    case "Buy when the price is 5% below the VWAP":
      console.log("VWAP is ", bar2.VWAP)
      console.log(bar1)
      console.log(bar2)
      adjustedVWAP = bar2.VWAP * 0.95;
      if ((bar1 && bar2) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.ClosePrice >= adjustedVWAP)){
        const price = await alpaca.getLatestQuote(modelSymbol);
        handleTrade(modelSymbol, modelQuantity, price.AskPrice, modelRisk, modelReward);
      }
      else{
        console.log("Criteria not satsified")
      }
      break;
    case "Buy when the price is 5% above the VWAP":
      console.log("VWAP is ", bar2.VWAP)
      console.log(bar1)
      console.log(bar2)
      adjustedVWAP = bar2.VWAP * 1.05;
      if ((bar1 && bar2) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.ClosePrice >= adjustedVWAP)){
        const price = await alpaca.getLatestQuote(modelSymbol);
        handleTrade(modelSymbol, modelQuantity, price.AskPrice, modelRisk, modelReward);
      }
      else{
        console.log("Criteria not satsified")
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

module.exports = {vwaptrading};