module.exports = (sequelize, DataTypes, Model) => {
  class Customer_Profile extends Model {}
  Customer_Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      selfGranted: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: "Customer_Profile", timestamps: false }
  );
  return Customer_Profile;
};
