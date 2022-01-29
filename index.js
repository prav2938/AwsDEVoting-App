var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const AWS = require('aws-sdk')

AWS.config.update({
	region: 'ap-south-1',
	accessKeyId: 'AKIAXLEHTWOZVJMZ3FXK',
	secretAccessKey: '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'


})

var urlencodedParser = bodyParser.urlencoded({extended:false})

app.get('/', function (req, res) {
   res.sendFile(__dirname + "/views/html/homePage.html");
})

app.post('/process_vote',urlencodedParser, function(req,res){
	
	response = {
		voterid : Math.round(Math.random()*10000),
		choice: req.body.CloudName};
	
	
 const kinesisClient =  new AWS.Kinesis()
 const KINESIS_STREAM_NAME = 'voting-app'

kinesisClient.putRecord(
      {
	Data: JSON.stringify(response),
	StreamName: KINESIS_STREAM_NAME,
	PartitionKey: '1'      
      }
	,

	(err,data) => {

		if(err) {
		throw err
		}
		console.log(data)
		res.sendFile(__dirname+"/views/html/sucessPage.html")
	})

	

})

var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
