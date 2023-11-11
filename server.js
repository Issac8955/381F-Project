//Define constant for the application
const express = require("express");
const app = express();
const assert = require('assert');
const session = require('cookie-session');
const bodyParser = require('body-parser')
const MongoClient =require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const formidable = require('express-formidable');
const mongourl = ''
;
const dbName = 'Project';


app.set('view engine', 'ejs');


//Authenication
const SECRETKEY = '381F-Project';

const users = new Array(
	{name: 'Issac', password: 'Issac'},
	{name: 'Sam', password:'Sam'},
	{name: 'guest', password: 'guest'}
);

var document = {}

app.use(session({
  name: 'loginSession',
  keys: [SECRETKEY]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Redirect to Login Page (Not Logging in)/ Main Page (Logging in)
app.get('/', (req,res) => {
	console.log(req.session);
	if (!req.session.authenticated) {    
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
			
			req.session.authenticated = true;        // 'authenticated': true
			req.session.username = req.body.username;
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
	req.session = null;   // clear cookie
	res.redirect('/');
});

// Render to Create Page
app.get('/create',(req, res) =>{
	res.status(200).render("create")
}); 

// Create 
// Create Function
const createDocument = (db, createDoc, callback) => {
    db.collection('Inventory').insertOne(createDoc, (error, results) => {
        if (error) throw error;
        console.log(results);
        callback();
    });
};

app.post('/create', (req, res) => {
    console.log("User entered create page");
    const client = new MongoClient(mongourl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to MongoDB.");
        const db = client.db(dbName);

        const document = {	
            inv_id: req.body.id,
            inv_name: req.body.inv_name,
            inv_type: req.body.type,
            quantity: req.body.quantity
        };

        // Check all the fields of the form are filled in
            console.log("OK for creating a new document");
            createDocument(db, document, () => {
                console.log("Created new document successfully");
                client.close();
                console.log("Closed DB connection");
                res.status(200).render('main', {name:req.session.username});
            });

    });
});




//Create the server with port 8099
app.listen(8099);
