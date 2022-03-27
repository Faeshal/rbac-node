require("dotenv").config();
const { Sequelize } = require("sequelize");

// * Connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    logging: false,
  }
);

// * Define All Model
const modelDefiners = [
  require("./City"),
  require("./User"),
  require("./Role"),
  require("./Permission"),
  require("./Role_Permission"),
];
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// * Relation
const User = sequelize.models.user;
const Role = sequelize.models.role;
const Permission = sequelize.models.permission;
const Role_Permission = sequelize.models.role_permission;

// * User & Role
Role.hasOne(User);
User.belongsTo(Role);

// * Role_Permission & Role
Role.hasMany(Role_Permission);
Role_Permission.belongsTo(Role);

// * Role_Permission & Permisson
Permission.hasMany(Role_Permission);
Role_Permission.belongsTo(Permission);

module.exports = sequelize;
