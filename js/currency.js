
var myReq = new XMLHttpRequest();
myReq.open('GET','json file path','true');
myReq.onload=function(){
    var result = JSON.parse(myReq.responseText);
    console.log(result);
}
myReq.send();

function convertCurrency(){
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.fixer.io/latest?symbols=" + from + "," + to;
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status == 200){

            var result = xmlhttp.responseText;
            alert(result);
            var jsResult = JSON.parse(result);
        }
    }

} 