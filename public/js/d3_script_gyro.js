function drawUnnumberedList(data) {
	"use strict";
	// Clear ul
	d3.select("ul").remove();

	d3.select("body")
		.append("ul")
		.selectAll("li")
		.data(data)
		.enter()
		.append("li")
		.text(function (d) {
			return "accelerometer x axis" + ": " + d.acc_x;
		});
}

function drawSimpleSvg(data) {
	"use strict";
	var margin = 50,
		width = 1000,
		height = 400;

	// Clear svg
	d3.select("svg").remove();

	// Scaling
	var time_extent = d3.extent(data, function(d){return d.timestamp});
	var time_scale = d3.scale.linear()
						.range([margin, width-margin])
						.domain(time_extent);
	var extent = d3.extent(data, function(d){return d.acc_x});
	var scale = d3.scale.linear()
					.range([height-margin, margin])
					.domain([-20,20]);

	// Initialization
	d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "chart");

	// Axis
	var time_axis = d3.svg.axis()
		.scale(time_scale);
	d3.select("svg")
		.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height-margin) + ")")
		.call(time_axis);

	var count_axis = d3.svg.axis()
		.scale(scale)
		.orient("left");
	d3.select("svg")
		.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + margin + ",0)")
		.call(count_axis);

	// Draw Graph
	var axisLabel = ["x", "y", "z"];
	axisLabel.forEach(item=>{
		// Mapping
		extent = d3.extent(data, function(d){return d['gyro_'+item]});
		scale = d3.scale.linear()
						.range([height-margin, margin])
						.domain([-20,20]);

		// Adding circles
		d3.select("svg")
			.selectAll("circle." + item)
			.data(data)
			.enter()
			.append("circle")
			.attr("class", item)

		// Draw circles
		d3.selectAll("circle." + item)
			.attr("cx", function(d){return time_scale(d.timestamp)})
			.attr("cy", function(d){return scale(d['gyro_'+item])})
			.attr("r", 3);

		// Path
		var line = d3.svg.line()
			.x(function(d){return time_scale(d.timestamp)})
			.y(function(d){return scale(d['gyro_'+item])});
		d3.select("svg")
			.append("path")
			.attr("d", line(data))
			.attr("class", item);

	})
		
	
	
				
}

setInterval(function() {
	var host = "http://localhost:3000/api/data?elements=20";
	//d3.json(host, drawUnnumberedList);
	d3.json(host, drawSimpleSvg);
}, 100);