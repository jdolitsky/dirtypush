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

	fs.readFile(unloadFile, 'utf8', function (err,data) {

		var json = parser.parse(data+'\n'+req.body.content);
		var rulelist = json.rulelist;
		var selectors = {};

		for (var i in rulelist) {

			var rule = rulelist[i];
			if (rule.type == 'style'){
				selectors[rule.selector] = rule.declarations;
			}	
		}

		var fileBody = '';

		for (var style in selectors) {
			fileBody += style+' {';

			var obj = selectors[style];
			for (var key in obj) {
				fileBody += '\n  '+key+': '+obj[key]+';';
			}

			fileBody += '\n}\n'
		}

		fs.writeFile(unloadFile, fileBody, function (err) {
			res.send('style change saved');
		});
		
	});
});