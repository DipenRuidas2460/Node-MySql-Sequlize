module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: {
            msg: "Only Alphabets are allowed!",
          },
          isLowercase: true,
          len: [2, 10],
        },
        get() {
          const rawValue = this.getDataValue("firstName");
          return rawValue ? "Mr." + rawValue.toUpperCase() : null;
        },
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "Singh",
        set(value) {
          this.setDataValue("lastName", value + ", Indian");
        },
      },

      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
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
