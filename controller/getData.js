let redis=require('../util/redisDB');
let util=require('../util/common');
exports.getNavMenu=(req,res,next)=>{
    let key=req.headers.fapp+"_nav_menu";
    redis.get(key).then(data=>{
        console.log(data);
        res.json(util.getReturnData(0,'',data));
    })
}