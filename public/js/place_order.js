
button = document.getElementById('place')
dropdown1 = document.getElementById('TickerType')
dropdown2 = document.getElementById('OrderType')
dropdown3 = document.getElementById('Quantity')
button1 = document.getElementById('StartAlgorithm')
button2 = document.getElementById('StopAlgorithm')
var modelIndicator;
var modelMomentum;
var modelIndicatorSpec;

let intervalId;


// Dropdown events handle sending the selected value to the server for processing

dropdown1.addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName === "A") {
    var TickerSymbol = target.textContent;
    axios.post('/TickerData', { TickerSymbol: TickerSymbol })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(TickerSymbol);
  }
});


dropdown2.addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName === "A") {
    var OrderType = target.textContent;
    axios.post('/OrderTypeData', { OrderType: OrderType })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(OrderType);
  }
});

dropdown3.addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName === "A") {
    var Quantity = target.textContent;
    axios.post('/QuantityData', { Quantity: Quantity })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(Quantity);
  }
});

button.addEventListener("click", function() {
  
  axios.post('/OrderSubmission')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    alert('Your order has been submitted!')
});

// Trading starts, calls the trading function every minute for updated data, wont stop until a button is pressed
button1.addEventListener("click", function() {
  axios.get('/BeginTrading')
    .then(response => {
      modelIndicator = response.data.indicator;
      modelIndicatorSpec = response.data.indicatorSpec;
      modelMomentum = response.data.momentum;

      if(!modelIndicator && !modelIndicatorSpec && modelMomentum){
        axios.post('/MomentumTrading')
          .then(function (response) {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        alert('Trading Started')

        // run the backend code every minute
        intervalId = setInterval(function() {
          axios.post('/MomentumTrading')
            .then(function (response) {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }, 60000); // 60000 milliseconds = 1 minute
      }
      else if(modelIndicator && modelIndicatorSpec && !modelMomentum){
        axios.post('/VWAPTrading')
          .then(function (response) {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        alert('Trading Started')

        // run the backend code every minute
        intervalId = setInterval(function() {
          axios.post('/VWAPTrading')
            .then(function (response) {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }, 60000); // 60000 milliseconds = 1 minute
      }
      else{
        console.log("Invalid Input")
      }
    })
    .catch(error => {
      console.error(error);
    });
});



// Trading Stopped button will kill the api call loop for getting bar data
button2.addEventListener("click", function() {
  clearInterval(intervalId);
  alert('Trading Stopped');
  axios.post('/tradingstopped', { OrderType: OrderType })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
