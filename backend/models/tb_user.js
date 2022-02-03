'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_user extends Model {
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
  tb_user.init({
    usr_id: DataTypes.STRING,
    usr_pwd: DataTypes.STRING,
    usr_name: DataTypes.STRING,
    usr_gender: DataTypes.STRING,
    usr_birth_day: DataTypes.STRING,
    usr_phone: DataTypes.STRING,
    usr_dri_insurance_yn: DataTypes.BOOLEAN,
    usr_ps_info_proc_agmt_yn: DataTypes.BOOLEAN,
    usr_loc_base_svc_agmt_yn: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'tb_user',
    freezeTableName: true, // don't use pluralized table name
  });
  return tb_user;
};