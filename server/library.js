var url = require('url');
var fs = require('fs');
const db = require('./db/connection')

function getRequestParamValue(request, key) {
	var params = url.parse(request.url, true).query;
	var value = params[key] != undefined ? params[key] : null;
	return value;

}

function getCustomValue(abcd) {
	return abcd;

}

function processUploadedResults(dir, res, req) {
	fs.readdir(dir, function (err, files) {
		var jsonFile = "";
		if (err) {

			console.log("error in reading directory");
			console.log(err);
		} else {

			for (var i = 0, file; file = files[i]; ++i) {
				var ext = file.split(".").pop();
				if (ext === "json" || ext === "JSON") {
					jsonFile = file;
					break;
				}

			}

			var data = JSON.parse(fs.readFileSync(dir + "/" + jsonFile, 'utf8'));

			var buildVar = data.matrixBuildVersion;

			var insertData = {

				executionType: 1,
				browser: data.browserName,
				browserVersion: data.browserVersion,
				mainRelease: buildVar.substring(0, buildVar.indexOf(".", 3)),
				patchRelease: buildVar.substring(5, 6),
				sprintRelease: buildVar.substring(7, 9),
				buildVersion: buildVar.substring(buildVar.lastIndexOf(".") + 1, buildVar.indexOf("-")),
				build: buildVar,
				primeTestDriverVersion: data.releaseVersion,
				applicationUrl: data.applicationUrl,
				startTime: data.startTimeOfSuites,
				endTime: data.endTimeOfSuites,
				product: data.productName,
				platform: data.platform,

			};

			//INSERT INTO posts SET ?
			db.doInsert(insertData, 'automationrun', function (last_insert_id) {

				console.log("Called succss callback and last insert_id is    dsfsf dsfdsfdsf==> +" last_insert_id );
			});

		}
	});
}

module.exports.processUploadedResults = processUploadedResults;
module.exports.getCustomValue = getCustomValue;
module.exports.getRequestParamValue = getRequestParamValue;
