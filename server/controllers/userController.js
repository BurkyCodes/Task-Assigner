const { userModel } = require("../models/userModel");

exports.login = async (req, res) => {
    //console.log("Hit");
    try {
        const { userName, loginCode } = req.body;

        if (!userName || !loginCode) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required"
            });
        }
        const user = await userModel.findOne({ userName });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or code"
            });
        }
        //console.log("User found");

        if (user.loginCode !== loginCode) {
            //console.log("Code does not match");
            return res.status(401).json({
                success: false,
                message: "Invalid username or code"
            });
        }

        //creating a session 
        req.session.user = {
            id: user._id,
            userName: user.userName
        };

        req.session.cookie.maxAge = 24 * 60 * 60 * 1000;

        const userResponse = {
            _id: user._id,
            userName: user.userName
        };


        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userResponse
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getUsers = async(req,res) => {
    try {
        const users = await userModel.find({},
            {userName:1,_id:1}
        );

        return res.status(200).json({
            usersCount:users.length,
            users
        })
    } catch (error) {
        console.error("Error fetching users:",error);
        res.status(200).json({message:"Error fetching users"})
    }
}