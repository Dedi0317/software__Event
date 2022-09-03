let body =document.body
let eye = document.querySelector('.eye')
let beam = document.querySelector('.beam')
// 2选1
// let passwordInput = document.getElementById('password')
let passwordInput = document.querySelector('#password')

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