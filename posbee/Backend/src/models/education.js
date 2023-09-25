module.exports = (sequelize, DataTypes, Model) => {
  class Education extends Model {}

  Education.init(
    {
      className: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
      },
      passingYear: {
        type: DataTypes.INTEGER,
      },
      //   userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Education",
      paranoid: true,
      deletedAt: "soft_delete",
    }
  );

  return Education;
};
