const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const blog = require('./server/routes/api');
const users = require('./server/routes/users');


const port = 3000;

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use('/blog',blog);

app.use('/users',users);


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'dist/Blog/index.html'));
});


app.listen(port, function(){
    console.log("Server Running on localhost: " + port);
});

