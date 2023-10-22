"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sprite }) {
      this.hasMany(Sprite, { foreignKey: "game_id" });
    }
  }
  Game.init(
    {
      name: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
