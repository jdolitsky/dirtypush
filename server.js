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
var saveFile = './unload.css';

// start listening...
app.listen(port);

console.log('dirtypush running at http://localhost:'+port+'/unload.css');

app.get('/unload.css', function (req, res) {
	fs.readFile(saveFile, 'utf8', function (err,data) {
		res.send(data);
		return;
	});
});

app.post('/unload.css', function (req, res) {

	fs.readFile(saveFile, 'utf8', function (err,data) {
		var change = '\n'+req.body.content;
		var json = parser.parse(data+change);
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

		fs.writeFile(saveFile, fileBody, function (err) {

			var message = 'the following edit has been saved to ';
			message += saveFile+'\n';
			message += '-------------------------------------------------';		
			message += change;

			console.log(message);
			res.send(message);
			return;
		});
		
	});
});