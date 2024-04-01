const jwt = require("jsonwebtoken");

const middlewareController = {

    // Verify TOKEN
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, "secretkey", (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                } else {
                    req.user = user;
                    next();
                }
            });
        }
        else {
            res.status(401).json("User is not authenticated");
        }
    },

    //verifyTokenAndAmin
    verifyTokenAndAmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json("You not allowed to delete other");
            }
        });
    }

}

module.exports = middlewareController;
