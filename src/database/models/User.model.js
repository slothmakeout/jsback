const Sequelize = require("sequelize");
const { sequelize } = require("../database");
const ToDo = require("./ToDo.model");
const Token = require("./Token.model");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID,
      primaryKey: true,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
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
