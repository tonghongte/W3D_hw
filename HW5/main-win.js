var shelljs = require('shelljs');
var express = require('express');
var app = express();
var path = require('path')
app.use(express.static(path.join(__dirname, './')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/HW5.html');
});

app.get ('/api', function (req, res) {

	var circle_r = req.query.circle_r;
	var pos_x = req.query.pos_x;
	var pos_y                    =req.query.pos_y                  ;
    var plane_pos_x              =req.query.plane_pos_x            ;
    var plane_pos_y              =req.query.plane_pos_y            ;
    var point_on_rectangle_x     =req.query.point_on_rectangle_x   ;
    var point_on_rectangle_y     =req.query.point_on_rectangle_y   ;
	shelljs.exec('main.exe ' +circle_r+' '+pos_x+' '+pos_y+' '+plane_pos_x+' '+plane_pos_y+' '+point_on_rectangle_x+' '+point_on_rectangle_y, function(status, output) {
	  
	  console.log('\npositionX:', pos_x,',positionY:',pos_y);
	  console.log('\nExit status:', status);
	  console.log('Program output:', output, '\n');

      var output = {
        status: status,
        output: output
      };

		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (8585); 
// will do

var server = app.listen (8585, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});

