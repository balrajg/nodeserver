const db= require('../db/connection');
function getList(response,parentId){
	db.execQuery("select * from category", function(results){
		response.json(results);
	});
}

module.exports.getList= getList;