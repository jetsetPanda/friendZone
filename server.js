const express = require("express");

//EXPRESS.js CONFIG
const app = express();
const PORT = process.env.PORT || 8082;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + 'public'));
app.use('/scripts', express.static(__dirname + '/Scripts'));
//ROUTER 
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

//LISTENER
app.listen(PORT, function() {
    console.log(`You're being friendZoned on PORT: ${PORT}`);
});