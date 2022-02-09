'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_car_res_info extends Model {
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
  tb_car_res_info.init({
    res_info_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    car_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    usr_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    car_res_date_start: DataTypes.DATE,
    car_res_date_end: DataTypes.DATE,
    res_res_check: DataTypes.ENUM('Y', 'N'),
    res_reg_dt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tb_car_res_info',
    freezeTableName: true, // don't use pluralized table name
  });
  return tb_car_res_info;
};