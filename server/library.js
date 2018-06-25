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
			db.doInsert(insertData, 'automationrun', function (automationId) {

				console.log("Called succss callback and last insert_id is    dsfsf dsfdsfdsf==> " + automationId);
				// insert into second table

				var suiteSummaryContextMetaDatas = data.suiteSummaryContextMetaDatas;
				for (var i = 0, secondLevledata; i < suiteSummaryContextMetaDatas.length; ++i) {
					var secondLevledata = suiteSummaryContextMetaDatas[i];
					var secondLevelData = {
						automationRunID: automationId,
						suiteName: secondLevledata.suiteName,
						startTime: secondLevledata.suiteStartTime,
						endTime: secondLevledata.suiteEndTime,

					}
					db.doInsert(secondLevelData, 'suiterun', function (suiteRunId) {

						fs.readdir(dir + "/" + secondLevledata.suiteName, function (err, files) {
							var suiteJsonFile = "";
							if (err) {

								console.log("error in reading directory");
								console.log(err);
							} else {

								for (var j = 0, file; j < files.length; ++j) {
									var file = files[j];
									var ext = file.split(".").pop();
									if (ext === "json" || ext === "JSON") {
										suiteJsonFile = file;
										break;
									}

								}
								var suiteJsonData = JSON.parse(fs.readFileSync(dir + "/" + secondLevledata.suiteName + "/" + suiteJsonFile, 'utf8')).suiteContextMetaData[0];

								
								console.log(suiteJsonData);
								
								var SuiteContextData = {
									suiteRunID: suiteRunId,
									testContextName: suiteJsonData[contextSummaryReportMetaDatas].contextName,
									startTime: suiteJsonData[contextSummaryReportMetaDatas].contextStartTime,
									endTime: suiteJsonData[contextSummaryReportMetaDatas].contextEndTime
								}

								
								db.doInsert(SuiteContextData, testcontext, function (testContextId) {
									
									var finalDatalib = suiteJsonData[contextDetailedReportMetaDatas].contextTestDetailedReportMetaDatas;
									console.log(finalDatalib[0]);
										for (var lastdatalib, k = 0; k < finalDatalib.length; ++k) {
											var lastdatalib = finalDatalib[k];
											var testContextDetailData = {
												testContextID: testContextId,
												testCaseName: lastdatalib.testName,
												status: lastdatalib.testStatus,
												isVerificationFailure: lastdatalib.verificationErrorsInTest ? 1 : 0,
												isDataProvider: 0,
												testCaseParameters: (lastdatalib.parametersMap != undefined) ? lastdatalib.parametersMap : null,
												testCasePath: lastdatalib.testCasePath,
												exception: lastdatalib.throwableErrorMessage != undefined ? lastdatalib.throwableErrorMessage : null,
												exceptionMessage: lastdatalib.throwableErrorMessage != undefined ? lastdatalib.throwableErrorMessage : null,
												startTime: lastdatalib.StartMillis,
												startTime: lastdatalib.endMillis

											}
											db.doInsert(testContextDetailData, testcontexttest, function (lastId) {

												console.log("hurray.... Everything got success");
												fs.unlink(dir, function (err) {
													console.log("deleted extracted file");
												})

											});

										}

								})

							}
						});

					})

				}

			});

		}
	});
}

module.exports.processUploadedResults = processUploadedResults;
module.exports.getCustomValue = getCustomValue;
module.exports.getRequestParamValue = getRequestParamValue;
