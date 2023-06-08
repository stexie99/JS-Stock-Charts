function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


async function main() {
    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=34313a31e2e44a9a9256bc0ce1bb6c86'
    )
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    const result = await response.json()
    console.log(result)
    const { GME, MSFT, DIS, BNTX } = mockData;
    console.log(Chart)
    const stocks = [GME, MSFT, DIS, BNTX];
    stocks.forEach( stock => stock.values.reverse())

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.reverse().map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });

    
    
    console.log(stocks[0].values)                                                  

    
}
function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseInt(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}
main()