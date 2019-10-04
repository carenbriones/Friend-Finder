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
        // Defaults bestMatchDiff to 50 since 50 is the worst match score
        var bestMatchDiff = 50;

        for (var i = 0; i < users.length; i++) {
            var sum = 0;
            for (var j = 0; j < 10; j++) {
                sum += Math.abs(parseInt(newUser.scores[j] - parseInt(users[i].scores[j])));
            }

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