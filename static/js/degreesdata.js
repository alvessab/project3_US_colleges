$(document).ready(function() {
    doWork();
});

function doWork() {
    var filepath = "static/data/degrees-that-pay-back.csv";  
    requestD3(filepath, 'degrees');
}