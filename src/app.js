const express = require('express');
const sequelize = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Teste de conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));


//endpoint teste
app.get('/test-db', async (req, res) => {
    try {
      const result = await sequelize.query('SELECT name FROM sqlite_master WHERE type="table";');
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });