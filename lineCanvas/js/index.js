window.onload = function(){//页面加载完成后执行
    var c = document.getElementsByClassName('myCanvas')[0];//获取节点
    var ctx = c.getContext('2d');//平面绘画

    c.addEventListener('click',function(e){//点击事件
        var e = e || event;//浏览器兼容问题
        var x = e.clientX - c.offsetLeft;//获取鼠标横坐标
        var y = e.clientY - c.offsetTop;//获取鼠标纵坐标

        var addR = 0;//声明变量让半径从0开始
        var alpha = 1;//申明变量设置透明度
        function recursion(){//申明函数
            ctx.fillStyle = 'rgba(36,196,191,'+alpha+')';//填充样式
            addR += 1;//半径每次自加1
            alpha -=0.01;//透明度每次自减0.01
            ctx.beginPath();//开始
            ctx.arc(x,y,addR,0,2*Math.PI);//画圆（水波）[鼠标点击的横坐标，鼠标点击的纵坐标，圆的起始位置，圆的结束位置]
            ctx.fill();//填充类型
            /*if(alpha <= 0){
             ctx.clearRect(0,0,500,500);//如果这里打开的话那么你第一个点击的水波（圆）颜色不会渐变
             }*/
            if(alpha >= 0){
                window.requestAnimationFrame(recursion);//和电脑使用相同的频率，防止水波最大时闪动消失
            }
        }
        recursion();//调用函数，与window.requestAnimationFrame(recursion);形成递归
    });
    function clear(){//声明清除水波的函数
        ctx.clearRect(0,0,500,500);//清除水波
        window.requestAnimationFrame(clear);//和电脑使用相同的频率，防止水波最大时闪动消失，这里可以解决第一个点击的水波（圆）颜色不会渐变的问题
    }
    clear();//调用函数，与window.requestAnimationFrame(clear);形成递归
}