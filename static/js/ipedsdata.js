$(document).ready(function() {
    doWork();
});

function doWork() {
    var filepath = "static/data/IPEDs.csv";  
    requestD3(filepath, 'ipeds');
}