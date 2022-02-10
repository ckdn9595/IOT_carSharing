'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_car_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.user.hasMany(models.room, {foreignKey:"user_id"})
    }
  };
  tb_car_review.init({
    rev_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    car_res_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    owner_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    usr_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    res_info_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    car_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    chat_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    rev_content: DataTypes.STRING(255),
    rev_rate: DataTypes.STRING(255),
    rev_img: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'tb_car_review',
    freezeTableName: true, // don't use pluralized table name
  });
  return tb_car_review;
};