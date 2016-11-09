/**
 * Created by shahi_hackjack on 8/4/2016.
 */
 var bodyparser=require('body-parser');
var express=require('express');
var app=express();
var obj = require("./data.json");
var fs = require('fs'); 
var parse = require('csv-parse');

//console.log(obj);

app.use(express.static(__dirname +"/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/',function(req,res){

res.send('index.html');

});

var csvData=[];
fs.createReadStream('./data.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        //console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
      //console.log(typeof(csvData));
      //console.log(csvData[1][0]);
    });
    



app.post('/getdata',function(req,res) {
  var flag=0;
    console.log("i recievd a GET request");
       for(var i=0;i<1684;i++)
       {
       	console.log(csvData[i][0]);
       	if((req.body.name)==csvData[i][0])
       	{       flag=1;
       		var s = {name:csvData[i][0],open:csvData[i][2],high:csvData[i][3],low:csvData[i][4],close:csvData[i][5]};
       		    console.log(s);
       	    	console.log("done");
       	    	res.json(s);
       	    	break;
       	 // 	console.log(csvData[i][0]);
             
       	}
       }
        
        if(flag==0)
        {
        	console.log("STOCKNAMEDIDNTMATCH");
          
res.status(404).send("Oh uh, something went wrong");
        }
 
       // res.json(obj);
    });
app.listen(8080);
console.log("SERVER IS RUNNING on 8080");
