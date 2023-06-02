$('#TickerType a').on("click", function(){
    $('#TickerMenuButton').text($(this).text());
  });

$('#OrderType a').on("click", function(){
    $('#OrderMenuButton').text($(this).text());
  });

$('#RiskReward a').on("click", function(){
  $('#RiskRewardButton').text($(this).text());
});

$('#Quantity a').on("click", function(){
  $('#QuantityButton').text($(this).text());
});
