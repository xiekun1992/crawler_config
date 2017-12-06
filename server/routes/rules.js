var express = require('express');
var router = express.Router();

var { Config } = require('../models/Configs');
var { Rule } = require('../models/Rules');
var Result = require('../models/Result');
const { sequelize } = require('../db_config');


router.post('/xpath/:documentId', function(req, res, next){
  let documentId = req.params.documentId;
  let rules = req.body.rules.split(',');
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
  }).then(r=>{
    res.json(new Result(20000, r));
  }).catch(r=>{
    res.json(new Result(50000, r));
  });
});

module.exports = router;