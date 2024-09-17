module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    interval: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Config;
};
