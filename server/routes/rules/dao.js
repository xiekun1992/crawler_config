var { Rule, sequelize } = require('./model');

function batchCreateByDocumentId(documentId, rules){
  let promiseArr = [];
  sequelize.transaction(t=>{
    for(let rule of rules){
      promiseArr.push(Rule.create({
        rule,
        configId: documentId,
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
	batchCreateByDocumentId,
	findAllByConfigId
}