var year = "1014";
var selectedCountries = [];
var data = 'hdi'
var set = null;
var line = null;
var activeBrush = false;

$('#time button').click(function(e){
	e.preventDefault(); // cancel the link behaviour
	var selText = $(this).text();
	$("#dropdownButtonTime").text(selText);
});
$('#topic button').click(function(e){
	e.preventDefault(); // cancel the link behaviour
	var selText = $(this).text();
	$("#dropdownButtonTopic").text(selText);
});

function changeTopic(freetext){
	data=freetext;
	if(data=="murder"){
		document.getElementById("intro").innerHTML="<strong>Murders(per 100 000 people):</strong> Mortality due to interpersonal violence, per 100 000 standard population, age adjusted. This rate is calculated as if all countries had the same age composition of population."
		document.getElementById("high").innerText="High: Greater than 10"
		document.getElementById("med").innerText="Medium: 5 ~ 10"
		document.getElementById("low").innerText="Low: Less than 5"
	}else if(data=="demo"){
		document.getElementById("intro").innerHTML="<strong>Democracy score:</strong> Overall polity score from the Polity IV dataset, calculated by subtracting an autocracy score from a democracy score. It is a summary measure of a country’s democratic and free nature. -10 is the lowest value, 10 the highest."
		document.getElementById("high").innerText="High: Greater than 5"
		document.getElementById("med").innerText="Medium: 0 ~ 5"
		document.getElementById("low").innerText="Low: Less than 0"
	}else if(data=="gini"){
		document.getElementById("intro").innerHTML="<strong>Gini index:</strong> A measure of statistical dispersion intended to represent the income or wealth distribution of a nation's residents, and it measures the inequality among values of a frequency distribution (for example, levels of income)."
		document.getElementById("high").innerText="High: Greater than 50"
		document.getElementById("med").innerText="Medium: 30 ~ 50"
		document.getElementById("low").innerText="Low: Less than 30"
	}else if(data=="hdi"){
		document.getElementById("intro").innerHTML="<strong>Human Development Index (HDI):</strong> A statistic composite index of life expectancy, education, and per capita income indicators, which are used to rank countries into four tiers of human development. A country scores a higher HDI when the lifespan is higher, the education level is higher, and the gross national income GNI (PPP) per capita is higher. "
		document.getElementById("high").innerText="High: Greater than 0.7"
		document.getElementById("med").innerText="Medium: 0.5 ~ 0.7"
		document.getElementById("low").innerText="Low: Less than 0.5"
	}else if(data=="corr"){
		document.getElementById("intro").innerHTML="<strong>Absence of Corruption:</strong> measures the absence of corruption in a number of government agencies. The factor considers three forms of corruption: bribery, improper influence by public or private interests, and misappropriation of public funds or other resources. Higher index means less corruption issues."
		document.getElementById("high").innerText="High: Greater than 60"
		document.getElementById("med").innerText="Medium: 30 ~ 60"
		document.getElementById("low").innerText="Low: Less than 30"
	}else if(data=="fe"){
		document.getElementById("intro").innerHTML="<strong>Mean years in school (women 15 to 24 years):</strong> The average number of years of school attended by all women in the age 15 to 24 years old, including primary, secondary and tertiary education."
		document.getElementById("high").innerText="High: Greater than 9"
		document.getElementById("med").innerText="Medium: 5 ~ 9"
		document.getElementById("low").innerText="Low: Less than 5"
	}
	// showVis()
	if(year=="9599"){
		// console.log(document.getElementById("high").innerText);
		show9599();
	}else if(year=="0004"){
		show0004();
	}else if(year=="0509"){
		show0509();
	}else if(year=="1014"){
		show1014();
	}
}


function show9599() {
	$("#container").empty();
	$("#vis").empty();
	$("#countryTable").empty();
	year = "9599";
  currentYear = "1995 - 1999";
	createChart("data/justifiable_9599.csv")
	if(data=="murder"){
		createMap("data/Murder_w1.csv");
	}else if(data=="demo"){
		createMap("data/Democracy_w1.csv");
	}else if(data=="gini"){
		createMap("data/GINI_w1.csv");
	}else if(data=="hdi"){
		createMap("data/HDI_w1.csv");
	}else if(data=="corr"){
		createMap("data/AbsCorrup_w1.csv");
	}else if(data=="fe"){
		createMap("data/School_women_w1.csv");
	}
	// changeData(data);
}

function show0004() {
	$("#container").empty();
	$("#vis").empty();
	$("#countryTable").empty();
	year = "0004";
  currentYear = "2000 - 2004";
	createChart("data/justifiable_0004.csv");
	if(data=="murder"){
		createMap("data/Murder_w2.csv");
	}else if(data=="demo"){
		createMap("data/Democracy_w2.csv");
	}else if(data=="gini"){
		createMap("data/GINI_w2.csv");
	}else if(data=="hdi"){
		createMap("data/HDI_w2.csv");
	}else if(data=="corr"){
		createMap("data/AbsCorrup_w2.csv");
	}else if(data=="fe"){
		createMap("data/School_women_w2.csv");
	}
	// changeData(data);
}

function show0509() {
	$("#container").empty();
	$("#vis").empty();
	$("#countryTable").empty();
	year = "0509";
  currentYear = "2005 - 2009";
	createChart("data/justifiable_0509.csv");
	if(data=="murder"){
		createMap("data/Murder_w3.csv");
	}else if(data=="demo"){
		createMap("data/Democracy_w3.csv");
	}else if(data=="gini"){
		createMap("data/GINI_w3.csv");
	}else if(data=="hdi"){
		createMap("data/HDI_w3.csv");
	}else if(data=="corr"){
		createMap("data/AbsCorrup_w3.csv");
	}else if(data=="fe"){
		createMap("data/School_women_w3.csv");
	}
}

function show1014() {
	$("#container").empty();
	$("#vis").empty();
	$("#countryTable").empty();
	year = "1014";
  currentYear = "2010 - 2014";
	createChart("data/justifiable_1014.csv");
	if(data=="murder"){
		createMap("data/Murder_w4.csv");
	}else if(data=="demo"){
		createMap("data/Democracy_w4.csv");
	}else if(data=="gini"){
		createMap("data/GINI_w4.csv");
	}else if(data=="hdi"){
		createMap("data/HDI_w4.csv");
	}else if(data=="corr"){
		createMap("data/AbsCorrup_w4.csv");
	}else if(data=="fe"){
		createMap("data/School_women_w4.csv");
	}
}


/********* Parallel Coordinates Table *********/
function createChart(file) {
d3.csv(file, function(dataset) {
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
}

/********* Map Visualization *********/
function createMap(file){
		map = new Datamap({
			element: document.getElementById('container'),
			geographyConfig: {
					 highlightOnHover: true,
					 popupOnHover: true,
					 highlightFillColor: 'feauturenotabug',
				 highlightBorderColor: 'rgba(100, 100, 100, 0.8)',
				 },
			fills: {
				Low: '#4CAF50',
				High: '#F44336',
				Mid: '#FFEB3B',
				UNKNOWN: 'rgb(0,0,0)',
				defaultFill: '#DCEDC1'
			},
			dataUrl: file,
            dataType: 'csv',
			data: {
			}
		});	    		
	}


// createMap();
show1014();