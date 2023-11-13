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
const mongourl = '';
const dbName = 'Project';

app.set('view engine', 'ejs');
app.set('views','./views');
app.set('views', __dirname + '/views');
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
app.get('/', async (req,res) => {
	console.log(req.session);
	if (!req.session.authenticated) {    
		res.redirect('/login');
	} else {
        var dataSet = new Array();
        const client = new MongoClient(mongourl);
        await client.connect();
        const db = client.db(dbName);
        //res.render('main',{name:req.session.username});
        //read data
        const data = db.collection("Inventory").find();
        /*
         data.forEach(element => {
            dataSet = {
                inv_id: element.inv_id,
                inv_name: element.inv_name,
                inv_type: element.inv_type,
                quantity: element.quantity
            };
            return dataSet;
        });*/
        //Check if data has been selected or not


        await data.forEach((element) =>{
            dataSet.push(element);
        });

        //Check the whole array
        console.log({dataSet:dataSet});
        res.status(200).render('main',{dataSet,name:req.session.username},);
        //res.status(200).render('main',{name:req.session.username},);
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
