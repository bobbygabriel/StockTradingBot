require('dotenv').config()
const Alpaca = require("@alpacahq/alpaca-trade-api");

const options = {
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRET,
    paper: true,
  };


const alpaca = new Alpaca(options);

// Get data from previous 2 bars, need to look up documentation of getting previous bars

async function buyIfTwoBarsIncreasing(symbol, qty) {

  const oneMinuteMS = 60000;
  const now = new Date();
  const start = new Date(now - (18 * oneMinuteMS)).toISOString();
  const end = new Date(now - (16 * oneMinuteMS)).toISOString();
  const barsIterator = await alpaca.getBarsV2(symbol, {
    start: start,
    end: end,
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.MIN),

  });

  const bars = [];
  for await (let b of barsIterator) {
    bars.push(b);
  }

  const bar1 = bars[0];
  const bar2 = bars[1];
  console.log("This is bar 1", bar1)
  console.log("This is bar 2", bar2)

  // check if the previous two bars have increasing prices, if so, we will buy at market price
  if ((bar1 && bar2) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.OpenPrice < bar2.ClosePrice)){
    const order = await alpaca.createOrder({
      symbol: symbol,
      qty: qty,
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });
    console.log(`Bought ${symbol}`);
  }
  else{
    console.log("Criteria not satisfied")
  }

}

// need to decide what you will handle client side vs server side
// after you enter a trade, you need to stop taking in bars and focus on selling at end of the bar
module.exports = {buyIfTwoBarsIncreasing};