const express = require('express');
const app = express();
var http = require('http'),
formidable = require('formidable'),
fs = require('fs'),
Zip = require('node-7z'),
path = require('path');
const categoryList = require('./categoryList');
const customLibrary = require('../library');
const db = require('../db/connection')

app.get('/', (request, response) => {
	response.send('Hello from Express!')
})

app.get('/getCatagories', (request, response) => {
	var parentId = customLibrary.getRequestParamValue(request, "parentId");

	categoryList.getList(response, parentId)

})

app.get('/getProductList', (request, response) => {
	response.send('printing productList')
})

app.get('/fetchReports', (request, response) => {
	
	
	db.execQuery("select * from automationrun", function(results){
	
		response.send({
		'success': 'true',
		data: results
	});
	});
})

app.post('/uploadResultData', function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		// `file` is the name of the <input> field of type `file`

		var old_path = files.file.path,
		file_size = files.file.size,
		file_ext = files.file.name.split('.').pop(),
		index = old_path.lastIndexOf('/') + 1,
		file_name = files.file.name.replace("."+file_ext, ""),
		newFileName = timestamp = new Date().getTime().toString(),
		new_path = path.join("E:/balraj/ReactJs/CompleteApp/uploads/");

		fs.readFile(old_path, function (err, data) {
			fs.writeFile(new_path+newFileName+"."+file_ext, data, function (err) {
				if (err) {
					res.status(200);
					res.json({
						'success': true,
						'result': 'unable to create file in mentioned path',
						'error': err
					});
				} else {
					var myTask = new Zip();
					myTask.extractFull(new_path+newFileName+"."+file_ext, new_path+'tmp/'+newFileName,{} )
					.progress(function (files) {
					  
					})
					.then(function () {
					  
					 customLibrary.processUploadedResults(new_path+'tmp/'+newFileName+'/'+file_name, res, req)
				
					 
					})
					.catch(function (err) {
					  console.log(err);
					});
					
					fs.unlink(old_path, function (err) {
						console.log("deleted temp file");
						
					});
					/*
					fs.unlink(old_path, function (err) {
						if (err) {
							res.status(500);
							res.json({
								'success': false,
								'result': 'something went wrong',
								'error': err
							});
						} else {
							res.status(200);
							res.json({
								'success': true,
								'result': 'file uploaded successfully',
								'error': ""
							});
						}
					});
					*/
				}
			});
		});
	});
});

const port = 5000;

app.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`server is listening on ${port}`)
})
