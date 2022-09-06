$(function(){
    let root='http://127.0.0.1:80'
    let body =document.body
    let eye = document.querySelector('.eye')
    let beam = document.querySelector('.beam')
    let link_register = document.querySelector('.link-register')
    let link_login = document.querySelector('.link-login')
    let login_box = document.querySelector('.login-box')
    let register_box = document.querySelector('.register-box')
    // 从layui中获取对象
    let form = layui.form
    let layer = layui.layer
    // 2选1
    // let passwordInput = document.getElementById('password')
    let passwordInput = document.querySelector('#log-password')


    // 检测移动
    body.addEventListener('mousemove',function(e){
        // console.log(e);
        let rect =beam.getBoundingClientRect();
        // console.log(rect);
        let mouseX=rect.right+(rect.width/2)
        let mouseY=rect.top+(rect.height/2)
        let rad = Math.atan2(mouseX-e.pageX,mouseY-e.pageY) 
        let deg = (rad*(20/Math.PI)*-1)-350
        // 这是以前的自定义属性的方法了 html改成了dataset了
        this.style.setProperty('--beam-deg',deg+'deg')
    })
    eye.addEventListener('click',function(e){
        // console.log(e);
        e.preventDefault()
        body.classList.toggle('show-password')
        // 如果是text就变成password 如果是password就变成text
        passwordInput.type =passwordInput.type==='password' ?'text':'password'
        // 更换眼睛的类
        this.className ='eye fa '+(passwordInput.type==='password'?'fa-eye-slash':'fa-eye')
        passwordInput.focus()

    })
    // 去注册绑定事件
    link_register.addEventListener('click',function(e){
        login_box.style="display:none;"
        register_box.style="display:block;"
    })
    // 返回登录事件
    link_login.addEventListener('click',function(){
        login_box.style="display:block;"
        register_box.style="display:none;"
    })

    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
        repwd: function(value){
            //通过形参拿到的是确认密码框中的内容
            //需要再比较一遍
            let pwd = $('#reg-password').val()
            if(pwd !==value){
                return '两次密码不一致'
            }
        }
    })

    // 检测注册表单的提交事件
    $('#form-register').on('submit',function(e){
        //阻止默认提交事件
        e.preventDefault()
        //获取表单的值用  data存储并且准备发送到服务器
        data={
            username:$('#reg-username').val(),
            password:$('#reg-password').val(),
            type:$('input[type="radio"]:checked').val()
        }
        // 提交注册的username password type到服务器
        $.ajax({
            url:root + '/api/post',
            method: 'POST',
            data: data,
            success:function(res){
                if(res.status!==1){ return layer.msg(res.message)}
                layer.msg(res.message)
                //注册成功就返回登录界面
                link_login.click()
                console.log(res);
            }
        })
    })
    // 监测登录表单的提交事件
    $('#form-login').on('submit',function(e){
        //阻止默认提交事件
        e.preventDefault()
        //获取表单的值用查询字符串的形式给去服务器
        data={
            username :$('#log-username').val(),
            password :$('#log-password').val()
        }
        dataStr = `username=${data.username}&password=${data.password}`
        // console.log(dataStr);

        //利用查询字符串给服务器传值 看看是否是已经注册过的用户
        $.ajax({
            url: root + '/api/get?'+dataStr,
            method: 'GET',
            success:function(res){
                //status 0 ：用户不存在 
                //status 1 ：用户密码错误
                //status 6 ：登录成功
                if(res.status===0){return layer.msg(res.message)}
                else if(res.status===1){return layer.msg(res.message)}
                else{
                    console.log(res);
                    layer.msg(res.message)
                }
                location.href = '../index/index.html'
            }
        })
    })
})
