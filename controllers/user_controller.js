const { User } = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//luu refesh token
let refeshTokens = [];

const userController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //Saver to db
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    //GenderAccessToken 
    generAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            "secretkey", { expiresIn: "30s" }
        );
    },
    //GenderRefreshToken
    generRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            "secretkeyrefreshToken", { expiresIn: "365d" }
        )
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json("Wrong usernam !");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                res.status(404).json("Wrong password");
            }
            if (user && validPassword) {
                const accessToken = userController.generAccessToken(user);
                const refreshToken = userController.generRefreshToken(user);
                refeshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //GET ALL USER 
    getAllUser: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //DELETE USER 
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("Successnp");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //RequestRefeshToken
    requestRefeshToken: async (req, res) => {
        // Lấy refreshToken từ người dùng
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("Chưa có token");
        if (!refeshTokens.includes(refreshToken)) {
            return res.status(403).json("Token không phải của bạn");
        }
        jwt.verify(refreshToken, "secretkeyrefreshToken", (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json("Token không hợp lệ");
            }
            refeshTokens = refeshTokens.filter((token) => token !== refreshToken);
    
            const newAccessToken = userController.generAccessToken(user);
            const newRefreshToken = userController.generRefreshToken(user);
            refeshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken});
        });
    },

    userLogOut: async (req,res) => {
        res.clearCookie("refreshToken");
        refeshTokens = refeshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Log out success");
    }
    

}

module.exports = userController;
