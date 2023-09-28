const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("service", "root", process.env.ROOT_PASSWORD, {
  host: "localhost",
  logging: false,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Mysql is Connected Successfully");
} catch (error) {
  console.log("Unable to Connect Databases", error.message);
}

const db = {};
db.sequelize = sequelize;

db.user = require("../models/userModel")(sequelize, DataTypes);
db.product = require("../models/productModel")(sequelize, DataTypes, Model);
db.education = require("../models/education")(sequelize, DataTypes, Model);
db.customer = require("../models/customer")(sequelize, DataTypes);
db.profile = require("../models/profile")(sequelize, DataTypes);
db.image = require("../models/imageModel")(sequelize, DataTypes, Model);
db.video = require("../models/videoModel")(sequelize, DataTypes, Model);
db.comment = require("../models/commentModel")(sequelize, DataTypes, Model);
db.tag = require("../models/tagModel")(sequelize, DataTypes, Model);
db.tagTaggable = require("../models/tag_taggable")(sequelize, DataTypes, Model);
db.customer_profile = require("../models/customer_profile")(
  sequelize,
  DataTypes,
  Model
);
db.userProduct = require("../models/userProduct")(
  sequelize,
  DataTypes,
  db.user,
  db.product
);

// const Customer_Profile = sequelize.define(
//   "Customer_Profile",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     selfGranted: DataTypes.BOOLEAN,
//   },
//   { timestamps: false }
// );


// Two One-to-many is equal to one many-to-many

// const Grant = sequelize.define(
//   "grant",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     selfGranted: DataTypes.BOOLEAN,
//   },
//   { timestamps: false }
// );

db.player = sequelize.define("Player", { username: DataTypes.STRING });
db.team = sequelize.define("Team", { name: DataTypes.STRING });
db.game = sequelize.define("Game", { name: DataTypes.STRING });

// Super Many-to-Many relationship between Game and Team (gameTeam model)
db.gameTeam = sequelize.define("GameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

// Super Many-to-Many relationship between Player and GameTeam
db.playerGameTeam = sequelize.define("PlayerGameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

db.post = sequelize.define(
  "post",
  {
    content: DataTypes.STRING,
  },
  { timestamps: false }
);

db.reaction = sequelize.define(
  "reaction",
  {
    type: DataTypes.STRING,
  },
  { timestamps: false }
);

// db.user.hasOne(db.product, {foreignKey:'userId', as: "productDetails" });

db.user.hasMany(db.product);
db.newProductUser = db.product.belongsTo(db.user);

// db.user.belongsToMany(db.product, { through: 'db.userProduct' });
// db.product.belongsToMany(db.user, { through: 'db.userProduct' });

db.customer.belongsToMany(db.profile, { through: db.customer_profile });
db.profile.belongsToMany(db.customer, { through: db.customer_profile });

// db.grant = Grant

// db.customer.hasMany(db.grant);
// db.grant.belongsTo(db.customer);

// db.profile.hasMany(db.grant);
// db.grant.belongsTo(db.profile);

//  many-to-many relationship
db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });

// using two-one-to-many relationship can create many-to-many relationship
db.game.hasMany(db.gameTeam);
db.gameTeam.belongsTo(db.game);

db.team.hasMany(db.gameTeam);
db.gameTeam.belongsTo(db.team);

db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });

db.player.hasMany(db.playerGameTeam);
db.playerGameTeam.belongsTo(db.player);

db.gameTeam.hasMany(db.playerGameTeam);
db.playerGameTeam.belongsTo(db.gameTeam);

db.user.hasMany(db.product, { foreignKey: "userId" });
db.productuser = db.product.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

db.product.hasMany(db.education, { foreignKey: "productId" });
db.education.belongsTo(db.product, { foreignKey: "productId" });

// db.user.belongsToMany(db.product, { through: db.userproduct });
// db.product.belongsToMany(db.user, { through: db.userproduct });

// Polymorphic Associations:--
db.image.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "image",
  },
});

db.comment.belongsTo(db.image, {
  foreignKey: "commentableId",
  constraints: false,
});

db.video.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "video",
  },
});

db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constraints: false,
});

db.image.belongsToMany(db.tag, {
  through: {
    model: db.tagTaggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

db.tag.belongsToMany(db.image, {
  through: {
    model: db.tagTaggable,
    unique: false,
  },
  foreignKey: "tagId",
  constraints: false,
});

db.video.belongsToMany(db.tag, {
  through: {
    model: db.tagTaggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

db.tag.belongsToMany(db.video, {
  through: {
    model: db.tagTaggable,
    unique: false,
  },
  foreignKey: "tagId",
  constraints: false,
});

db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post);

db.sequelize.sync({ force: false });

module.exports = db;
