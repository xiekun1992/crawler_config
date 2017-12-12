let express = require('express');
let router = express.Router();

let { JSDOM } = require('jsdom');
let { configDao } = require('../configs');
let { ruleDao } = require('../rules');
/* GET home page. */
router.get('/', (req, res, next) =>{
  let configs = [];
  configDao.findAll().then(urls=>{
      res.render('index', { name: 'config index', configs: urls });
    });
});

router.post('/crawl', async (req, res, next)=>{
  await configDao.create(req.query.url);
  res.redirect('/');
});

router.get('/details', (req, res, next)=>{
  configDao.findOne(req.query.id).then(data=>{
    let dom = new JSDOM(data.html);
    dom.window.document.body.innerHTML += `
      <script src='/libs/jquery/dist/jquery.min.js'></script>
      <script src='/libs/highlight/highlight.js'></script>`;
    res.render('detail', { html: dom.serialize() });
  });
});

router.get('/config_detail', (req, res, next)=>{
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
