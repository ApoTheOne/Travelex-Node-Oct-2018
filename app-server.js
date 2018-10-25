var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var data = querystring.parse(urlObj.query),
		op = data.op,
		n1 = parseInt(data.n1),
		n2 = parseInt(data.n2);

	var result = calculator[op](n1, n2);
	res.write(result.toString());
	res.end();
});

server.listen(8085);
console.log('server listening on port 8085');
