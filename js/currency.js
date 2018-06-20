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

var currencies = [];
function Bind() {

    // todo: 获取过去五个月的今天的日期
    var dates = [];
    for (let i = 0; i < 5; i++) {
        dates.push(getPastMonth(i));
    }
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
        }
    }
}

function displayChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ["0", "1", "2", "3", "4"],
            datasets: [{
                label: "1st Money",
                backgroundColor: 'rgb(236, 64, 122)',
                borderColor: 'rgb(236, 64, 122)',
                data: [0, 2, 3, 5, 40],
            }, {
                label: "2nd Money",
                backgroundColor: 'rgb(52, 152, 219)',
                borderColor: 'rgb(52, 152, 219)',
                data: [0, 10, 5, 2, 20],
            }]
        },

        // Configuration options go here
        options: {}
    });
}