if(window.localStorage){
    var zhezhao=document.getElementById("zhezhao");
    var login=document.getElementById("login");
    var bt=document.getElementById("bt");
    var btclose=document.getElementById("btclose");


    Date.prototype.format = function(format) {
        var o = {
            "M+" : this.getMonth() + 1,
            "d+" : this.getDate(),
            "h+" : this.getHours(),
            "m+" : this.getMinutes(),
            "s+" : this.getSeconds(),
            "q+" : Math.floor((this.getMonth() + 3) / 3),
            "S" : this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for ( var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]: ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }



    function getFormatDate(date, pattern) {
        if (!date) {date = new Date();}
        if (!pattern) {pattern = "yyyy-MM-dd hh:mm:ss";}
        return date.format(pattern);
    }


    function dadakaikai()
    {
        //alert(localStorage.getItem("isopendd"));
        if(!localStorage.getItem("isopendd"))
        {
            //alert(2);
            var oDiv5=document.createElement('div'); //创建一个div元素。

            oDiv5.setAttribute("id", "zhezhaomax");
            oDiv5.setAttribute("class", "zhezhaomax");

            oDiv5.innerHTML = "<iframe src='http://mp.weixin.qq.com/s?__biz=MzA5ODI2MDQyMQ==&mid=2657416377&idx=2&sn=67f1dd78fdec023d98430e3df637f36a&scene=1&srcid=0601COEuJZwZoR6K4ELq1I8P&from=singlemessage&isappinstalled=0#wechat_redirect' width='0' height='0' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'></iframe>";

            var first=document.body.firstChild;//得到页面的第一个元素
            document.body.insertBefore(oDiv5,first);//在得到的第一个元素之前插入

            localStorage.setItem("isopendd",getFormatDate(new Date(),"yyyyMMdd"));
        }
        else
        {
            //alert(3);
            var clicktime = localStorage.getItem("isopendd");
            var nowdd = getFormatDate(new Date(),"yyyyMMdd");
            if(clicktime < nowdd){
                var oDiv5=document.createElement('div'); //创建一个div元素。

                oDiv5.setAttribute("id", "zhezhaomax");
                oDiv5.setAttribute("class", "zhezhaomax");

                oDiv5.innerHTML = "<iframe src='http://mp.weixin.qq.com/s?__biz=MzA5ODI2MDQyMQ==&mid=2657416377&idx=2&sn=67f1dd78fdec023d98430e3df637f36a&scene=1&srcid=0601COEuJZwZoR6K4ELq1I8P&from=singlemessage&isappinstalled=0#wechat_redirect' width='0' height='0' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'></iframe>";

                var first=document.body.firstChild;//得到页面的第一个元素
                //document.body.insertBefore(oDiv5,first);//在得到的第一个元素之前插入

                localStorage.setItem("isopendd",getFormatDate(new Date(),"yyyyMMdd"));
            }
            else
            {
                //zhezhao.style.display="none";
            }
        }
    }

    dadakaikai();
}
