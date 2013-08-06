// required modules
var express = require('express');
var fs = require('fs');
var cssparser = require('cssparser');
var parser = new cssparser.Parser();

// initialize our app
var app = express();

app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());

// port that server will listen on
var port = 3000;

// start listening...
app.listen(port);
console.log('Express server listening on port '+port);

var unloadFile = './unload.css';

app.get('/unload.css', function (req, res) {
	fs.readFile(unloadFile, 'utf8', function (err,data) {
		res.send(data);
	});
});

app.post('/unload.css', function (req, res) {
	/*console.log(req.body.content);
	fs.appendFile(unloadFile, req.body.content, function (err) {

	});
	res.send('booyah!');
	*/
	fs.readFile(unloadFile, 'utf8', function (err,data) {
		var json = parser.parse(data);
		console.log(JSON.stringify(json));
		fs.appendFile(unloadFile, req.body.content+'\n', function (err) {

		});
		res.send('booyah!');
	});
});