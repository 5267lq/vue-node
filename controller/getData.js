let redis=require('../util/redisDB');
let util=require('../util/common');
exports.getNavMenu=(req,res,next)=>{
    let key=req.headers.fapp+"_nav_menu";
    redis.get(key).then(data=>{
        console.log(data);
        res.json(util.getReturnData(0,'',data));
    })
}

exports.getFooter=(req,res,next)=>{
    let key=req.headers.fapp+"_footer";
    redis.get(key).then(data=>{
        console.log(data);
        res.json(util.getReturnData(0,'',data));
    })
}

exports.getLinks=(req,res,next)=>{
    let key=req.headers.fapp+"_links";
    redis.get(key).then(data=>{
        console.log(data);
        res.json(util.getReturnData(0,'',data));
    })
}

exports.getIndexPic=(req,res,next)=>{
    let key=req.headers.fapp+"_indexpic";
    redis.get(key).then(data=>{
        console.log(data);
        res.json(util.getReturnData(0,'',data));
    })
}

exports.getHotArticle=(req,res,next)=>{
    let key=req.headers.fapp+'_a_view';
    redis.zrevrange(key,0,4).then(async (data)=>{
        console.log(data);
        let result=data.map((item)=>{
            console.log(item);
            console.log(item.member);
            console.log(item.score);
            return redis.get(item.member).then((data1)=>{
                console.log(data1);
                // if(data1&&data1.show!=0){
                if(data1){
                    return{
                        'title':data1.title,
                        'date':util.getLocalDate(data1.time),
                        'id':data1.id,
                        'view':item.score
                    }
                }
                else{
                    return {'title':'文章暂未上线','date':'','id':0,'view':0}
                }
            });
        });
        let t_data=await Promise.all(result);
        res.json(util.getReturnData(0,'',t_data));
    })
}

exports.getArticleList=(req,res,next)=>{
    let key=req.headers.fapp+'_a_time';
    console.log(key);
    redis.zrevrange(key,0,-1).then(async (data)=>{
        console.log(data);
        let result=data.map((item)=>{
            return redis.get(item.member).then((data1)=>{
                console.log(data1);
                if(data1&&data1.show!=0){
                    return{
                        'title':data1.title,
                        'date':util.getLocalDate(item.score),
                        'id':data1.id
                    }
                }
                else{
                    return {'title':'文章暂未上线','date':'','id':0};
                }
            });
        });
        let t_data=await Promise.all(result);
        res.json(util.getReturnData(0,'',t_data));
    })
}