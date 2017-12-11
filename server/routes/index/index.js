var express = require('express');
var router = express.Router();

var { configDao } = require('../configs');
var { ruleDao } = require('../rules');
var { JSDOM } = require('jsdom');
/* GET home page. */
router.get('/', function(req, res, next) {
  var configs = [];
  configDao.findAll().then(urls=>{
      console.log(configs)
      res.render('index', { name: 'config index', configs: urls });
    });
});

router.post('/crawl', async (req, res, next)=>{
  await configDao.create(req.query.url);
  res.redirect('/');
});

router.get('/details', function(req, res, next){
  configDao.findOne(req.query.id).then(data=>{
    let dom = new JSDOM(data.html);
    dom.window.document.body.innerHTML += `
      <script src='/libs/jquery/dist/jquery.min.js'></script>
      <script src='/libs/highlight/highlight.js'></script>`;
    res.render('detail', { html: dom.serialize() });
  });
});

router.get('/config_detail', function(req, res, next){
  Promise.all([
      findAllByConfigId(req.query.id),
      configDao.findOne(req.query.id)
    ]).then(data=>{
      res.render('config_detail', { 
        config: data[1], 
        rules: data[0] 
      });
    });
});


module.exports = router;
