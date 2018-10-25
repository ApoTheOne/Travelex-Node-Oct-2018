module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date(),
			elapsed = endTime - startTime;
		let logString = `${req.method}\t${req.urlObj.pathname}\t${res.statusCode}\t${elapsed} ms`;
		console.log(logString);
	});
	next();	
	
};