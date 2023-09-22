module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("firstName");
          return rawValue ? 'Mr.' + rawValue.toUpperCase() : null;
        },
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "Singh",
      },
    },
    {
      // tableName:"users",
      // timestamps:false
      // createdAt:false,
      // updatedAt:true
    }
  );
  return User;
};
