const User = require('../model.js');

const addUser = async (req) => {
    let res = {status : null};
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
    });
    try{
        await user.save();
        res.status = 200;
    }
    catch(err){
        res.status = 500;
    }
    finally{
        return res;
    }
};

module.exports=addUser;