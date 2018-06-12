
function convertCurrency(){
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    var xmlhttp = new XMLHttpRequest();
    var accessKey = "0d48bf0a46d9dd953c1b12395ef89565";
    var url = "http://data.fixer.io/latest"
                +"?access_key="+accessKey
                +"&symbols=" + from + "," + to;
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status == 200){
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