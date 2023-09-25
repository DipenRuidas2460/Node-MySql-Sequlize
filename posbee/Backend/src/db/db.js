const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("service", "root", process.env.ROOT_PASSWORD, {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Mysql is Connected Successfully");
} catch (error) {
  console.log("Unable to Connect Databases", error.message);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel")(sequelize, DataTypes);
db.product = require("../models/productModel")(sequelize, DataTypes, Model);

db.userproduct = require("../models/userProduct")(
  sequelize,
  DataTypes,
  db.user,
  db.product
);

// db.user.hasOne(db.product, {foreignKey:'userId', as: "productDetails" });

// db.user.hasMany(db.product, {foreignKey:'userId', as: "productDetails" });
// db.product.belongsTo(db.user, {foreignKey:'userId', as: "userDetails" });

// db.user.belongsToMany(db.product, { through: 'UserProduct' });
// db.product.belongsToMany(db.user, { through: 'UserProduct' });

db.user.belongsToMany(db.product, { through: db.userproduct });
db.product.belongsToMany(db.user, { through: db.userproduct });

db.sequelize.sync({ force: false });

module.exports = db;
