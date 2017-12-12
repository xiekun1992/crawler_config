var express = require('express');
var router = express.Router();

var dao = require('./dao');
var { Result } = require('../../utils');


router.post('/:configId', (req, res, next)=>{
  let configId = req.params.configId;
  let rules = req.body.rules.split(',');
  
  dao.batchCreateByConfigId(configId, rules).then(r=>{
    res.json(new Result(20000, r));
  }).catch(r=>{
    res.json(new Result(50000, r));
  });
});

module.exports = router;