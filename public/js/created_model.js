$("#saveModel").click(function(){
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
    $("#modelValues").html("<p>Model name: " + modelName + "</p>"
                           + "<p>Symbol: " + modelSymbol + "</p>"
                           + "<p>Quantity: " + modelQuantity + "</p>"
                           + "<p>Risk: " + modelRisk + "</p>"
                           + "<p>Reward: " + modelReward + "</p>"
                           + "<p>Time of Day: " + modelTime + "</p>"
                           + "<p>Technical Indicators: " + modelIndicator + "</p>"
                           + "<p>Indicator Specifications: " + modelIndicatorSpec + "</p>"
                           + "<p>Momentum: " + modelMomentum + "</p>");
    axios.post('/data10', {
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
  });
  