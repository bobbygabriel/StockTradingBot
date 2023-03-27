
button = document.getElementById('place')
dropdown1 = document.getElementById('TickerType')
dropdown2 = document.getElementById('OrderType')
dropdown3 = document.getElementById('Quantity')
button1 = document.getElementById('StartAlgorithm')
button2 = document.getElementById('StopAlgorithm')

let intervalId;




dropdown1.addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName === "A") {
    var TickerSymbol = target.textContent;
    axios.post('/data1', { TickerSymbol: TickerSymbol })
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
    axios.post('/data2', { OrderType: OrderType })
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
    axios.post('/data3', { Quantity: Quantity })
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
  
  axios.post('/data5')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    alert('Your order has been submitted!')
    window.location.reload()
});


button1.addEventListener("click", function() {
  
  axios.post('/data8')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    alert('Trading Started')

    // run the backend code every minute
  intervalId = setInterval(function() {
    axios.post('/data8')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, 60000); // 60000 milliseconds = 1 minute
});



button2.addEventListener("click", function() {
  clearInterval(intervalId);
  alert('Trading Stopped');
});
