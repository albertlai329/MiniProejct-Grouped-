const express = require('express');
const app = express();
const fs = require('fs');
const formidable = require('formidable');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const mongourl = 'mongodb+srv://albert:albertlai@s12117948-nxlom.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'Project';
app.set('view engine', 'ejs');

var restaurant = {
      name : ' ' ,
      borough : '',
      cuisine : '', 
      street : '',
      building : '',
      zipcode : '',
      latitude : '',
      longitude : '',
      owner : '' ,
//	photo: ''
};

var user = {
      name : ' ' ,
      password : '',
};




app.get('/', function(req,res) {
    res.render('login');
});


app.get('/createac', function(req,res) {
    res.render('createac');
});

app.get('/upload',(req,res) => {
    res.render('upload');
});

app.get('/rate',(req,res) => {
    res.render('rate');
});

app.get('/update',(req,res) => {
    res.render('update');
});


app.get('/delete',(req,res) => {
    res.render('delete');
});


//get the list page

app.get('/list',(req,res) => {
 const client = new MongoClient(mongourl);
       client.connect((err) => {
       assert.equal(null,err);
       console.log("Connected successfully to mongodb server");
       const db = client.db(dbName);
         let cursor = db.collection('restaurant').find({});
         cursor.toArray((err,doc) => {
         console.log(`No. of document to render : ${doc.length}`)
         res.render('list', {restaurant : doc});         
   });
  });
});


app.get('/upload',(req,res) => {
    res.render('upload');
});


//create restaurant documents
app.post('/upload', function(req,res){
       var form = new formidable.IncomingForm();
        form.parse(req,(err,fields,files) => {
        console.log(fields.name);
        restaurant.name = fields.name;
        restaurant.borough = fields.borough;
        restaurant.cuisine = fields.cuisine;
        restaurant.street = fields.street;
        restaurant.building = fields.building;
        restaurant.zipcode = fields.zipcode;
        restaurant.latitude = fields.latitute;
        restaurant.longitude = fields.longitude;
        restaurant.owner = fields.owner;
    //restaurant.photo = fs.readFile(files.filetoupload.path);
	//	const img =  fs.readFile(files.filetoupload.path);
    //   const format = img.toString('base64');

        const client = new MongoClient(mongourl);
        client.connect((err) => {
            assert.equal(null,err);
            console.log("Connected successfully to mongodb server");
            const db = client.db(dbName);
            db.collection('restaurant').insertOne(restaurant,(err, result) => {
                assert.equal(err, null);
                console.log("1 document inserted.");
                client.close();
            });
        });
    });
   res.render('restaurant?_id="restaurant[i].ObjectId"');
});


app.get('restaurant', (rq,res) => {
   res.render('restaurant');
});

//Display the restaurant record
app.post('/restaurant',(req,res) => {
     const client = new MongoClient(mongourl);
     client.connect((err) => {
     assert.equal(null.err);
     console.log("Connected successfully to mongodb server");
     const db = client.db(dbName);
     let cursor = db.collection('restaurant').find({'_id' : "restaurant[i].ObjectId"});
         if (req.headers.accept == 'application/json'){    
         res.json(cursor);
         } else { 
         cursor.toArray((err,doc) => {
         console.log(`No. of document to render : ${doc.length}`)
         console.log(req.headers.accept);
         res.render('restaurant?_id="restaurant[i].ObjectId"', {restaurant : doc});         
    });
   }
 });
});   


//Create user Account
app.post('/createac', function(req,res){
   var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        console.log(fields.name);
        user.name = fields.name;
        user.password = fields.password;
        const client = new MongoClient(mongourl);
        client.connect((err) => {
            assert.equal(null,err);
            console.log("Connected successfully to mongodb server");
            const db = client.db(dbName);
            db.collection('user').insertOne(user,(err, result) => {
                assert.equal(err, null);
                console.log("1 document inserted.");
                client.close();
            });
        });
    });
   res.redirect('/');
});

//Delete Restaurant record
app.post('/delete', (req,res) => {
let obj = {};
try {
	obj = JSON.parse();
}
catch(err){
	console.log('Invalid');
}
	const client = new MongoClient(mongourl);
	client.connect((err) => {
	try{
		assert.equal(null,error)
	}
	catch(err){
		console.log("Invalid");
	}
	const db = client.db(dbName);
	db.collection('albert').delete(({_id: ObjectId(_id)}),(err,result) => {
		console.log(result);
		
	});
	});
 res.redirect('/delete');

});


//Update restaurant record
app.post('/update', function (req, res) {
var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        console.log(fields.name);
        restaurant.name = fields.name;
        restaurant.borough = fields.borough;       
        restaurant.cuisine = fields.cuisine;
        restaurant.street = fields.street;
        restaurant.zipcode = fields.zipcode;
        restaurant.latitude = fields.latitude;
        restaurant.longitude = fields.longitude;
        restaurant.owner = fields.owner;
	const client = new MongoClient(mongourl);  
 db.collection('albert').findOneAndUpdate({"_id": ObjectId(fields._id)}, req.body, {new: true}, function (err, doc) {
  /*db.collection('albert').updateOne(
  {"_id": ObjectId(},
  {$set:  { 	restaurant.name = fields.name,
              	restaurant.borough = fields.borough ,      
        	"cuisine" = fields.cuisine,
       		"street" = fields.street,
       		"zipcode" = fields.zipcode,
       		"latitude" = fields.latitude,
        	"longitude " = fields.longitude,
        	"owner " = fields.owner}}*/
    
 	assert.equal(err, null);
                console.log("1 document updated.");
                client.close();
            });
       });
  res.redirect('/list');
  });

//Rate the restaurant
app.post('/rate', function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        console.log(fields.name);
        
		rate.score = fields.score;
        rate.restaurantName = restaurant.name;       
        rate.owner = restaurant.owner;
       
	const client = new MongoClient(mongourl);
        client.connect((err) => {
            assert.equal(null,err);
            console.log("Connected successfully to mongodb server");
            const db = client.db(dbName);
            db.collection('albert').insertOne(rate,(err, result) => {
                assert.equal(err, null);
                console.log("1 document updated.");
                client.close();
            });
        });
    });
  res.redirect('/list');
});

//listen to the localhost 
app.listen(process.env.PORT || 8099);
