const dataContainer = document.getElementById('openPositions');

// Displays all current positions the user is in. Updates every 5 seconds.
function updatePositionData() {
  axios.get('/CurrentPositions')
  .then(response => {
    const dataArray = response.data;
    let listItems = '';
    dataArray.forEach(item => {
      listItems += `<li>$${item.symbol},   Qty: ${item.qty},   Side: ${item.side},   Average Price: ${item.avg_entry_price}</li>`;
    });
    dataContainer.innerHTML = listItems;
  })
  .catch(error => {
    console.error(error);
  });
}

setInterval(updatePositionData, 5000);
