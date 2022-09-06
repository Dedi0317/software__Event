let express = require('express')
let router =express.Router()

//要导入服务器的在线伪造数据库
let pp = require('../server')

////    register 界面的路由 

////  待完成需求 根据登录的类型 返回自动生成的编码
////  将编码存储到浏览器local Storage 
////  用于识别权限

// 挂载register界面的post 用于接收注册的账号和密码
router.post('/post',(req,res)=>{
    console.log('someone registering');
    console.log('data:'+req.body);
    let b=req.body
    // status 1成功 0失败
    let status =1;
    let message='注册成功！'
    let index =pp.isExist(b.username)
    if(index !==-1){
        status=0;
        message='账号已存在！'
    }else{
        //接收到了数据 就要存储下来
        pp.add(b.username,b.password,b.type) 
    }
    
    res.send({
        data:b,
        status:status,
        message:message
    })
    console.log('-------添加完成后的伪造数据库--------');
    console.log(pp.person);
})

// 挂在register界面的get请求路由 用于登录，查询此用户是否已经注册
router.get('/get',(req,res)=>{
    console.log('需要登录的用户：');
    console.log(req.query);
    //status 0 ：用户不存在 
    //status 1 ：用户密码错误
    //status 6 ：登录成功
    let status =6;
    let message ='登录成功！'
    //接收该用户在数组中的位置
    let index =pp.isExist(req.query.username)
    if( index === -1){
        status = 0;
        message ='该用户不存在！'
    }else{
        //说明用户存在 则需要验证密码
        if(pp.person[index].password !== req.query.password){
            status =1;
            message ='用户密码错误！'
        }
    }
    res.send({
        data:req.query,
        status:status,
        message:message
    })
})

//  向外暴露路由对象
module.exports = router