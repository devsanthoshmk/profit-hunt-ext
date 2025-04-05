document.addEventListener('DOMContentLoaded', function() {
  // Query the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Send a message to the content script in the active tab
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getData' }, function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError.message);
        return;
      }
      // Use the data received from the content script
      console.log('Data received:', response.data);
      
      var pl = response.data.PL;
      document.getElementById("amountInvested").innerText = response.data.buyInvestment
      document.getElementById("profitLoss").innerHTML = `${pl} (${pl>0?"Profit":pl===0?"No Profit/No Loss":"Loss"})` ;
      document.getElementById("stocks").innerHTML = response.data.discrit;
      document.getElementById("trades").innerHTML = response.data.trades;

      // You can also update your popup UI here with the data
    });
  });
});
