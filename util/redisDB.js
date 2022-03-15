let redis=require('redis');
const {redisConfig}=require('../config/db');
const redis_client=redis.createClient(redisConfig);
redis_client.on("connect",()=>{
    console.log("连接成功");
})
redis_client.on("error",(err)=>{
    console.log(err);
})
redis={};

keys=async(cursor,re,count)=>{
    let getTempKeys=await new Promise((resolve)=>{
        redis_client.scan([cursor,'MATCH',re,'COUNT',count],(err,res)=>{
            console.log(err);
            return resolve(res);
        });
    });
    return getTempKeys;
}
redis.scan=async(re,cursor=0,count=100)=>{
    return await keys(cursor,re,count);
}

redis.set=(key,value)=>{
    value=JSON.stringify(value);
    return redis_client.set(key,value,(err)=>{
        if(err){
            console.log(err);
        }
    });
};

text=async(key)=>{
    let getTempValue=await new Promise((resolve)=>{
        redis_client.get(key,(err,res)=>{
            console.log(err);
            return resolve(res);
        });
    });
    getTempValue=JSON.parse(getTempValue);
    return getTempValue;
};
redis.get=async(key)=>{
    return await text(key);
}

redis.expire=(key,ttl)=>{
    redis_client.expire(key,parseInt(ttl));
}

let id=async(key)=>{
    console.log("查找"+key);
    let id=await new Promise((resolve)=>{
        redis_client.incr(key,(err,res)=>{
            console.log(res);
            return resolve(key);
        });
    });
    console.log(id);
    return id;
}
redis.incr=async(key)=>{
    return id(key);
}
//改写redis有序集合
//参考redis中文文档：http://www.redis.cn/topics/data-types-intro.html
//改写有序集合新增操作zadd
redis.zadd=(key,member,num)=>{
    member=JSON.stringify(member);
    redis_client.zadd(key,num,member,(err)=>{
        if(err){
            console.log(err);
        }
    });
}

//改写redis有序集合zrevrange函数，获取一定范围内的元素
tempData=async(key,min,max)=>{
    let tData=await new Promise((resolve)=>{
        redis_client.zrevrange([key,min,max,'withscores'],(err,res)=>{
            return resolve(res);
        });
    });
    let oData=[];
    for(let i=0;i<tData.length;i+=2){
        oData.push({member:JSON.parse(tData[i]),score:tData[i+1]});
    }
    return oData;
}
redis.zrevrange=async(key,min=0,max=-1)=>{
    return tempData(key,min,max);
}

//改写有序集合自增操作zincrby
redis.zincrby=(key,member,num=1)=>{
    member=JSON.stringify(member);
    redis_client.zincrby(key,num,member,(err)=>{
        if(err){
            console.log(err);
        }
    })
}

//改写有序集合获取score值函数zscore
tempScore=async(key,member)=>{
    member=JSON.stringify(member);
    return await new Promise((resolve)=>{
        redis_client.zscore(key,member,(err,res)=>{
            console.log(res);
            return resolve(res);
        });
    });
}
redis.zscore=async(key,member)=>{
    return tempScore(key,member);
}

module.exports=redis;