// 获取option
function getOption() {
    var lineOption = {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                show: true,
                type: 'line',
                label: {
                    show: true,
                    formatter: function (v) {
                        var date = new Date(v.value);
                        return date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
                    }
                },
                lineStyle: {
                    type: 'solid',
                    width: 1
                }
            },
            showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            backgroundColor: 'rgba(0,0,0,0.3)',
            formatter: function (params) {
                var tips = '';
                var date;
                if (params.componentType == "markArea") {
                    // debugger;
                    return;
                } else if (params.componentType == "series") {
                    if (Array.isArray(params)) {
                        date = new Date(params[0].data[0]);
                        var tipsTime = '时间：' + date.getFullYear() + '-' +
                            (date.getMonth() + 1) + '-' +
                            date.getDate() + "<br/>";
                        for (var i = 0; i < params.length; i++) {
                            var name = params[i].seriesName;
                            if (params[i].seriesName.slice(params[i].seriesName.length - 2, params[i].seriesName.length) == '预测' && params[i].dataIndex == 0) {
                                name = name.slice(0, name.length - 2) + '历史';
                            }
                            if (i == 0) {
                                tipsTime = tipsTime + name + '：' + parseFloat(params[i].value[1]).toFixed(2) + '<br>';
                            } else {
                                if (params[i + 1].seriesName == params[i].seriesName) {
                                    continue;
                                } else {
                                    tipsTime = tipsTime + name + '：' + parseFloat(params[i].value[1]).toFixed(2) + '<br>';
                                }
                            }
                        }
                        return tipsTime;
                    } else {
                        date = new Date(params.data[0]);
                        var tipsTime = '时间：' + date.getFullYear() + '-' +
                            (date.getMonth() + 1) + '-' +
                            date.getDate() + "<br/>";
                        var name = params.seriesName;
                        if (params.seriesName.slice(params.seriesName.length - 2, params.seriesName.length) == '预测' && params.dataIndex == 0) {
                            name = name.slice(0, name.length - 2) + '历史';
                        }
                        tips += tipsTime + (name || 'value') + '：' + parseFloat(params.data[1]).toFixed(2);
                    }
                    return tips;

                }
            }
        },
        grid: {
            containLabel: true,
            top: '7%',
            left: 'left',
            width: '96%',
            height: '88%'
        },
        xAxis: {
            type: 'time',
            position: 'bottom',
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#aaa9a9',
                    fontSize: 10,
                },
                formatter: function (params) {
                    var year = (new Date(params)).getFullYear();
                    var month = (new Date(params)).getMonth() + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }
                    var date = (new Date(params)).getDate();
                    if (date < 10) {
                        date = '0' + date;
                    }
                    return year + '-' + month + '-' + date;
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#9c9ca0',
                    width: 1,
                    type: 'solid'
                }
            },
            axisTick: {
                show: false,
                alignWithLabel: true,
                inside: true
            },
            splitLine: {
                show: false,
            },
            splitArea: {
                show: false,
            }
        },
        yAxis: {
            type: 'value',
            nameGap: 10,
            scale: true, //脱离0值比例
            splitNumber: 4,
            boundaryGap: false,
            axisLabel: {
                margin: 12,
                color: '#555555',
                fontFamily: 'arial',
                fontSize: 10,
                formatter: function (v) {
                    if (1) {
                        return v.toFixed(1);
                    } else {
                        return '';
                    }
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ddd', //y轴
                    width: 1,
                    type: 'solid'
                }
            },
            axisTick: {
                onGap: false,
                show: false,
            },
            splitArea: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#62636d'
                }
            },
            axisPointer: {
                show: false,
            }
        },
        series: []
    };
    return lineOption;
}
var container = echarts.init(document.getElementById("container"));
// 获取line data
function getData() {
    $.ajax({
        url: "./line.json",
        success: function (result) {
            var seriesData = [],
                option = getOption();
            for (let i = 0; i < result.length; i++) {
                var item, serieData = time2Datetime(result[i].children),
                    color = '#e74354';
                if (result[i].type == 14) {
                    color = '#898989';
                }
                item = {
                    name: result[i].itemname,
                    type: 'line',
                    showAllSymbol: false,
                    symbol: 'circle',
                    symbolSize: 2,
                    data: serieData,
                    yAxisIndex: 0,
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: color,
                            lineStyle: {
                                width: 1,
                                type: 'solid',
                                color: color
                            }
                        }
                    },
                    markLine: {},
                    markArea: {}
                };
                seriesData.push(item);
            }
            // seriesData[seriesData.length - 1].markArea = {
            //     silent: true,
            //     itemStyle: {
            //         normal: {
            //             color: '#202024',
            //             opacity: 1
            //         }
            //     },
            //     label: {
            //         normal: {
            //             position: "inside",
            //             show: true,
            //             formatter: [
            //                 '{a|}',
            //                 '{b|支付后展示预测数据}'
            //             ].join('  '),
            //             color: '#fff',
            //             rich: {
            //                 a: {
            //                     backgroundColor: {
            //                         image: './power.png'
            //                     },
            //                     height: 20,
            //                     width: 20
            //                 },
            //                 b: {
            //                     color: '#fff',
            //                     lineHeight: 10
            //                 }
            //             }
            //         }
            //     },
            //     data: [
            //         [{
            //             xAxis: new Date(seriesData[seriesData.length - 1].data[0][0].getFullYear(), seriesData[seriesData.length - 1].data[0][0].getMonth() + 1, 0),
            //         }, {
            //             xAxis: 'max'
            //         }]
            //     ]
            // };
            // seriesData[seriesData.length - 1].markLine = {
            //     symbol: ['none', 'none'],
            //     silent: true,
            //     label: {
            //         normal: {
            //             show: true,
            //             formatter: function () {
            //                 return getTime().untilDay
            //             }
            //         }
            //     },
            //     lineStyle: {
            //         normal: {
            //             type: 'solid',
            //             color: "#c4c3c3",
            //             width: 0.5
            //         }
            //     },
            //     data: [{
            //         xAxis: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            //     }]
            // };
            option.series = seriesData;
            container.setOption(option, true);

            payDom();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
getData();

function payDom() {
    debugger;
    var option = container.getOption();
    var startPx = container.convertToPixel('grid', option.series[option.series.length - 1].data[0]),
        endPx = container.convertToPixel('grid', option.series[option.series.length - 1].data[option.series[option.series.length - 1].data.length - 1]);
    var width = endPx[0] - startPx[0],
        height = 500 * 0.88 - 22,
        top = 500 * 0.07,
        marginLeft = startPx[0];
    $(".payArea").css({
        "width": width + "px",
        "height": height + "px",
        "margin-left": marginLeft + "px",
        "top": top + "px",
        "position": "absolute",
        "background-color": "red"
    });
}
// yyyy-mm-dd转date格式
function time2Datetime(array) {
    var copyArray = new Array();
    for (var i = 0; i < array.length; i++) {
        copyArray[i] = [new Date(array[i].date || array[i].statDate), array[i].value];
    }
    return copyArray
}
// 获取MarkLine的time值
function getTime() {
    var timeNow = new Date();
    var year = timeNow.getFullYear();
    var month = timeNow.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var date = timeNow.getDate();
    if (date < 10) {
        date = '0' + date;
    }
    var hours = timeNow.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    var minutes = timeNow.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var second = timeNow.getSeconds();
    if (second < 10) {
        second = '0' + second;
    }
    var untilDay = year + '-' + month + '-' + date,
        untilMonth = year + month,
        untilSecond = hours + ':' + minutes + ':' + second;
    return {
        year: year,
        month: month,
        untilDay: untilDay,
        untilMonth: untilMonth,
        untilSecond: untilSecond
    }
}