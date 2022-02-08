'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_car extends Model {
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
  tb_car.init({
    car_seq: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    usr_seq: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    car_num: DataTypes.STRING(50),
    car_isValid: DataTypes.ENUM('Y', 'N'),
    car_rent_insurance_yn: DataTypes.ENUM('Y', 'N'),
    car_img: DataTypes.STRING(255),
    car_reg_dt: DataTypes.DATE,
    car_model: DataTypes.STRING(50),
    car_segment: DataTypes.STRING(50),
    car_fuel: DataTypes.STRING(50),
    car_rate: DataTypes.INTEGER,
    car_year: DataTypes.INTEGER,
    car_dy: DataTypes.DECIMAL(12, 9),
    car_dx: DataTypes.DECIMAL(12, 9),
    car_class: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'tb_car',
    freezeTableName: true, // don't use pluralized table name
  });
  return tb_car;
};