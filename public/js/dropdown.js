
// Change the manual order buttons to the dropdown items selected
$('#TickerType a').on("click", function(){
    $('#TickerMenuButton').text($(this).text());
  });

$('#OrderType a').on("click", function(){
    $('#OrderMenuButton').text($(this).text());
  });


$('#Quantity a').on("click", function(){
  $('#QuantityButton').text($(this).text());
});
