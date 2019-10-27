const express = require("express");
const bodyParser = require('body-parser');
const app = express();



app.use(express.static('./tablet'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));







app.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin',"http://localhost:3001");
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cache-control, authorization, Authorization');
    res.sendFile(__dirname + "/tablet/table_user_list.html")
})

app.listen(4040, function () {
    console.log(`listening on port ${4040}`)
})