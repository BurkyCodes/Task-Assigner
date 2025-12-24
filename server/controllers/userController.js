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
        req.session.userId = user._id;

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


exports.checkSession = async (req, res) => {
  try {
    //console.log('Session check - Session data:', req.session)
    
    if (req.session && req.session.userId) {
      const user = await userModel.findById(req.session.userId).select('-password');
      
      if (user) {
        return res.status(200).json({
          success: true,
          message: 'Session is valid',
          user: {
            _id: user._id,
            username: user.username,
            email: user.email
          }
        });
      }
    }

    return res.status(200).json({
      success: false,
      message: 'No active session'
    });
    
  } catch (error) {
    console.error('Session check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.logout = (req, res) => {
  if (req.session) {
    delete req.session.userId; 
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }
      res.clearCookie('task-manager-session', { path: '/' });
      return res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  } else {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
};



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