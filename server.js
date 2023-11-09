const express = require("express");
const app = express();
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());


//login function
app.get('/',(req,res) => {
	res.render('login');
})

app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	//Change this to mongodb data
	if(username = '123'&& password == '123'){
		res.send('Check login')
	}
	else{
		res.render('Fail to login')
	}
})

//Create the server with port 8099
app.listen(8099);
