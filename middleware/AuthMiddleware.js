const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json({error: "User not logged in!"});
    }
    else{
        try{
            const validToken = verify(accessToken, "important secret");

            if(validToken){
                return next();
            }
        }
        catch (err){
            res.json({error: err});
        }
    }
}

module.exports = { validateToken };