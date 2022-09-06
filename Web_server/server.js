//类的设计
//1.人员查询 -管理员：1 or普通用户：0
//2.包括username password 
class People{
    constructor(){
        //person 用于记录每个人的username password type
        this.person=new Array()
        //ex数组用于查询是否有存在的username 方便查找
        this.ex=new Array()
        
    }
    add(username,password,type){
        let newPerson={
            username:username,
            password:password,
            type:type
        }
        this.person[this.person.length]=newPerson
        this.ex[this.ex.length]=username
    }
    //根据 username 查询是否已经存在 
    //如果存在返回存在的索引 不存在返回-1
    isExist(username){
        //查询是否已经存在于ex 只要在ex不存在那么在person中也不存在
        return this.ex.indexOf(username)
    }
}
//pp实例作为简单的数据库实例
let pp=new People()
//用于 路由模块使用
module.exports=pp









//1.导入express
const express = require('express')
//2.创建web服务器
const app = express()


//     ------配置中间件 


// cors解决跨域
const cors=require('cors')
// body-parser 用于解决解析请求体数据
const body=require('body-parser')
//中间件 用于解决跨域访问问题
app.use(cors()) 
// 中间件 用于解析请求体数据
app.use(body())

//     ----模块路由导入


// 1.从路由模块中导入路由
const userRouter = require('./router/router-login')

// 2.使用app.use()注册路由模块   路由模块作为中间件
// 前缀为/api
app.use('/api',userRouter)




// 3.启动web服务器
app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1:80');
})