// Linking routes to 'data' source containing the friend survey results array
const friendData = require("../data/friends");
// Routing

module.exports = function(app) {

    // API GET route to display JSON of all friend objects in array
    app.get("/api/friends", function(req, res) {
        console.log(`the req is: ${req}`);
        console.log(`GET API`);
        // console.log('here ', friendData)
        res.json(friendData);
    });

    // API POST route to handle survey results and friendZoning logic
    app.post("/api/friends", function(req, res) {
        console.log('POSTING API....... ');
        friendData.push(req.body);
        res.json(friendData);
    });

};