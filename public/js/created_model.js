$("#launchModel").on("click", function(){  

  var modelName = $("#modelName").val();
  var modelSymbol = $("#modelSymbol option:selected").text();
  var modelQuantity = $("#modelQuantity option:selected").text();
  var modelRisk = $("#modelRisk option:selected").text();
  var modelReward = $("#modelReward option:selected").text();
  var modelTime = $("#modelTime option:selected").text();
  var modelIndicator = $("#modelIndicator option:selected").text();
  var modelIndicatorSpec = $("#modelIndicatorSpec option:selected").text();
  var modelMomentum = $("#modelMomentum option:selected").text();
  // Add the values to the #modelValues container
  if(modelIndicator === 'N/A' && modelIndicatorSpec === 'N/A' && modelMomentum === 'N/A'){
    alert("Must select criteria for trading.")
  }
  else if(modelName === ""){
    alert("Must give trading model a name.")
  }
  else{
    $("#modelValues").html("<p>Model name: " + modelName + "</p>"
                         + "<p>Symbol: " + modelSymbol + "</p>"
                         + "<p>Quantity: " + modelQuantity + "</p>"
                         + "<p>Risk: " + modelRisk + "</p>"
                         + "<p>Reward: " + modelReward + "</p>"
                         + "<p>Time of Day: " + modelTime + "</p>"
                         + "<p>Technical Indicators: " + modelIndicator + "</p>"
                         + "<p>Indicator Specifications: " + modelIndicatorSpec + "</p>"
                         + "<p>Momentum: " + modelMomentum + "</p>");
  axios.post('/SendSelectedParams', {
      modelSymbol: modelSymbol, 
      modelQuantity: modelQuantity, 
      modelRisk: modelRisk, 
      modelReward: modelReward, 
      modelTime: modelTime, 
      modelIndicator: modelIndicator, 
      modelIndicatorSpec: modelIndicatorSpec, 
      modelMomentum: modelMomentum})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
    $("#myModal").modal("hide");
  }
});
  


$("#saveModel").on("click", function(){

  var modelName = $("#modelName").val();
  var modelSymbol = $("#modelSymbol option:selected").text();
  var modelQuantity = $("#modelQuantity option:selected").text();
  var modelRisk = $("#modelRisk option:selected").text();
  var modelReward = $("#modelReward option:selected").text();
  var modelTime = $("#modelTime option:selected").text();
  var modelIndicator = $("#modelIndicator option:selected").text();
  var modelIndicatorSpec = $("#modelIndicatorSpec option:selected").text();
  var modelMomentum = $("#modelMomentum option:selected").text();

  if(modelIndicator === 'N/A' && modelIndicatorSpec === 'N/A' && modelMomentum === 'N/A'){
    alert("Must select criteria for trading.")
  }
  else if(modelName === ""){
    alert("Must give trading model a name.")
  }
  else{
    axios.post('/SaveParams', {
      modelName: modelName,
      modelSymbol: modelSymbol, 
      modelQuantity: modelQuantity, 
      modelRisk: modelRisk, 
      modelReward: modelReward, 
      modelTime: modelTime, 
      modelIndicator: modelIndicator, 
      modelIndicatorSpec: modelIndicatorSpec, 
      modelMomentum: modelMomentum})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
    $("#myModal").modal("hide");
  }
});



// get references to the select elements
const indicatorSelect = document.getElementById("modelIndicator");
const indicatorSpecSelect = document.getElementById("modelIndicatorSpec");
const momentumSelect = document.getElementById("modelMomentum");

// add event listeners to the select elements
indicatorSelect.addEventListener("change", () => {
  // if "Technical Indicators" is selected, momentum trading cannot be selected
  if (indicatorSelect.value !== "N/A") {
    momentumSelect.value = "N/A";
  }
});

indicatorSpecSelect.addEventListener("change", () => {
  // if "Technical Indicators Specifications" is selected, momentum trading cannot be selected
  if (indicatorSpecSelect.value !== "N/A") {
    momentumSelect.value = "N/A";
  }
});

momentumSelect.addEventListener("change", () => {
  // if "Momentum Trading" is selected, set the other two select elements to "N/A"
  if (momentumSelect.value !== "N/A") {
    indicatorSelect.value = "N/A";
    indicatorSpecSelect.value = "N/A";
  }
});
