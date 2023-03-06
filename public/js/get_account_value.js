const accountDataContainer = document.getElementById('AccountValue');

function updateAccountData() {
    axios.get('/data7')
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
