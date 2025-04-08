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
      const amountInvested = document.getElementById("amountInvested");
      const profitLoss = document.getElementById("profitLoss");
      const stocks = document.getElementById("stocks");
      const trades = document.getElementById("trades");

      amountInvested.innerText = response.data.buyInvestment.toLocaleString();
      profitLoss.innerHTML = `${pl} (${pl>0?"Profit":pl===0?"No Profit/No Loss":"Loss"})` ;
      stocks.innerHTML = response.data.discrit;
      trades.innerHTML = response.data.trades;

      if (response.data.buyInvestment>200000){
        amountInvested.parentElement.children[0].innerText += " ❌";
      } else{
        amountInvested.parentElement.children[0].innerText += " ✅";
      }
      if (response.data.discrit.length!==0){
        stocks.parentElement.children[0].innerText += " ❌";
      } else{
        stocks.parentElement.children[0].innerText += " ✅";
      }
      if (response.data.trades>10){
        trades.parentElement.children[0].innerText += " ❌";
      } else {
        trades.parentElement.children[0].innerText += " ✅";
      }


      // You can also update your popup UI here with the data
    });
  });
});

var passwin;
document.getElementById("getDataButton").addEventListener('click',()=>{
  passwin = document.getElementById("passwordModal");

  passwin.classList.remove("d-none");
  
})

document.addEventListener('DOMContentLoaded', function() {
  const passwordModal = document.getElementById('passwordModal');
  const passwordInput = document.getElementById('passwordInput');
  const submitButton = document.getElementById('submitPassword');
  const passwordError = document.getElementById('passwordError');
  const contentContainer = document.querySelector('.content-container');
  
  // Initially hide the content
  // contentContainer.style.display = 'none';
  
  // Correct password - change this to your desired password
  const correctPassword = "traderstechvista";
  
  submitButton.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });
  
  function checkPassword() {
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === correctPassword) {
      // Password correct - show content and hide modal
      
      passwin.classList.add("d-none")

      const stocks = document.getElementById("stocks").parentElement;
      const trades = document.getElementById("trades").parentElement;

      stocks.classList.remove("d-none");
      trades.classList.remove("d-none");
    } else {
      // Password incorrect - show error
      passwordError.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
      // Shake animation effect
      passwordInput.style.border = '2px solid var(--incorrect)';
      setTimeout(() => {
        passwordInput.style.border = '2px solid rgba(58, 134, 255, 0.3)';
      }, 1000);
    }
  }
});

