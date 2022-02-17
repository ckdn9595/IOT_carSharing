'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_payment extends Model {
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
  tb_payment.init({
    usr_seq: DataTypes.INTEGER,
    card_num: DataTypes.STRING,
    card_date: DataTypes.STRING,
    card_cvc: DataTypes.STRING,
    card_aprv: {
      type: DataTypes.STRING,
      primaryKey: Y
    },
    card_comp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tb_payment',
    freezeTableName: true, // don't use pluralized table name
  });
  return tb_payment;
};