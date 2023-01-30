const {Router} = require('express');
const router = Router();

const getUser = require('../postgres/queries/getUser');
const getAllUsers = require('../postgres/queries/getAllUsers');
const addUser = require('../postgres/queries/addUser');
const updateUser = require('../postgres/queries/updateUser');
const deleteUser = require('../postgres/queries/deleteUser');

router.get('/', async (req, res) => {
  const response = await getAllUsers(req);
  res.status(response.status).send(response.body);
});

router.get('/:id', async (req, res) => {
  const response = await getUser(req);
  res.status(response.status).send(response.body);
});

router.post('/', async (req, res) => {
  const response = await addUser(req);
  res.status(response.status).send(response.body);
});

router.put('/:id', async (req, res) => {
  const response = await updateUser(req);
  res.status(response.status).send(response.body);
});

router.delete('/:id', async (req, res) => {
  const response = await deleteUser(req);
  res.status(response.status).send(response.body);
});

module.exports = router;