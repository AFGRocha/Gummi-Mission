var express = require('express')
var path = require('path')
var app = express();


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'html')));

//app.use('/css', express.static(__dirname + '/style.css'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Gummi-Mission.html');
    //It will find and locate index.html from View or Scripts
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Game running on port 3000!')
})