const {Router} = require('express');
const router = Router();

const getUser = require('../postgres/queries/getUser');
const getAllUsers = require('../postgres/queries/getAllUsers');
const addUser = require('../postgres/queries/addUser');
const updateUser = require('../postgres/queries/updateUser');
const deleteUser = require('../postgres/queries/deleteUser');

const addUserMD = require('../mongodb/queries/addUser');
const deleteUserMD = require('../mongodb/queries/deleteUser');
const updateUserMD = require('../mongodb/queries/updateUser');

const redisClient = require('../redis/redisClient');

router.get('/', async (req, res) => {
  const response = await getAllUsers(req);
  res.status(response.status).send(response.body);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const value = await redisClient.get(id);
  if(value){
    console.log("sent from cache");
    res.send(JSON.parse(value));
  }
  else{
    const response = await getUser(req);
    console.log("sent from db");
    res.status(response.status).send(response.body);
    if(response.status==200){
      redisClient.set(id, JSON.stringify(response.body));
    }
  }
});

router.post('/', async (req, res) => {
  const response = await addUser(req);
  const id = String(response.body.id);
  res.status(response.status).send(response.body);
  if(response.status==200){
    redisClient.set(id, JSON.stringify(response.body));
    addUserMD(response); 
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await updateUser(req);
  res.status(response.status).send(response.body);
  if(response.status==200){
    redisClient.set(id, JSON.stringify(response.body));
    updateUserMD(response);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await deleteUser(req);
  res.status(response.status).send(response.body);
  if(response.status==200){
    redisClient.del(id);
    deleteUserMD(id);
  }
});

module.exports = router;