var http = require('http'),
	path = require('path');

var dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic');
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app'),
	logger = require('./logger');


app.use(dataParser);
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveCalculator);
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen(8080);
console.log('server listening on port 8080');
