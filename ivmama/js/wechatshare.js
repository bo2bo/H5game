
var appId = '';
var wxnonceStr = '';
var wxSha1 = '';
var url = encodeURI(location.href.split('#')[0]);
$.ajax({
    dataType: 'jsonp',
    jsonp: 'callback',
    type: "GET",
    // 请求地址设置
    url: "http://share.pzoom.com/wenxin/makeKey",//需要在此加入微信分享对接地址 /*todo*/
    // 请求参数设置
    data: {
        url: url
    },
    // 数据类型
    // 是否异步
    async: false,
    // 请求超时时间
    timeout: -1,
    success: function (data, status, xhr) {
        // html = '';
        console.log(data);
        wxSha1 = data.result.signature;
        wxnonceStr = data.result.nonceStr;
        appId = data.result.appid;
        timestamp = data.result.timestamp;
        wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: wxnonceStr,
            signature: wxSha1,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'] // 功能列表，我们要使用JS-SDK的什么功能
        });
        // wx.error(function (res) {
        //     alert("wx.error" + JSON.stringify(res));
        // });
    }
});
var imgUrl = 'http://www.pzoom.com/pzoom_lvmama/img/icon.jpg';  // 分享后展示的一张图片
var lineLink = 'http://www.pzoom.com/pzoom_lvmama/html/index.html'; // 点击分享后跳转的页面地址
var descContent = "听说这只真软夯萌的小驴虐了无数像你一样努力工作的人";  // 分享后的描述信息
var shareTitle = "做大人难，做职场达人更更更难";  // 分享后的标题
wx.ready(function () {
    /*ios背景音乐自动播放*/
    document.getElementById("bgMusic").play();
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink,
        imgUrl: imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '',
        success: function () {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareTimeline(
        {
            title: shareTitle,
            link: lineLink,
            imgUrl: imgUrl,
            success: function () {
                alert("分享成功");
            },
            cancel: function () {
            }
        });

    wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareWeibo({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
});