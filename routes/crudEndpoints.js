const {Router} = require('express');
const router = Router();

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'password',
  port: 5432,
})

router.get('/', async (req, res) => {
    try {
      const client = await pool.connect();
      const sortBy = req.query.sortBy || 'id';
      const sortOrder = req.query.sortOrder || 'ASC';
      const result = await client.query(`SELECT * FROM users ORDER BY ${sortBy} ${sortOrder}`);
      if (result.rowCount === 0) {
        res.status(404).send({ error: 'No users found' });
      } else {
        res.send(result.rows);
      }
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error fetching users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
      if (result.rowCount === 0) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.send(result.rows);
      }
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error fetching user' });
    }
});

router.post('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const { name, email } = req.body;
    const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    const newUser = result.rows;
    res.send(newUser);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error creating user' });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const client = await pool.connect();
      const { name, email } = req.body;
      const { id } = req.params;
      const result = await client.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      if (result.rowCount === 0) {
        res.status(404).send({ error: `User with id ${id} not found` });
      } else {
        const updatedUser = result.rows;
        res.send(updatedUser);
      }
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error updating user' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const client = await pool.connect();
      const { id } = req.params;
      const result = await client.query('DELETE FROM users WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).send({ error: `User with id ${id} not found` });
      } else {
        res.send({ message: `User with id ${id} deleted` });
      }
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error deleting user' });
    }
});

module.exports = router;