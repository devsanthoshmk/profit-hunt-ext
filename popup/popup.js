document.getElementById('getDataButton').addEventListener('click', function() {
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
      // You can also update your popup UI here with the data
    });
  });
});
