var pg = require('pg');
var pgurl = 'postgres://localhost/acme_db';
var client = new pg.Client(pgurl);

client.connect();

module.exports = client;