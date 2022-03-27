const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("role_permission", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  });
};
