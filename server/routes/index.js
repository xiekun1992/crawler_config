var express = require('express');
var router = express.Router();

var { Config } = require('../models/Configs');
var { Rule } = require('../models/Rules');
var { JSDOM } = require('jsdom');
/* GET home page. */
router.get('/', function(req, res, next) {
  var configs = [];
  Config
    .findAll()
    .then(urls=>{
      configs = urls;
      res.render('index', { name: 'config index', configs });
    });
});

router.post('/crawl', function(req, res, next){
  var configs = [];
  Config
  .build({
    url: req.body.url
  })
  .save()
  res.redirect('/');
});

router.get('/detail', function(req, res, next){
  Config
  .findOne({
    where: {id: req.query.id}
  })
  .then(data=>{
    let dom = new JSDOM(data.html);
    dom.window.document.body.innerHTML += `
      <script src='http://192.168.245.128:3000/libs/jquery/dist/jquery.min.js'></script>
      <script src='http://192.168.245.128:3000/libs/highlight/highlight.js'></script>`;
    res.render('detail', { html: dom.serialize() });
  });
});

router.get('/config_detail', function(req, res, next){
  Promise.all([
      Rule.findAll({
        attributes: ['rule'],
        where: {
          configId: req.query.id
        }
      }),
      Config.findOne({
        attributes: ['id', 'url', 'status'],
        where: {
          id: req.query.id
        }
      })
    ]).then(data=>{
      res.render('config_detail', { 
        config: data[1], 
        rules: data[0] 
      });
    });
});


module.exports = router;
