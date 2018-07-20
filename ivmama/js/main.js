var canvas, stage, exportRoot, phoneWidth = parseInt(window.screen.width),
    phoneScale = phoneWidth / 640,
    ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)) {
    var version = parseFloat(RegExp.$1);
    2.3 < version ? document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ", maximum-scale = " + phoneScale + ', target-densitydpi=device-dpi">') : document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">')
} else document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');

function onComplete(a) {
    document.getElementById("bgMusic").play();
    $(".loading").fadeOut(400);
    $(".loading").addClass("go");
    $(".container").show();
    setTimeout(function () {
        innit()
    }, 600)
}

function runswiper() {
    $(".swiper-button-next").show()
}

function onProgress(a) {
    $progressNumber.text(Math.round(100 * a.loaded) + "%")
}
var landing = "./img/icon.jpg ./img/001.png ./img/002.png ./img/beizi.png ./img/app.png ./img/down.png ./img/discount.png ./img/bg1.jpg ./img/bg2.jpg ./img/bg3.jpg ./img/bg4.jpg ./img/bg5.jpg ./img/bg6.jpg ./img/bg7.jpg ./img/bg8.jpg ./img/bg9.jpg ./img/w1.png ./img/w2.png ./img/w3.png ./img/w4.png ./img/w5.png ./img/w6.png ./img/w7.png ./img/w8.png ./img/w19.png".split(" "),
    queue = new createjs.LoadQueue(!1),
    $progressNumber = $(".loading .text"),
    $progressBar = $("#progress-bar");
queue.on("complete", onComplete);
queue.on("progress", onProgress);
queue.loadManifest(landing);

function innit() {
    canvas = document.getElementById("canvas");
    exportRoot = new l.lvmama;
    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    stage.update();
    createjs.Ticker.setFPS(l.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);
    var a = !0;
    $("#btnmusic").click(function () {
        a ? (a = !1, document.getElementById("bgMusic").pause(), $("#btnmusic").addClass("stop")) : (a = !0, document.getElementById("bgMusic").play(), $("#btnmusic").removeClass("stop"))
    })
}
$(function () {
    function a(a, b) {
        c = a;
        d = 1;
        c.css("display", "none");
        c.eq(0).css("display", "block");
        g = setInterval(function () {
            d++;
            d >= b && (d = 1);
            c.css("display", "none");
            c.eq(d - 1).css("display", "block")
        }, 220)
    }

    function b(a, b) {
        e = a;
        f = 1;
        e.css("display", "none");
        e.eq(0).css("display", "block");
        h = setInterval(function () {
            f++;
            f >= b && (f = 1);
            e.css("display", "none");
            e.eq(f - 1).css("display", "block")
        }, 140)
    }
    var c, d, g, e, f, h;
    h = null;
    f = 1;
    e = "";
    g = null;
    d = 1;
    c = "";
    new Swiper("#swiper", {
        observer: !0,
        direction: "vertical",
        speed: 500,
        touchMoveStopPropagation: !1,
        observeParents: !0,
        nextButton: ".swiper-button-next",
        onInit: function () {
            b($(".lmm1"), 8);
            a($(".lmw1"), 3)
        },
        onTouchEnd: function () {},
        onSlideChangeStart: function (c) {
            c = c.activeIndex;
            clearInterval(h);
            clearInterval(g);
            $(".swiper-button-next").show();
            switch (c) {
                case 0:
                    setTimeout(function () {
                        exportRoot.gotoAndPlay(0)
                    }, 1200);
                    break;
                case 1:
                    b($(".lmm1"), 11);
                    a($(".lmw1"), 3);
                    break;
                case 2:
                    b($(".lmm2"), 10);
                    a($(".lmw2"), 3);
                    break;
                case 3:
                    b($(".lmm3"), 14);
                    a($(".lmw3"), 3);
                    break;
                case 4:
                    b($(".lmm4"), 9);
                    a($(".lmw4"), 3);
                    break;
                case 5:
                    b($(".lmm5"),
                        16);
                    a($(".lmw5"), 3);
                    break;
                case 6:
                    b($(".lmm6"), 10);
                    a($(".lmw6"), 3);
                    break;
                case 7:
                    b($(".lmm7"), 15);
                    a($(".lmw7"), 3);
                    break;
                case 8:
                    b($(".lmm8"), 8);
                    a($(".lmw8"), 3);
                    break;
                case 9:
                    b($(".lmm9"), 8), a($(".lmw9"), 3)
            }
        }
    })
});