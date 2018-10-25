var fs = require('fs'),
	path = require('path');
	
var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.xml', '.ico', '.json'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) >= 0 ;
}

module.exports = function(req, res){
	if (isStatic(req.urlObj.pathname)){
		var resource = path.join(__dirname, req.urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resource);
		stream.pipe(res);
	}
}