var mysql = require('mysql');
var connected = false;
var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'automation'
	});

con.connect(function (err) {
	if (err)
		throw err;
	console.log("connected to database");
	connected = true;

});
function executeQuery(myQuery, cb) {
	if (connected) {
		con.query(myQuery, function (err, result) {
			if (err)
				throw err;
			cb(result);

		});
	}
}

function doInsert(data, table, cb) {
	if (connected) {
		//create insert statement
		//INSERT INTO posts SET ?
		var query = con.query("INSERT INTO "+table+" SET ?", data, function (err, result) {
			
			cb(result.insertId, err);
			

		});
		
		console.log(query.sql);
	}

}

module.exports.execQuery = executeQuery;
module.exports.doInsert= doInsert;