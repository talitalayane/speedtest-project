const sequelize = require('../src/config');
const SpeedTestResult = require('../src/models/SpeedTestResult');
const Config = require('../src/models/Config');

const runMigrations = async () => {
  try {
    await sequelize.sync({ force: true }); // force: true recria as tabelas a cada execução
    console.log('Database synced');
    process.exit();
  } catch (err) {
    console.error('Error syncing database:', err);
    process.exit(1);
  }
};

runMigrations();
