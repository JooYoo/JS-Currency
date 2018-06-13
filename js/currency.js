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

function displayChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "1st Money",
                    backgroundColor: 'rgb(236, 64, 122)',
                    borderColor: 'rgb(236, 64, 122)',
                    data: [0, 2, 3, 5, 40, 20, 1],
                }
                ,{
                    label: "2nd Money",
                    backgroundColor: 'rgb(52, 152, 219)',
                    borderColor: 'rgb(52, 152, 219)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }
                
            ]
        },

        // Configuration options go here
        options: {}
    });
}