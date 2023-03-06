const dataContainer = document.getElementById('openPositions');

function updatePositionData() {
  axios.get('/data6')
  .then(response => {
    const dataArray = response.data;
    let listItems = '';
    dataArray.forEach(item => {
      listItems += `<li>$${item.symbol},   Qty: ${item.qty},   Side: ${item.side},   Entry Price: ${item.avg_entry_price}</li>`;
    });
    dataContainer.innerHTML = listItems;
  })
  .catch(error => {
    console.error(error);
  });
}

setInterval(updatePositionData, 5000);
