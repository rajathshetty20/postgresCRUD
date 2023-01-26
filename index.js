const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const crudEndpoints = require('./routes/crudEndpoints');
app.use('/api/users', crudEndpoints);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});