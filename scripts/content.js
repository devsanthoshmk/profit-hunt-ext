chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getData') {
    // For example, retrieve some data from the page
    // document.querySelector("#lnk_completedorders").click();
    var table = document.querySelector("#div_completeorders table");
    var buy_investment = [];
    var sell_price = [];
    var dis_trade=[];
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
    const rowArray = Array.from(row.cells).map(cell => cell.textContent);
        if (rowArray[3].includes("BUY")){
            buy_investment.push(Number(rowArray[7].replace(/,/g, '')));
        }
        else{
            // console.log(Number(rowArray[4]),Number(rowArray[6]))
            sell_price.push(Number(rowArray[4])*Number(rowArray[6]))
        }
        if (!['RELIANCE INDUSTRIES', 'ADANI ENTERPRISES', 'STATE BANK OF INDIA', 'HDFC BANK', 'TECH MAHINDRA', 'TATA MOTORS'].includes(rowArray[2])) {
          dis_trade.push(rowArray[2]);
        } else {
            console.log(rowArray[2])
        }
      //console.log(`Row ${i}: ${Array.from(row.cells).map(cell => cell.textContent).join(" | ")}`);
    }
    var total_buy_investment=buy_investment.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var total_sell_price=sell_price.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var pl = Number((total_sell_price-total_buy_investment).toFixed(2));
    console.log(buy_investment,total_buy_investment);
    console.log(sell_price,total_sell_price);
    console.log(pl);

    console.log(table.rows.length);
    dis_trade=[...new Set(dis_trade)]
    console.log("dis trade",dis_trade);
    console.log(total_buy_investment);


    // Send the data back to the popup
    sendResponse({ data: {
      buyInvestment:total_buy_investment,
      sellPrice:total_sell_price,
      PL:pl,
      discrit:dis_trade,
      trades:table.rows.length
    }
   });

    return true; 
  } else {
    // Always respond even if the action doesn't match
    sendResponse({ error: "Unknown action" });
  }
  // Return true if you want to send the response asynchronously
  // (Not needed in this simple example)
});
console.warn("im working");