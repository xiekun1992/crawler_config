var express = require('express');
var router = express.Router();

var dao = require('./dao');
var Result = require('../../utils/Result');


router.post('/xpath/:documentId', function(req, res, next){
  let documentId = req.params.documentId;
  let rules = req.body.rules.split(',');
  
  dao.batchCreateByDocumentId(documentId, rules).then(r=>{
    res.json(new Result(20000, r));
  }).catch(r=>{
    res.json(new Result(50000, r));
  });
});

module.exports = router;