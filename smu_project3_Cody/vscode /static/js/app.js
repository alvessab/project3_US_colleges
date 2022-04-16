// global data because the RESPONSE is not changing
var filepath = "static/data/merged.csv";
var global_data;

$(document).ready(function() {

    doWork();

    $("#filter").on("click", function() {
        //DO WORK
        filterAndPlot();
    })

});



function filterAndPlot() {
    let filter_value = $("#selDataset").val();
    let type_value = $("#selType").val();
    let slices_value = $("#slices").val();
    let sorting_value = $("#sorting").val();

    let sub = global_data;
    if (filter_value != 'All') {
        sub = global_data.filter(row => row.Region === filter_value);
    }

    if (type_value != 'All') {
        sub = sub.filter(row => row.SchoolType === type_value);
    }

    if (sorting_value === "Ascending") {
        sub = sub.sort(function(first_row, second_row) {
            return second_row.career_median_salary - first_row.career_median_salary
        });

    } else {
        sub = sub.sort(function(first_row, second_row) {
            return first_row.career_median_salary - second_row.career_median_salary
        });
    }

    let sub_bar = sub.slice(0, slices_value);
    var schools = sub_bar.map(x => x["SchoolName"]);
    var career_median_salary = sub_bar.map(x => x["career_median_salary"]);
    //var starting_median_salary = data.map(x => x["starting_median_salary"])
    //var usregions = data.map(x => x["Region"]);
    //var schoolTypes = data.map(x => x["SchoolType"]);

    makePlot(schools, career_median_salary);
    makeSunburst(sub);
    makeDonut(sub);
}



function doWork() {
    d3.csv(filepath).then(function(data) {
        console.log(data);
        global_data = data;

        filterAndPlot();
    });
}




function makePlot(schools, career_median_salary) {

    var trace1 = {
        type: 'bar',
        x: career_median_salary,
        y: schools,
        name: 'School vs Career Salary',
        orientation: 'h'
    }

    var data1 = [trace1];
    var layout = {
        title: {
            text: 'Career Median Salary Vs School',
        },
        xaxis: {
            title: {
                text: 'Career Median Salary $(thousands)',
            },
        },
        yaxis: {
            title: {
                text: 'School',
            },
            automargin: true
        }
    };


    Plotly.newPlot('bar', data1, layout);
}

function makeSunburst(sub) {

    var regions = sub.map(x => x.Region);
    var regions_set = new Set(regions);
    var schools = sub.map(x => x.SchoolName);
    var labels = [...regions_set];
    var parents = labels.map(x => "");
    labels.push(...schools);

    parents.push(...regions);

    var values = [];
    for (let i = 0; i < parents.length; i++) {
        values.push(1);
    }


    var data = [{
        type: "sunburst",
        labels: labels,
        parents: parents,
        values: values,
        outsidetextfont: { size: 20, color: "#377eb8" },
        leaf: { opacity: 0.4 },
        marker: { line: { width: 2 } },
    }];

    var layout = {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        width: 500,
        height: 500
    };


    Plotly.newPlot('donut', data, layout);
}

function makeDonut(sub) {

    // var regions = sub.map(x => x.Region);
    //var regions_set = new Set(regions);
    var type = sub.map(x => x.SchoolType);
    var type_set = new Set(type);
    var labels = [...type_set];
    var parents = labels.map(x => "");
    labels.push(...type);

    parents.push(...type);

    var values = [];
    for (let i = 0; i < parents.length; i++) {
        values.push(1);
    }

    var data = [{
        values: values,
        labels: labels,
        domain: { column: 0 },
        hoverinfo: 'label+percent+value',
        hole: .4,

        type: 'pie'
    }];

    var layout = {
        title: 'School Type Breakdown',
        annotations: [{
            font: {
                size: 9.5
            },
            textinfo: "label+percent+value",
            showarrow: false,
            text: 'School Type',
            x: 0.17,
            y: 0.5
        }],
        height: 500,
        width: 750,
        showlegend: true,
        grid: { rows: 1, columns: 2 },

    };

    Plotly.newPlot('scatter', data, layout);
}



// function makeChart()
// var arr = global_data.map(x => x["Region"])

// const count = {};


// for (let i = 0; i < arr.length; i++) {
//     const [element] = arr[i];

//     if (count[element]) {
//         count[element] += 1
//     } else {
//         count[element] = 1
//     }
// }

// console.log(count)


// var data2 = [{
//     values: count,
//     labels2: ["C", 'M', "N", 'S', "W"],
//     domain: { column: 0 },
//     name: 'College Locations',
//     hoverinfo: 'label+percent+name',
//     hole: .4,
//     type: 'pie'
// }];

// var layout2 = {
//     title: 'Global Emissions 1990-2011',
//     annotations: [{
//         font: {
//             size: 20
//         },
//         showarrow: false,
//         text: 'GHG',
//         x: 0.17,
//         y: 0.5
//     }],
//     height: 400,
//     width: 600,
//     showlegend: false,
//     grid: { rows: 1, columns: 2 }
// };

// Plotly.newPlot('scatter', data2, layout2);






// california = [];
// west = [];
// midwest = [];
// south = [];
// northeast = [];

// for (let i = 0; i < global_data.length; i++) {
//     // Variable to hold current school in loop
//     let school = global_data[i]


//     if (global_data.Region == 'California') {
//         california.push();
//     } else if (global_data.Region == "Western") {
//         west.push(school);
//     } else if (global_data.Region == "Midwestern") {
//         midwest.push(school);
//     } else if (global_data.Region == "Southern") {
//         south.push(school);
//     } else {
//         northeast.push(school);
//     }
// }

// console.log("---------");
// console.log(california);
// console.log(west);
// console.log(midwest);
// console.log(south);
// console.log(northeast);