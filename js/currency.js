function convertCurrency() {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    var xmlhttp = new XMLHttpRequest();

    //get the base 
    var url = "https://api.exchangeratesapi.io/latest?base=" + from;
   
    xmlhttp.open('GET', url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status == 200) {
            // get data
            var result = xmlhttp.responseText;
            // parse to json data
            var jsResult = JSON.parse(result);
            // calculate
            var oneUnit= jsResult.rates[to];
            //result = oneUnit * amount
            var amt = document.getElementById("fromAmount").value;
            document.getElementById("toAmount").value = (oneUnit * amt).toFixed(2);
        }
    }
}

function getPastMonth(count) {
    var z = new Date();
    z.setMonth(z.getMonth() - count);
    return z.toISOString().substring(0, 10);
}

function getPastMonths(count) {
    var dates = [];
    for (var i = count; i > 0; i--) {
        dates.push(getPastMonth(i));
    }

    return dates;
}

var currencies = [];

function Bind() {
    // clear currencies
    currencies = [];
    //bind
    convertCurrency();
    // todo: get the past 5 months data
    var dates = getPastMonths(5);
    console.log("dates: " + dates);

    // loop get different Month Currency
    for (let z = 0; z < dates.length; z++) {
        getHistoricalCurrency(dates[z]);
    }
}

function getHistoricalCurrency(historyTime) {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;;

    // 准备数据
    var xmlhttp = new XMLHttpRequest();
   
    // get one unit history base Currency
    var url = "https://api.exchangeratesapi.io/"+ historyTime +"?base=" + from;
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    // 
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status == 200) {
            // get data
            var result = xmlhttp.responseText;
            // parse to json data
            var jsResult = JSON.parse(result);
           
            var oneUnit = jsResult.rates[to];

            var result = oneUnit.toFixed(5);

            currencies.push(result);
            console.log(historyTime + ": " + result);
            console.log("currencies:" + currencies);
            displayChart();
        }
    }
}

function displayChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    // getPastMonths for X Axis
    var dates = getPastMonths(5);
    // draw chart
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: [dates[0], dates[1], dates[2], dates[3], dates[4]],
            datasets: [{
                label: "Currency",
                backgroundColor: 'rgb(171, 221, 147,0.3)',
                borderColor: 'rgb(48, 110, 18,0.3)',
                data: [currencies[0], currencies[1], currencies[2], currencies[3], currencies[4]],
            }]
        },
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}