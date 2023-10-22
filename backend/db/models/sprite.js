"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sprite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game }) {
      this.belongsTo(Game, { foreignKey: "game_id" });
    }
  }
  Sprite.init(
    {
      name: {
        type: DataTypes.TEXT,
      },
      game_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Games",
          key: "id",
        },
      },
      data: {
        type: DataTypes.TEXT
      },
    },
    {
      sequelize,
      modelName: "Sprite",
    }
  );
  return Sprite;
};
