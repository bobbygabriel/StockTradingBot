require('dotenv').config()
const Alpaca = require("@alpacahq/alpaca-trade-api");

const options = {
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRET,
    paper: true,
  };


const alpaca = new Alpaca(options);

// Get data from previous 2 bars

async function buyIfTwoBarsIncreasing(modelSymbol, modelQuantity) {

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

  const bar1 = bars[0];
  const bar2 = bars[1];
  console.log("This is bar 1", bar1)
  console.log("This is bar 2", bar2)

  // check if the previous two bars have increasing prices, if so, we will buy at market price
  if ((bar1 && bar2) && (bar1.OpenPrice < bar1.ClosePrice) && (bar2.OpenPrice < bar2.ClosePrice)){
    const order = await alpaca.createOrder({
      symbol: modelSymbol,
      qty: modelQuantity,
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });
    console.log(`Bought ${modelSymbol}`);
  }
  else{
    console.log("Criteria not satisfied")
  }

}

// need to decide what you will handle client side vs server side
// after you enter a trade, you need to stop taking in bars and focus on selling at end of the bar
module.exports = {buyIfTwoBarsIncreasing};