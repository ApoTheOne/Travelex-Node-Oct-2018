var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.xml', '.ico', '.json'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) >= 0 ;
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (isStatic(urlObj.pathname)){
		var resource = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resource);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(urlObj.query),
			op = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(rawData),
				op = data.op,
				n1 = parseInt(data.n1),
				n2 = parseInt(data.n2);

			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('server listening on port 8080');
