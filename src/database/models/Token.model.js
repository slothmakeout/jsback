const Sequelize = require("sequelize");
const { sequelize } = require("../database");
const { nanoid } = require("nanoid");
class Token extends Sequelize.Model {}

Token.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
    },
    value: {
      type: Sequelize.STRING,
      defaultValue: nanoid(),
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    modelName: "token",
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Token;
