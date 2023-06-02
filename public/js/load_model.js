var models;

$("#initialModal2press").click(function(){
  axios.get('/DatabaseModels').then((response) => {
    
    models = response.data;
    const modelSymbolSelect = document.getElementById('loadModelNames');
    modelSymbolSelect.innerHTML = ""; // Clear out all the existing options
    models.forEach((model) => {
      const option = document.createElement('option');
      option.text = model.name;
      modelSymbolSelect.appendChild(option);
    });
  }).catch((error) => {
    console.error(error);
  });
})



$("#loadModel").click(function(){    
        
    var modelChosen = $("#loadModelNames option:selected").text();

    // Function to search for object by name
    function searchByName(name) {
        for (let i = 0; i < models.length; i++) {
            if (models[i].name === name) {
                return models[i];
        }
    }
    return null;
  }
  
  const fillModel = searchByName(modelChosen);
  console.log(fillModel)

  
  var modelName = fillModel.name
  var modelSymbol = fillModel.symbol
  var modelQuantity = fillModel.quantity
  var modelRisk = fillModel.risk
  var modelReward = fillModel.reward
  var modelTime = fillModel.time
  var modelIndicator = fillModel.indicator
  var modelIndicatorSpec = fillModel.indicatorSpec
  var modelMomentum = fillModel.momentum

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
    
    $("#myModal2").modal("hide");
});

  