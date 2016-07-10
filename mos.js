var Sequelize = require('sequelize');

var sequelize = new Sequelize("database", null, null,{
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
var orderModel = sequelize.define('orders', {
  content:{
    type: Sequelize.STRING,
  },
  created_at:{
    type: Sequelize.DATE,
  }
});
// orderModel.sync({force: true})
//   .then(function(){
//     return orderModel.create({
//       content: 'contentDetailblablablablabla',
//       created_at: '2016-07-10'
//     });
//   }).then(function(){
//       return orderModel.create({
//         content:'BOBOBOBOBO',
//         created_at: '2016-2-28'
//       });
//     });
//
//
//
// orderModel.sync().then(function(){
//   return orderModel.findAll();
// }).then(function(orders){
//   for (var order of orders) {
//     console.log('tooooooooooprint: ' + order);
//   }
//   // for (var i = 0; i < orders.length; i++) {
//   //   console.log('tooooooooooprint: ' + orders[i].content);
//   // }
// });

//add order
orderModel
  .create({
    content: 'contentDetailblablablablabla',
    created_at: '2016-07-10'
  }).then(function(){
  orderModel
    .create({
      content: 'BOBOISANIDIOT',
      created_at: '2016-07-10'
    })
  })

//find one
orderModel
  .findOne()
  .then(function(orders){
    console.log('=======>'+orders.get('content'));
  })

//find all
orderModel
  .findAll()
  .then(function(orders){
    for (var order of orders) {
      console.log('tooooooooooprint: ' + order.content + 'Date: ' + order.created_at);
    }
  });

//Delete
orderModel.destroy({where:{id:1}});

//Update
orderModel.update({
    content:'Nothing last forever.',
  }, {
    where: {id: 6}
});
