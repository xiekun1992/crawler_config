var express = require('express');
var router = express.Router();

var dao = require('./dao');
var Result = require('../../utils/Result');

router.delete('/:id', (req, res, next)=>{
  dao.destroy(req.params.id).then(data=>{
    res.json(new Result(20000, data));
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
});

router.post('/:id', (req, res, next)=>{
  dao.update({
    id: req.params.id,
    html: req.body.html,
    status: req.body.status == 'success'? 1: 2
  }).then(data=>{
    res.json(new Result(20000, data));
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
});

router.post('/', (req, res)=>{
  dao.create(req.body.url).then(data=>{
    res.json(new Result(20000, data));
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
});

router.get('/:id', (req, res)=>{
  dao.findOne(req.params.id).then(data=>{
    res.json(new Result(20000, data));
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
});

router.get('/', async (req, res)=>{
  dao.findAll(req.query.url).then(data=>{
    res.json(new Result(20000, data));
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
});

module.exports = router;