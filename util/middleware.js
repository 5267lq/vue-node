const {ALLOW_APP}=require('../config/app');
const { redisConfig } = require('../config/db');
const util=require('./common');
exports.checkAPP=(req,res,next)=>{
    console.log(req.headers);
    if(!ALLOW_APP.includes(req.headers.fapp)){
        res.json(util.getReturnData(500,'来源不明'));
    }
    else{
        next();
    }
}

exports.checkAdmin=(req,res,next)=>{
    console.log("检测管理员用户");
    if(req.username='admin'){
        let key=req.headers.fapp+":user:power"+req.headers.token;
        redis.set(key,'admin');
        next();
    }
    else{
        res.json(util.getReturnData(403,'权限不足'));
    }
}