const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("role", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
