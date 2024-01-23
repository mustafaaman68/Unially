const express = require("express")
const mongoose = require("mongoose")
const path = require("path");
const fetch = require("node-fetch")         // use for scrapping html
var cheerio = require("cheerio");
var fs = require("fs");

const app = express()
const port = 80
var url;
mongoose.connect('mongodb://127.0.0.1/Unially',{useNewUrlParser:true,useUnifiedTopology:true});

var user = new mongoose.Schema({
    users_name: String,
    users_email: String,
    users_college: String,
    users_password: String,
    users_confirmPassword: String
});


var user_model = mongoose.model('data',user);


app.use('/css',express.static('css'));        // adding css and js files
app.use(express.urlencoded({extended: true}));

app.use('/js',express.static('js'));        // adding js files
app.use(express.urlencoded({extended: true}));

app.use('/fonts',express.static('fonts'));        // adding fonts files
app.use(express.urlencoded({extended: true}));

app.use('/img',express.static('img'));        // adding img files
app.use(express.urlencoded({extended: true}));



//adding html
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/Colleges',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Colleges.html'));
});

app.get('/compare',(req,res)=>{
    res.sendFile(path.join(__dirname,'/compare.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/login.html'));
});

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'/signup.html'));
});

app.get('/user_dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,'/user_dashboard.html'));
});



// fetching data from user and saving it to db
app.post('/signup',(req,res)=>{
    var myData =  new user_model(req.body);
    if(req.body.users_password!=req.body.users_confirmPassword){
        // setting time such that a given fuction should run after that specific mili seconds
        setTimeout(function () {
            // redirecting the page
            res.writeHead(301, { Location: "http://127.0.0.1/signup" });
            res.end();
            gethtml("http://127.0.0.1:80/login","http://127.0.0.1/index","index.html");
         }, 2000);
    }
    else{
        myData.save().then(()=>{
            setTimeout(function () {
                res.writeHead(301, { Location: "http://127.0.0.1/index" });
                res.end();
                gethtml("http://127.0.0.1:80/user_dashboard","http://127.0.0.1/index","index.html");
                gethtml("http://127.0.0.1:80/user_dashboard","http://127.0.0.1/Colleges","Colleges.html");
             }, 2000);
        }).catch(()=>{
            res.status(400).send("error occured");
        });
    }
});

app.post('/login',(req,res)=>{
    var email_string = req.body.email;
    var password_string = req.body.password;
    user_model.find({users_email: email_string,users_password: password_string}, function(err, data){
        if(err){
            console.log(err);
            return;
        }   
    
        if(data.length == 0) {
            fs.writeFile("check.txt", "false" , (err) => {
                if (err) console.log(err);
                setTimeout(function () {
                    // redirecting the page
                    res.writeHead(301, { Location: "http://127.0.0.1/login" });
                    res.end();
                    gethtml("http://127.0.0.1:80/login","http://127.0.0.1/index","index.html");

                }, 3000);
            });
            
            return;
        }
    
        // console.log(data[0].users_email);
        // console.log(data[0].users_password);

        fs.writeFile("check.txt", "true" , (err) => {               // writing in file
            if (err) console.log(err);
            setTimeout(function () {
                res.writeHead(301, { Location: "http://127.0.0.1/index" });
                res.end();
                gethtml("http://127.0.0.1:80/user_dashboard","http://127.0.0.1/index","index.html");
                gethtml("http://127.0.0.1:80/user_dashboard","http://127.0.0.1/Colleges","Colleges.html");
             }, 3000);
        });

        return;

    });
});


// setting up logout on user_dashboard
app.post('/user_dashboard',(req,res)=>{
    setTimeout(function () {
        res.writeHead(301, { Location: "http://127.0.0.1/login" });
        res.end();
        gethtml("http://127.0.0.1:80/login","http://127.0.0.1/index","index.html");
        gethtml("http://127.0.0.1:80/login","http://127.0.0.1/Colleges","Colleges.html");
    }, 3000);
});



// used to send node.js variable to other js file
app.get('/getMyVariable', function(req, res) { 
    fs.readFile("check.txt",(err,data)=>{
        if(err) console.log(err);
        res.send(data.toString()); 
    });
}); 


// funtion to get html i.e, scrapping html from given link
const gethtml = async (url,link,file) => {
    const response = await fetch(link);
    const body = await response.text();
    const $ = cheerio.load(body);
    $("a").each(function () {
        var id = $(this).attr("id");
        if (id == "anchor_login") {
            $(this).attr("href", url);
        }
        fs.writeFile(file, $.html(), (err) => {
            if (err) console.log(err);
            // console.log("Successfully Written to File.");
        });
    });
    return body;
};



// server
app.listen(port);
console.log('Server started at http://127.0.0.1:' + port);

