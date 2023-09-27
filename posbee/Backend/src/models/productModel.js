const { product } = require("../db/db");

module.exports = (sequelize, DataTypes, Model) => {
  class Product extends Model {}

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // hooks: {
      //   beforeValidate: (product, options) => {
      //     product.description = "happy";
      //   },
      //   afterValidate: (product, options) => {
      //     product.title = "Toni";
      //   },
      // },
      underscored:true,
      sequelize,
      modelName: "Product",
      paranoid: true,
      deletedAt: "soft_delete",
    }
  );

  // Product.addHook("beforeValidate", (product, options) => {
  //   product.title = "join";
  // });

  // Product.addHook("afterValidate", "someCustomName", (product, options) => {
  //   product.description = "subscribe"
  // });

  Product.beforeCreate(async (product, options) => {
    product.title = 'rocky'
  });
  
  Product.afterValidate('myHookAfter', (product, options) => {
    product.description  = 'diamond';
  });

  // Product.removeHook("afterValidate", "myHookAfter")
  // Product.removeHook()

  return Product;
};
