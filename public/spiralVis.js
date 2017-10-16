/* implementation heavily influenced by http://bl.ocks.org/1166403 */
		/* some arguments AGAINST the use of dual-scaled axes line graphs can be found at http://www.perceptualedge.com/articles/visual_business_intelligence/dual-scaled_axes.pdf */
function renderVis(file)
{		
		// define dimensions of graph
		var m = [80, 80, 80, 80]; // margins
		var w = 900 - m[1] - m[3];	// width
		var h = 400 - m[0] - m[2]; // height
		var h1 = 200 - m[0] - m[2];
		var sw = 300;//spiral
		var sh = 200;
		var lw = 50; //colorlegend
		
		//"#BFD3E6" "#BFD300"
		//"#58118D" "#8D3811"
		var minimumColor = "#BFD3E6", maximumColor = "#58118D";
		
		this.SVG = null;
		this.cX = null;
		var x = d3.scale
				.linear()
				.range([0, w])
				
		var x2 = d3.scale
				.linear()	
				.range([0, w])		
		
		
		
		var y1 = d3.scale.linear().range([h/2-5, 0]); 		
		var y2 = d3.scale.linear().range([h/2-5, 0]);
		var y_1 = d3.scale.linear().range([h1, 0]);
		var y_2 = d3.scale.linear().range([h1, 0]);
		
		this.hoverLine= null;

		var xAxis = d3.svg.axis().scale(x).orient("bottom");
		
		
            
		var xAxis2 = d3.svg.axis().scale(x2).orient("bottom");
					// create left yAxis
		var yAxisLeft = d3.svg.axis().scale(y1).orient("left");
			  		// create right yAxis
	  	var yAxisRight = d3.svg.axis().scale(y2).orient("left");




		var brush = d3.svg.brush()
    		.x(x2)
    		.on("brush", brushed);


		
		
		var line2 = d3.svg.line()
    		//.interpolate("monotone")
    		.x(function(d) { return x(d.t); })
    		
    		.y(function(d) { return y2(d.a); });
    		
    	
    			
    	var line1 = d3.svg.line()
    		//.interpolate("monotone")
    		.x(function(d) { return x(d.t); })
    		
    		.y(function(d) { return y1(d.v); });
    		
    	var vline = d3.svg.line()
    		//.interpolate("monotone")
    		.x(function(d) { return x(d.t); })
    		
    		.y(function(d) { return y1(d.v); });

    		

    		
    	var cline1 = d3.svg.line()
    		//.interpolate("monotone")
    		.x(function(d) { return x2(d.t); })
    		
    		.y(function(d) { return y_1(d.x); });
    
		var cline2 = d3.svg.line()
    		//.interpolate("monotone")
    		.x(function(d) { return x2(d.t); })
    		
    		.y(function(d) { return y_2(d.y); });	
			
		var label1 = null;
		var label2 = null;

		
				
		var svg = d3.select("#graph").append("svg")
    			.attr("width", (w +  sw + m[1] + m[3]+lw))
    			.attr("height", (h  + m[0] + m[2]));
					// Add an SVG element with the desired dimensions and margin.
			
			svg.append("defs").append("clipPath")
    			.attr("id", "clip")
  				.append("rect")
    			.attr("width", (w + sw + m[1] + m[3] +lw))
    			.attr("height", (h + m[0] + m[2]));
		renderVis.SVG = svg;
		
				
				
    		
    				// create yAxis
			
		var graph = svg .append("g")
	    	.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
	    	
	    var chart1 = graph.append("g");
	    var chart2 = graph.append("g")
	    .attr("transform", "translate(" + 0 + "," + (h/2 +5) + ")");	
	    /*	
		var context = svg.append("g")
			.attr("transform", "translate(" + m[3] + "," + (m[0] + h) + ")");
		*/	
		var spiral = svg.append("g")
			.attr("transform", "translate(" + (m[3] +m[1] + w ) + "," + m[0]  + ")");
			
		var colorLegend = svg.append("g")
			.attr("transform", "translate(" + (m[3] +m[1] + w + sw) + "," + m[0]  + ")");
			

		
		 this.circle = null;
		// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
		//var data1 = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];
		//var data2 = [543, 367, 215, 56, 65, 62, 87, 156, 287, 398, 523, 685, 652, 674, 639, 619, 589, 558, 605, 574, 564, 496, 525, 476, 432, 458, 421, 387, 375, 368];
		d3.csv(file, function(data) 
			{	
			
			var tmpX = 0;
			var tmpY = 0;
			var tmpT = 0;	
			var distance = 0.0;
			var radius = 0.0;
			var dt = 0.0;
			var firstElem = 1;
			
			var tX = 0.0;
			var tY = 0.0;
			var tRad = 0.0;
				
    		data.forEach(function(d) 
    		{
    			
    			d.t = parseFloat(d.t);
    			d.x = parseFloat(d.x);
    			d.y = parseFloat(d.y);
    			distance = Math.sqrt(Math.pow(tmpX - d.x, 2.0) + Math.pow(tmpY - d.y, 2.0)); 
    			
    			var X = (d.x-110)*20/23;
				var Y = (115-d.y)*20/23;
				
				
				var rad = Math.sqrt(Math.pow(X, 2.0) + Math.pow(Y, 2.0));
				
				//tRad = rad - tRad;
				tX = X;
				tY = Y;

    			dt = d.t- dt;
    			if (dt == 0)
    			d.v = 0;
    			else
    			d.v = parseFloat(distance/(dt*1000));
    			
    			
    			if (firstElem == 1)
    			{
    			 	d.a = 0;
    			 	firstElem = 0;
    			 	tRad = 0;
    			}
    			else
    			d.a = rad-tRad;
    			
    			tmpX = d.x;
    			tmpY = d.y;
    			dt = d.t;
    			tRad = rad;
    			//console.log(data);
    		})
    		
		// X scale will fit all values from data[] within pixels 0-w
		//var x = d3.scale.linear().domain(d3.extent(data.map(function(d) { return d.t; }))).range([0, w]);
		


    				
				x.domain([0, d3.max(data.map(function(d) { return d.t; }))]);
		
		renderVis.cX = x;
				x2.domain([0, d3.max(data.map(function(d) { return d.t; }))]);
				
		
		domain_y1 = y1.domain([d3.min(data.map(function(d) { return d.v; })), d3.max(data.map(function(d) { return d.v; }))]);// in real world the domain would be dynamically calculated from the data
		domain_y2 = y2.domain([d3.min(data.map(function(d) { return d.a; })), d3.max(data.map(function(d) { return d.a; }))]); // in real world the domain would be dynamically calculated from the data
		var minimum = 0;
		var maximum = d3.max(data.map(function(d) { return d.t; }));
		var color = d3.scale.linear().domain([minimum, maximum]).range([minimumColor, maximumColor]);
	
			
		y_1.domain([0, d3.max(data.map(function(d) { return d.x; }))]) ;// in real world the domain would be dynamically calculated from the data
		y_2.domain([0, d3.max(data.map(function(d) { return d.y; }))]);  // in real world the domain would be dynamically calculated from the data
			
			
	
		
			chart1.append("path")
      			.datum(data)
      			.attr("clip-path", "url(#clip)")
      			.attr("d", line1).attr("class", "data1")
      			;
      			
      		chart2.append("path")
      			.datum(data)
      			.attr("clip-path", "url(#clip)")
      			.attr("d", line2).attr("class", "data2");
      			
      		
      		
    
		


			

			// Add the x-axis.
			graph.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + h + ")")
			      .call(xAxis);
			/*
			// Add the x-axis.
			context.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + h  + ")")
			      .call(xAxis2);
			      
			*/


			// Add the y-axis to the left
			chart1.append("g")
			      .attr("class", "y axis axisLeft")
			      .attr("transform", "translate(-15,0)")
			      .call(yAxisLeft);
			      
			label1 = chart1.append("text")
    				.attr('transform', 'translate(0, 10)')
  					.text("px/s");
  					
  			label2 = chart2.append("text")
    				.attr('transform', 'translate(0, 10)')
  					.text("px");

  			// Add the y-axis to the right
  			chart2.append("g")
  			      .attr("class", "y axis axisRight")
  			      .attr("transform", "translate( -15,0)")
  			      .call(yAxisRight);
			
			// add lines
			// do this AFTER the axes above so that the line is above the tick-lines
  			//graph.append("svg:path").attr("d", line1(data.map(function(d) { return d.x;}))).attr("class", "data1");
  			//graph.append("svg:path").attr("d", line2(data.map(function(d) { return d.y;}))).attr("class", "data2");
			
      			
      		/*	
      		context.append("path")
      			.datum(data)
      			.attr("clip-path", "url(#clip)")
      			.attr("d", cline1).attr("class", "data1");
      			
      		context.append("path")
      			.datum(data)
      			.attr("clip-path", "url(#clip)")
      			.attr("d", cline2).attr("class", "data2");	
      		*/
      		
      			
      		
      		renderVis.circle=	spiral.selectAll("circle")
    				.data(data.map(function(d) { return d;}))
  					.enter().append("circle")
    				.attr("cy", (function(d) { return d.y;}))
    				.attr("cx", (function(d) { return d.x;}))
    				.attr("d", renderVis.circle)
    				.attr("r", 2)
    				.style("fill", function(d) {
       					 return color(d.t);
    					})
    				.on("mouseover", function(d){ 
    				renderVis.hoverLine
						.style("opacity",1);
						
					label1.text(d3.round(d.v, 2) + " px/s");
					label2.text(d3.round(d.a, 2) + " px");
					
						
						d3.select(this).attr("r", 5)
						
    				hLine(x(d.t));})
    				.on("mouseout", function () {
    				d3.select(this).attr("r", 2)
    				
    				label1.text("px/s");
					label2.text("px");
    				
        			renderVis.hoverLine
						.style("opacity",0);
   					 })
   				
   				var cmY = d3.scale.linear().range([0, 100]);
   				var cmY1 = d3.scale.linear().range([0, 100]);
   				cmY.domain([0, data.length]);
   				cmY1.domain([0, d3.max(data.map(function(d) { return d.t; }))]);
   				var ofsetX = lw-30;
   				var clAxis = d3.svg.axis().scale(cmY1).orient("right").ticks(4);
   				colorLegend.append("g")
  			      .attr("class", "y axis colormap")
  			      .attr("transform", "translate( " + ofsetX +",0)")
  			      .call(clAxis);
  			      
   				colorLegend.selectAll("rect")
   				.data(data.map(function(d) { return d;}))
   				.enter().append('rect')
	        	.attr('x', 0)
    	    	.attr('y', function(d, i){ return cmY(i);})
        		.attr('width', 7)
        		.attr('height', 1)
	        	.style('fill', function(d) { 
	          	return color(d.t);
	        	});	 
   			
   					 
   			graph.selectAll("rect")
    				.data(data.map(function(d) { return d;}))
  					.enter().append("rect")
    				.attr("y", 0)
    				.attr("x", (function(d) { return x(d.t);}))
    				.attr("width", 2)
                   	.attr("height", h)
                   	.style("opacity",0)
    				.on("mouseover", function(d, i){ 
    				renderVis.hoverLine
    					
						.style("opacity",1);
    				hLine(x(d.t));
    				
    				label1.text(d3.round(d.v, 2) + " px/s");
					label2.text(d3.round(d.a, 2) + " px");
					
    				d3.select(renderVis.circle[0][i]).attr("r", 5);
    				//circle.attr("r", 20);
    				//spiralNode(i);
    				
    				})
    				.on("mouseout", function () {
    				
    				label1.text("px/s");
					label2.text("px");
					
        			renderVis.hoverLine
        				
						.style("opacity",0);
						renderVis.circle.attr("r", 2);
   					 });		 
   					 
   			 
    				//.attr("transform", "translate(" + (m[3] + m[1] + w ) + "," + m[0]  + ")");;
    		
    		renderVis.hoverLine = graph.append('line')
            	.attr('class', 'hover-line')
            	.attr('x1', 0).attr('x2', 0)
            	.attr('y1', 2)// prevent touching x-axis line
            	.attr('y2', h )
            	.attr('transform', 'translate(0, 0)')
            	.attr('stroke-width', 1)
            	.attr('stroke', 'grey')
            	.attr('opacity', 0);		
    		
    				
      		/*	
      		context.append("g")
      			.attr("class", "x brush")
      			.call(brush)
    			.selectAll("rect")
      			.attr("y", -6)
      			.attr("height", h1 + 7);	
      		*/	
      		
      			
			});

}			
function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
 // graph.select("path").attr("d", line2);
 
 var mycars = new Array();
mycars[0] = line1;
mycars[1] = line2;

    graph.selectAll("path").attr("d", mycars);

    		
  graph.select(".x.axis").call(xAxis);
}


function reload(file)
{
	renderVis.SVG.remove();
       
	renderVis(file);

}

  
   
function hLine(x)
{
	
	
	renderVis.hoverLine.       // this is the object 
      transition()
      .duration(0)
      .delay(0)
      	.attr("x2",x)         // a new transition!
        .attr("x1",x); 
        
     
}

function spiralNode(o)
{
	//console.log(circle[o]);
	renderVis.circle[0][o].style({'r':'0.8'});
}



function animate(){

renderVis.circle.transition()
.duration(0)
	.delay(0)
  .style("opacity",0);
  
  renderVis.hoverLine
	.style("opacity",1);

renderVis.circle.transition()
  .style("opacity",1)
  .delay(function(d, i) { return d.t*1000; })
  .each("start",  function(d){ hLine(renderVis.cX(d.t));});
  
  

  
  }
/*  
circle.transition()
	.style("opacity",1)
	.duration(1000)
	.delay(100);*/
