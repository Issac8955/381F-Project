const express = require("express");
const app = express();
const session = require('cookie-session');
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');


//Authenication
const SECRETKEY = '381F-Project';

const users = new Array(
	{name: 'Issac', password: 'Issac'},
	{name: 'Sam', password:'Sam'},
	{name: 'guest', password: 'guest'}
);

app.use(session({
  name: 'loginSession',
  keys: [SECRETKEY]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Redirect to Login Page (Not Logging in)/ Main Page (Logging in)
app.get('/', (req,res) => {
	console.log(req.session);
	if (!req.session.authenticated) {    // user not logged in!
		res.redirect('/login');
	} else {
		res.status(200).render('main',{name:req.session.username});
	}
});

// Load Login page
app.get('/login', (req,res) => {
	res.status(200).render('login',{});
});

//login function

app.post('/login', (req,res) => {
	var username = req.body.username;
	var password = req.body.password;
	users.forEach((user) => {
		if (user.name == username && user.password == password) {
			// correct user name + password
			// store the following name/value pairs in cookie session
			req.session.authenticated = true;        // 'authenticated': true
			req.session.username = req.body.username;// 'username': req.body.name
		}
	});
	res.redirect('/');
});

// Load Main Page
app.get('/main',(req, res) => {
	console.log("Enter Main Page Successfully")
});

// Logout function
app.get('/logout', (req,res) => {
	req.session = null;   // clear cookie-session
	res.redirect('/');
});


//Create the server with port 8099
app.listen(8099);
