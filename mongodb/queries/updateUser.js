const User = require('../model.js');

const updateUser = async (req) => {
    let res = {status : null};
    try{
        await User.updateOne({id: req.body.id}, {
            name: req.body.name,
            email: req.body.email
        });
        res.status = 200;
    }
    catch(err){
        res.status = 500;
    }
    finally{
        return res;
    }
};

module.exports=updateUser;