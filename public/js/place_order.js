
var button = document.getElementById('place')
dropdown1 = document.getElementById('TickerType')
dropdown2 = document.getElementById('OrderType')
dropdown3 = document.getElementById('Quantity')
dropdown4 = document.getElementById('RiskReward')


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

dropdown4.addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName === "A") {
    var RiskReward = target.textContent;
    axios.post('/data4', { RiskReward: RiskReward })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(RiskReward);
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
