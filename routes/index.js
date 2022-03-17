var express = require('express');
var router = express.Router();
const util=require('../util/common');
//引入导航栏逻辑处理
var {getNavMenu}=require('../controller/getData');
var {getFooter}=require('../controller/getData');
var {getLinks}=require('../controller/getData');
var {getIndexPic}=require('../controller/getData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// // test router
// router.get('/getFooter',function(req,res,next){
//   res.json(util.getReturnData(0,'success'));
// });

//获取导航栏路由
router.get('/getNavMenu',getNavMenu);
//获取底部路由
router.get('/getFooter',getFooter);
//获取友情链接路由
router.get('/getLinks',getLinks);
//获取首页轮播图路由
router.get('/getIndexPic',getIndexPic);

module.exports = router;
