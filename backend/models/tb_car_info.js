'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_car_info extends Model {
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
  tb_car_info.init({
    car_res_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    owner_usr_seq: {
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
    res_date_start: DataTypes.DATE,
    res_date_end: DataTypes.DATE,
    res_realtime: DataTypes.STRING(255),
    res_rate: DataTypes.BIGINT,
    res_img: DataTypes.STRING(255),
    res_check: DataTypes.STRING(200),
    res_pay_valid: DataTypes.ENUM('Y', 'N'),
    res_end_valid: DataTypes.ENUM('Y', 'N'),
    res_drive_valid: DataTypes.ENUM('Y', 'N'),
    res_door_on: DataTypes.ENUM('Y', 'N')
  }, {
    sequelize,
    modelName: 'tb_car_info',
    freezeTableName: true, // don't use pluralized table name
  });
  return tb_car_info;
};