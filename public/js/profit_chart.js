axios.get('/data9')
  .then(portfolioHistory => {
    // Process the portfolio history data
    var oldTime = portfolioHistory.data.timestamp
    const dateTimes = oldTime.map(oldTime => new Date(oldTime * 1000).toLocaleDateString());
    const equityData = portfolioHistory.data.equity

    console.log(dateTimes);
    const ctx = document.getElementById('profitChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateTimes,
        datasets: [{
          label: 'Equity',
          data: equityData,
          borderColor: 'green',
          fill: true
        }]
      },
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Profit Chart 1 Month 1 Day'
          }
        },
        scales: {
          y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    return '$' + value;
                }
            }
          }
        }
      }
    })
  })
  .catch(error => {
    console.error('Error fetching portfolio history:', error);
  });
