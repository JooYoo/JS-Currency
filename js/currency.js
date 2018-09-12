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
    var accessKey = "0d48bf0a46d9dd953c1b12395ef89565";
    // todo: 下面的日期要更换获取新数据
    if(from=="EUR"){
        var url = "https://api.exchangeratesapi.io/" + historyTime +
        //"?access_key=" + accessKey +
        "?symbols=" + to;
    }else{
        var url = "https://api.exchangeratesapi.io/api/" + historyTime +
        //"?access_key=" + accessKey +
        "?symbols=" + from + "," + to;
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    // 
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status == 200) {
            // get data
            var result = xmlhttp.responseText;
            // parse to json data
            var jsResult = JSON.parse(result);
            // calculate
            var oneUnit;
            if(from=="EUR"){
                oneUnit = jsResult.rates[to];
            }else{
                oneUnit = jsResult.rates[to] / jsResult.rates[from];
            }
            var result = (oneUnit * 1).toFixed(5);

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