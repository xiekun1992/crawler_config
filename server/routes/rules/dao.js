var { Rule, sequelize } = require('./model');

function batchCreateByConfigId(configId, rules){
  let promiseArr = [];
  return sequelize.transaction(t=>{
    for(let rule of rules){
      promiseArr.push(Rule.create({
        rule,
        configId,
        isDelete: 0
      }, {
        transaction: t
      }));
    }
    return Promise.all(promiseArr);
  });
}

function findAllByConfigId(configId){
	return Rule.findAll({
	    // attributes: ['rule'],
	    where: { configId }
	  })
}

module.exports = {
	batchCreateByConfigId,
	findAllByConfigId
}