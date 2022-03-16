var express = require('express');
var router = express.Router();
const util=require('../util/common');
//引入导航栏逻辑处理
var {getNavMenu}=require('../controller/getData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test router
router.get('/getFooter',function(req,res,next){
  res.json(util.getReturnData(0,'success'));
});

//获取导航栏路由
router.get('/getNavMenu',getNavMenu);

module.exports = router;
