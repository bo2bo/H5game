$(function () {
    new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: false,
        on: {
            init: function () {
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
            }
        }
    })
    var paramObj = {
        meetingId: "",
        meetingTitle: ""
    }
    $("input").blur(function () {
        if ($(this).is("#userName")) { //姓名判断
            var na = /^[\u4E00-\u9FA5]{2,15}$/
            if ($("#userName").val() != "") {
                if (!(na.test($("#userName").val()))) {
                    $(".userName").text("请输入2-15个汉字").css("color", "#BD362F");
                    $(this).css("border", "1px solid #BD362F");
                    return false;
                } else if (na) {
                    $(".userName").text("");
                    return true;
                }
            } else {
                $(".userName").text("");
            }
        }
        if ($(this).is("#phone")) { //手机号判断
            var ph = /^1[3|5|7|8|][0-9]{9}$/
            if ($("#phone").val() != "") {
                if (!(ph.test($("#phone").val()))) {
                    $(".phone").text("请输入11位手机号").css("color", "#BD362F");
                    $(this).css("border", "1px solid #BD362F");
                    return false;
                } else if (ph) {
                    $(".phone").text("");
                    return true;
                }
            } else {
                $(".phone").text("");
            }
        }
        if ($(this).is("#email")) { //email判断
            var email = /^\w+@\w+(\.\w+)+$/;
            if ($("#email").val() != "") {
                if (!(email.test($("#email").val()))) {
                    $(".email").text("请输入格式正确的邮箱").css("color", "#BD362F");
                    $(this).css("border", "1px solid #BD362F");
                    return false;
                } else if (email) {
                    $(".email").text("");
                    return true;
                }
            } else {
                $(".email").text("");
            }
        }
    })

    $("input").focus(function () {
        if ($(this).is("#userName")) {
            $(".userName").text("请输入姓名").css("color", "#333")
            $(this).css("border", "1px solid #aaa")
        }
        if ($(this).is("#phone")) {
            $(".phone").text("请输入正确手机号").css("color", "#333")
            $(this).css("border", "1px solid #aaa")
        }
        if ($(this).is("#email")) {
            $(".email").text("请输入正确邮箱便于以后接受邮件").css("color", "#333")
            $(this).css("border", "1px solid #aaa")
        }
    })

    $.ajax({
        url: "http://192.168.1.62:8080/getMeeting",
        success: function (result) {
            $(".content")[0].children[1].innerHTML = result.body.meetingTitle;
            $(".time")[0].children[0].innerHTML = "会议时间：" + result.body.meetingDate;
            $(".address")[0].children[0].innerHTML = "会议地点：" + result.body.meetingLocation;
            paramObj.meetingId = result.body.meetingId;
            paramObj.meetingTitle = result.body.meetingTitle;
        },
        error: function (err) {
            console.log(err);
        }
    });

    $("#submit").click(function () {
        var userName = $('input[name="userName"]').val(),
            userPhone = $('input[name="phone"]').val(),
            userEmail = $('input[name="email"]').val(),
            userCompany = $('input[name="company"]').val(),
            userJob = $('input[name="job"]').val();
        var na = /^[\u4E00-\u9FA5]{2,15}$/; //姓名正则
        var ph = /^1[3|5|7|8|][0-9]{9}$/; //手机号正则
        var em = /^\w+@\w+(\.\w+)+$/; //邮箱正则
        if (na.test(userName) && ph.test(userPhone) && em.test(userEmail)) {
            $.ajax({
                url: 'http://192.168.1.62:8080/enroll',
                type: 'post',
                data: {
                    userName: userName,
                    userPhone: userPhone,
                    userEmail: userEmail,
                    userCompany: userCompany,
                    userJob: userJob,
                    meetingId: paramObj.meetingId,
                    meetingTitle: paramObj.meetingTitle
                },
                success: function (result) {
                    if (result.status == "500") {
                        $("#submit").parent().text("您已经报名成功，无需重复报名!");
                        $("#submit").remove();
                    } else if (result.status == "200") {
                        $("#submit").parent().text("报名成功!");
                        $("#submit").remove();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        } else {
            if ($("#userName").val() == "") {
                $(".userName").text('请你填写用户名')
            }
            if ($("#phone").val() == "") {
                $(".phone").text('请你填写手机号')
            }
            if ($("#email").val() == "") {
                $(".email").text('请你填写邮箱')
            }
        }
    })
})