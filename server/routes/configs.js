var express = require('express');
var router = express.Router();

var { Config } = require('../models/Configs');
var Result = require('../models/Result');

router.delete('/:id', function(req, res, next){
  Config.destroy({
    where:{
      id: req.params.id
    }
  }).then(function(data){
    res.json(new Result(20000, data));
  }).catch(function(err){
    res.json(new Result(50000, err));
  });
});

router.post('/:id', function(req, res, next){
  Config.update({
    html: req.body.html,
    status: req.body.status == 'success'? 1: 2
  }, {
    where: {
      id: req.params.id
    }
  }).then(data=>{
    res.json(new Result(20000, data));
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
  
});

module.exports = router;