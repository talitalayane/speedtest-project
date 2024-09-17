module.exports = (sequelize, DataTypes) => {
  const SpeedTestResult = sequelize.define('SpeedTestResult', {
    downloadSpeed: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    uploadSpeed: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ping: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  return SpeedTestResult;
};

