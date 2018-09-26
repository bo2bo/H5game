$(function () {
    var paramObj = {
        url: "http://192.168.1.56:8766/dataProcess/chiefExpertReview/more",
        topicId: 9,
        infoId: 464,
        page: 0,
        size: 1
    }
    $('.khfxWarp').dropload({
        scrollArea: window,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">暂无数据</div>'
        },
        loadDownFn: function (me) {
            setTimeout(function () {
                paramObj.page++;
                getData({
                    url: paramObj.url,
                    topicId: paramObj.topicId,
                    infoId: paramObj.infoId,
                    page: paramObj.page,
                    size: paramObj.size,
                    me: me
                });
            }, 500);
        }
    });

    function getData(params) {
        $.ajax({
            url: params.url,
            async: false,
            data: {
                topicId: params.topicId,
                infoId: params.infoId,
                page: params.page,
                size: params.size
            },
            success: function (res) {
                var result = res.body;
                if (result.length > 0) {
                    var dom = '';
                    for (var i = 0; i < result.length; i++) {
                        dom += '<li><div class="user"><div class="photo"></div><div class="name">' + result[i].fUsername + '</div></div><div class="essay"><div class="content">' + result[i].fTitle + '</div><div class="time">' + result[i].fPublishDate + '</div><a  href="./../pages/article.html?topic=' + result[i].topicId + '&info=' + result[i].fInfoId + '" class="detail">查看全文</a></div></li>';
                    }
                    $('.khfxPane').append(dom);
                } else {
                    params.me.lock();
                    params.me.noData();
                }
                params.me.resetload();
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
});