let express = require('express');
let router = express.Router();

let fs = require('fs');
let { Script } = require('vm');
let { JSDOM } = require('jsdom');

let { configDao } = require('../configs');
let { Result } = require('../../utils');

let xpathContent = fs.readFileSync('./client/public/libs/xpath/xpath.js',{encoding: 'utf8'});

router.get('/', (req, res, next)=>{
  configDao.findOne(req.query.documentId).then(data=>{
    // extract node's xpath by nodeId
    let dom = new JSDOM(data.html, {
      runScripts: 'outside-only'
    });
    let { document } = dom.window;
    const script = new Script(xpathContent);
    dom.runVMScript(script);

    let element = document.querySelector(`[data-node-id="${req.query.nodeId}"]`);
    let similarElements = dom.window._xpath.getSimilarElements(element);
    let similarElementsId = [];
    for(let se of similarElements){
      similarElementsId.push(se.getAttribute('data-node-id'));
    }
    // let similarElementsId = dom.window.similarElementsId;
    // console.log(similarElementsId);
    res.json(new Result(20000, {
      similarPath: dom.window._xpath.similarPath,
      similarElementsId
    }));
    
  }).catch(err=>{
    res.json(new Result(50000, err));
  });
});

module.exports = router;