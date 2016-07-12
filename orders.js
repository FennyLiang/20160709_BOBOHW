/**
 * Created by Apple on 7/12/16.
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize("database", null, null,{
  host: "localhost",
  dialect: 'sqlite',

  pool: {
    max: 5, //最大連線人數
    min: 0,
    idle: 10000  //閒置時間
  },
  storage: './database.sqlite'
});

//create table
const orderModel = sequelize.define('orders', {
  content:{
    type: Sequelize.STRING,
  },
  created_at:{
    type: Sequelize.DATE,
  }
});

exports.index = () => {
  //find all
  return orderModel.findAll()
}

exports.show = (id) => {
  return orderModel.findOne({ where: { id: id } })
}

exports.destroy = (id) => {
  return orderModel.destroy({ where: {id: id } });
}