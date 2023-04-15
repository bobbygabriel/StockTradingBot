//Default View
const ctx = document.getElementById('profitChart');
var myChart;


axios.get('/data9')
  .then(portfolioHistory1 => {
    // Process the portfolio history data
    var oldTime = portfolioHistory1.data.timestamp
    const dateTimes = oldTime.map(oldTime => new Date(oldTime * 1000).toLocaleDateString([], {year: '2-digit', month: 'numeric', day: 'numeric'}));
    const equityData = portfolioHistory1.data.equity
    myChart = new Chart(ctx, {
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
              text: '1 Month 1 Day'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    return '$' + value;
                }
            },
            title: {
              display: true,
              text: 'Account Value'
            }
          }
        }
      }
    })
  })
  .catch(error => {
    console.error('Error fetching portfolio history:', error);
});


var toggleButton1 = document.getElementById('profitChartView1');
  toggleButton1.addEventListener('click', function() {
  myChart.destroy()
    // Update the chart data and options based on the user's selection
  axios.get('/data9')
    .then(portfolioHistory1 => {
    // Process the portfolio history data
    var oldTime = portfolioHistory1.data.timestamp
    const dateTimes = oldTime.map(oldTime => new Date(oldTime * 1000).toLocaleDateString([], {year: '2-digit', month: 'numeric', day: 'numeric'}));
    const equityData = portfolioHistory1.data.equity
    const ctx = document.getElementById('profitChart');
    myChart = new Chart(ctx, {
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
            text: '1 Month 1 Day'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
              return '$' + value;
              }
            },
            title: {
              display: true,
              text: 'Account Value'
            }
          }
        }
      }
    })
  })
  .catch(error => {
    console.error('Error fetching portfolio history:', error);
  });
});

var toggleButton2 = document.getElementById('profitChartView2');
toggleButton2.addEventListener('click', function() {
  // Update the chart data and options based on the user's selection
  myChart.destroy()
  axios.get('/data12')
    .then(portfolioHistory2 => {
    // Process the portfolio history data
    var oldTime = portfolioHistory2.data.timestamp
    console.log(portfolioHistory2.data)
    const dateTimes = oldTime.map(oldTime => new Date(oldTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    const equityData = portfolioHistory2.data.equity
    console.log(dateTimes);
    const ctx = document.getElementById('profitChart');
    myChart = new Chart(ctx, {
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
            text: '1 Day 1 Hour'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
              return '$' + value;
              }
            },
            title: {
              display: true,
              text: 'Account Value'
            }
          }
        }
      }
    })
  })
  .catch(error => {
    console.error('Error fetching portfolio history:', error);
  });
});

var toggleButton2 = document.getElementById('profitChartView3');
toggleButton2.addEventListener('click', function() {
  // Update the chart data and options based on the user's selection
  myChart.destroy()
  axios.get('/data13')
    .then(portfolioHistory3 => {
    // Process the portfolio history data
    var oldTime = portfolioHistory3.data.timestamp
    console.log(portfolioHistory3.data)
    const dateTimes = oldTime.map(oldTime => new Date(oldTime * 1000).toLocaleDateString([], {year: '2-digit', month: 'numeric', day: 'numeric'}));
    const equityData = portfolioHistory3.data.equity
    console.log(dateTimes);
    const ctx = document.getElementById('profitChart');
    myChart = new Chart(ctx, {
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
            text: '1 Year 1 Day'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
              return '$' + value;
              }
            },
            title: {
              display: true,
              text: 'Account Value'
            }
          }
        }
      }
    })
  })
  .catch(error => {
    console.error('Error fetching portfolio history:', error);
  });
});