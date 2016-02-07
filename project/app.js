var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static('Webpage'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve the project folder.
});

app.listen(3000);

console.log("Server launched at port : 3000");
