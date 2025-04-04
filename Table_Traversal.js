var table = document.querySelector("#div_completeorders table");
var totBuyPrice;
var buy_investment = [];
var sell_price = [];
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
  //console.log(`Row ${i}: ${Array.from(row.cells).map(cell => cell.textContent).join(" | ")}`);
}
var total_buy_investment=buy_investment.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
var total_sell_price=sell_price.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(buy_investment,total_buy_investment);
console.log(sell_price,total_sell_price);
console.log(total_sell_price-total_buy_investment);



// DISQUALIFICAION CRITIRIA
//  number of trades
console.log(table.rows.length);
console.log(total_buy_investment);
