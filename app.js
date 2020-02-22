var year = "year1014";
var selectedCountries = [];
var data = 'happiness'
var set = null;
var line = null;
var activeBrush = false;
//Data for IVIS20 Project 1.csv


d3.csv('data/justifiable_0509.csv', function(dataset) {
    //Load data and map it
    var data = d3.entries(dataset).map(function(d) {
        var val = d.value;
        val.key = d.key;
        return val;
    })

    //Create and style parcoords
    var colorScheme = d3.scale.linear()
        .domain([0,8])
        .range(['steelblue', 'brown'])
        .interpolate(d3.interpolateLab);

    var color_coord = function(d) { return colorScheme(d['Suicide']); };

    var parcoords = d3.parcoords()('#vis')
        .data(data)
       .hideAxis(['Country','key'])
        .color(color_coord)
        .alpha(0.4)
        .composite('darken')
        .margin({ top: 20, left: 20, bottom: 10, right: 25 })
        .mode('queue')
        .render()
        .reorderable()
        .brushMode('1D-axes')

    //Create the table for the all countries
    var countryTable = d3.select('#countryTable').append('table')
        .attr('class', 'table table-hover')
    var classThead = countryTable.append('thead')
    var classTbody = countryTable.append('tbody')
    
    var classColumns = d3.keys(data[0]).splice(0,1)

        classThead.append('tr')
        .selectAll('th')
            .data(classColumns)
            .enter()
        .append('th')
            .text(function(d) { return d; })

    var classRows = classTbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .on({
            'mouseover': function(d,i) { parcoords.highlight([data[i]]) },
            'mouseout': parcoords.unhighlight
        })
        
    var classCells = classRows.selectAll('td')
        .data(function(row) {
            return classColumns.map(function (column) {
                return { column: column, value: row[column] }
            })
        })
        .enter()
        .append('td')
            .text(function(d) { 
                return d.value 
            })

    //Filter function for countryTable when parcoords is brushed
    parcoords.on('brush', function(items) {
        var x = document.getElementById("countryTable");
        var selected = items.map(function(d) { return d.key; })
        classTbody.selectAll('tr')
            .attr('style', 'display: none')
            .filter(function(d) { return selected.indexOf(d.key) > -1 })
            .attr('style', 'null')
    })

    
});
