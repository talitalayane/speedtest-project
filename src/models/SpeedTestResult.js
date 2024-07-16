const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const SpeedTestResult = sequelize.define('SpeedTestResult', {
  downloadSpeed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  uploadSpeed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ping: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

module.exports = SpeedTestResult;
