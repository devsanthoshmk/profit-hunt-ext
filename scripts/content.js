chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getData') {
    // For example, retrieve some data from the page
    document.querySelector("#lnk_completedorders").click();
    let tb = document.evaluate('//div[@id="div_completeorders"]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.outerHTML;
    // Send the data back to the popup
    sendResponse({ data: tb });

    return true; 
  } else {
    // Always respond even if the action doesn't match
    sendResponse({ error: "Unknown action" });
  }
  // Return true if you want to send the response asynchronously
  // (Not needed in this simple example)
});
console.warn("im working");