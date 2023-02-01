
var button = document.getElementById('place')
dropdown1 = document.getElementById('TickerType')
dropdown2 = document.getElementById('OrderType')

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
    axios.post('/data1', { OrderType: OrderType })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(OrderType);
  }
});


/*
var dropdown1 = document.getElementById("TickerType")
text = dropdown1.options[dropdown1.selectedIndex].text;
console.log(text)

button.addEventListener("click", function() {
  
  axios.post('/data1', { dropdown1, dropdown2 })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
});
*/