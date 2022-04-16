function requestD3(filepath, table_id){

    d3.csv(filepath).then(function(data) {
        console.log(data);
        makeTable(data, table_id);
    });

};

function makeTable(data, table_id) {
    for (i=0; i<data.length; i++) {
        let row=data[i];

        let html = "<tr>";
        Object.values(row).forEach(function(value){
            html += `<td>${value}</td>`
        });

        html += "</tr>";

        $(`#${table_id} tbody`).append(html);
    } 
    $(`#${table_id}`).show();
    $(`#${table_id}`).DataTable();
    $('#loading').hide();
}

