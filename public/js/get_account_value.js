const accountDataContainer = document.getElementById('AccountValue');

// Displays the account balance to the user on hover over the button. Refreshes every 2 seconds.
function updateAccountData() {
    axios.get('/AccountBalance')
    .then(response => {
      const dataArray = response.data;
      $('#AccountValue').popover({
        placement: 'bottom',
        trigger: 'hover',
        content: `Buying Power: $${dataArray.daytrading_buying_power} <br> Equity: $${dataArray.portfolio_value}`,
        html: true
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

setInterval(updateAccountData, 2000);
