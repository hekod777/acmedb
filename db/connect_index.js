var pg = require('pg');
var pgurl = 'postgres://localhost/tsql';
var client = new pg.Client(pgurl);

client.connect();

module.exports = client;