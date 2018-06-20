function convertCurrency() {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    var xmlhttp = new XMLHttpRequest();
    var accessKey = "0d48bf0a46d9dd953c1b12395ef89565";
    var url = "http://data.fixer.io/latest" +
        "?access_key=" + accessKey +
        "&symbols=" + from + "," + to;
    xmlhttp.open('GET', url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status == 200) {
            // get data
            var result = xmlhttp.responseText;
            // parse to json data
            var jsResult = JSON.parse(result);
            // calculate
            var oneUnit = jsResult.rates[to] / jsResult.rates[from];
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

function getPastMonths(count){
    var dates = [];
    for (let i = 0; i < count; i++) {
        dates.push(getPastMonth(i));
    }

    return dates;
}

var currencies = [];
function Bind() {
    // clear currencies
    currencies=[];
    //bind
    convertCurrency();
    // todo: 获取过去五个月的今天的日期
    var dates= getPastMonths(5);
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
    var url = "http://data.fixer.io/api/" + historyTime +
        "?access_key=" + accessKey +
        "&symbols=" + from + "," + to;
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
            var oneUnit = jsResult.rates[to] / jsResult.rates[from];
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
     var dates= getPastMonths(5);
     // draw chart
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: [dates[0], dates[1], dates[2], dates[3], dates[4]],
            datasets: [{
                label: "1st Money",
                backgroundColor: 'rgb(236, 64, 122)',
                borderColor: 'rgb(236, 64, 122)',
                data: [currencies[0], currencies[1], currencies[2], currencies[3], currencies[4]],
            }]
        },

        // Configuration options go here
        options: {}
    });
}