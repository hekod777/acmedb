var express = require('express');
var app = express();
var swig = require('swig');
var bodyParser = require ('body-parser');
var routes = require('./routes');
var methodOverride = require ('method-override');

app.use(methodOverride('_method'));

swig.renderFile(__dirname + '/views/index.html');
app.set('views', __dirname + '/views');
app.set ('view engine', 'html');
app.engine('html',swig.renderFile);
swig.setDefaults({cache:false});

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.PORT, function(){
	console.log ('listening on ' + process.env.PORT);
});