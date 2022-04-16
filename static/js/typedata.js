$(document).ready(function() {
    doWork();
});

function doWork() {
    var filepath = "static/data/merged.csv";  
    requestD3(filepath, 'merged');
}