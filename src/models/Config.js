const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Config = sequelize.define('Config', {
  interval: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60, // Intervalo em minutos
  },
});

module.exports = Config;
