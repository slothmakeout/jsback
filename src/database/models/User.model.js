const Sequelize = require("sequelize");
const { sequelize } = require("..");
const ToDo = require("./ToDo.model");
const Token = require("./Token.model");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    modelName: "user",
    timestamps: false,
    freezeTableName: true
  }
);

User.hasMany(ToDo);
User.hasMany(Token);

Token.belongsTo(User, {
  foreignKey: "userId",
});

ToDo.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;
