var users = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(users);
    })

    app.post("/api/friends", function(req, res) {
        var newUser = req.body;

        // Finds the best match out of all users

        // Defaults bestMatch to first user
        var bestMatch = users[0];
        // Defaults bestMatchDiff to 40 since 40 is the worst match score
        var bestMatchDiff = 40;

        // Loops through each user 
        for (var i = 0; i < users.length; i++) {

            // Gets sum of absolute value of differences between answers
            var sum = 0;
            for (var j = 0; j < 10; j++) {
                sum += Math.abs(parseInt(newUser.scores[j] - parseInt(users[i].scores[j])));
            }

            // If the sum is lower than the best match difference, users[i] is the new best match
            if (sum < bestMatchDiff) {
                bestMatchDiff = sum;
                bestMatch = users[i];
            }
        }

        // Pushes newUser after bestMatch is found so newUser is not in list of users before test
        users.push(newUser);

        res.json(bestMatch);
    })
}