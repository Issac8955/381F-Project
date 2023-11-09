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
		//change this to main.ejs
		res.send('Check login')
	}
	else{
		//change this to main.ejs
		res.send('Fail to login')
	}
})

//Create the server with port 8099
app.listen(8099);
