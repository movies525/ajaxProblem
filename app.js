var host = process.env.IP;
var port = process.env.PORT;
var express = require("express");
var app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host : "127.0.0.1" ,
  user : 'root',
  password : "",
  database : "mvc"
});
connection.connect(function(error){
  if(!!error){
      console.log("error");
  } else{
      console.log("connected");
  }
});






var bodyParser = require("body-parser");
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false}));
app.use( express.static("public"));

app.set('view engine','ejs');
app.set('views',__dirname + '/view');
app.engine('html',require('ejs').renderFile);


app.listen(port, host);
console.log('sever is running....');


app.get('/',function(request,response){
    response.send("Homepage");
});

app.get('/api/testQuery',function(request,response){
    response.send(request.query.id);
});

app.get("/:controllerName",function(request,response){
    var controllName = request.params.controllerName;
    var moduleName = "./controller/"+ controllName +'.js';
    var controllerClass = require(moduleName);
    var controller = new controllerClass(request,response);
    controller.index();
});
app.get('/:controllerName/:actionName',function(request,response){
    var controllName = request.params.controllerName;
    var moduleName = "./controller/" + controllName + ".js";
    var controllerClass = require(moduleName);
    var controller = new controllerClass(request,response);
    
    var actionName = request.params.actionName;
    controller[actionName]();
});

    //  response.send('userName:' + request.body.userName +',password:'+ request.body.password);
app.post('/api/testPost',function(request,response){
        
    connection.query('select * from member where UserName =?', [request.body.userName],function(error,rows,field){
        if(!!error){
            console.log("error in query");
        } else{
            console.log("success");
            if(rows.length == 0){
                console.log("no find");
            } else{
                console.log(rows);
                response.send(JSON.stringify(rows));
            }
        }
    });
    
});


