const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("permission", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
