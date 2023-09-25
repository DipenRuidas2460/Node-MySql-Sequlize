module.exports = (sequelize, DataTypes, User, Product) => {
  const userProducts = sequelize.define("userproducts", {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
  },{
    timestamps:false
  });
  return userProducts;
};
