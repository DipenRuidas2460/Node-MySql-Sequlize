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
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      paranoid: true,
      deletedAt: "soft_delete",
    }
  );

  return Product;
};
