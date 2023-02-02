const User = require('../model.js');

const deleteUser = async (del_id) => {
    let res = {status : null};
    try{
        await User.deleteOne({id: del_id});
        res.status = 200;
    }
    catch(err){
        res.status = 500;
    }
    finally{
        return res;
    }
};

module.exports=deleteUser;