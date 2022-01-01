const $ = mdui.$;

function getParam(reqParam) {
    reqParam = reqParam.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const paraReg = new RegExp('[\\?&]' + reqParam + '=([^&#]*)');
    const results = paraReg.exec(window.location);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 改变顶部导航栏的颜色
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

function changeNavColor() {
    // console.log(getScrollPosition());
    if (getScrollPosition().y >= window.innerHeight * 0.3) {
        $("body").addClass("mdui-theme-primary-teal")
    } else {
        $("body").removeClass("mdui-theme-primary-teal")
    }
}
window.onscroll = changeNavColor;

// 获取近期文章
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        /* Posts */
        $.ajax({
            method: 'GET',
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fblog.guangsudalao.top%2Ffeed%2F',
            // url: 'https://blog.yfun.top/search.json',
            success: function (data) {
                var data = JSON.parse(data).items;
                // var data = JSON.parse(data);
                var container = document.getElementById("posts-label");
                for (var i = 0; i <= 4; i++) {
                    var element = document.createElement('a');
                    element.href = data[i].link;
                    // element.href = "https://blog.mcxiaolan.top" + data[i].url;
                    element.classList = "mdui-list-item mdui-ripple";
                    element.textContent = data[i].title;
                    element.target = "blank"
                    container.appendChild(element);
                }
                $("#post-spinner").remove();
            }
        });
        /* CYF 的 API 删了，到时候补上 */
        /* getWeather(); */
    }
}


// 赞赏栏
var tab = new mdui.Tab('#support-tab');
document.getElementById('support').addEventListener('open.mdui.dialog', function () {
    tab.handleUpdate();
});


var support = new mdui.Dialog('#support');

function qqpay() {
    window.open("https://cdn.jsdelivr.net/gh/mcxiaolan/jsdelivr@master/qqpay.png");
    // support.open();
}

var support = new mdui.Dialog('#support');

function wechatpay() {
    window.open("https://cdn.jsdelivr.net/gh/mcxiaolan/jsdelivr@master/wechatpay.png");
    // support.open();
}

switch (getParam('ref')) {
    case 'donate':
        donate();
        break;
    default:
        break;
}
function getWeather() {
    if (getParam("city") !== "") {
        $.ajax({
            method: 'GET',
            url: 'https://api.cyfan.top/weather?location=' + getParam("city"),
            success: function (d) {
                var d = JSON.parse(d);
                var weatherDay = d.weather[0].info.day;
                var weatherNight = d.weather[0].info.night;
                document.getElementById("day-weather").innerHTML = `<h3 class="mdui-text-center">${weatherDay[1]}, ${weatherDay[2]}°C, ${weatherDay[4]}（${weatherDay[3]}）</h3>
                `
                document.getElementById("night-weather").innerHTML = `<h3 class="mdui-text-center">${weatherNight[1]}, ${weatherNight[2]}°C, ${weatherNight[4]}（${weatherNight[3]}）</h3>
                `
                console.log(weatherDay, weatherNight);
                $("#weather-spinner").remove();
            }
        });
    } else {
        $.ajax({
            method: 'GET',
            url: 'https://api.myip.la/cn?json',
            success: function (data) {
                var data = JSON.parse(data);
                $.ajax({
                    method: 'GET',
                    url: 'https://api.cyfan.top/weather?location=' + data.location.city,
                    success: function (d) {
                        var d = JSON.parse(d);
                        var weatherDay = d.weather[0].info.day;
                        var weatherNight = d.weather[0].info.night;
                        document.getElementById("day-weather").innerHTML = `<h3 class="mdui-text-center">${weatherDay[1]}, ${weatherDay[2]}°C, ${weatherDay[4]}（${weatherDay[3]}）</h3>
                        `
                        document.getElementById("night-weather").innerHTML = `<h3 class="mdui-text-center">${weatherNight[1]}, ${weatherNight[2]}°C, ${weatherNight[4]}（${weatherNight[3]}）</h3>
                        `
                        console.log(weatherDay, weatherNight);
                        $("#weather-spinner").remove();
                    }
                });

            }
        });
    }

}

if (document.referrer) {
    console.log(document.referrer);


    console.log(
        '%c请注意！我们不会收集并发送上述的来源网址信息！',
        'color: red'
    );
}


// 获取原始的页面标题
var normal_title = document.title;
// 监听页面的可见性
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden') {
        // 如果页面不可见
        // 设定新标题
        document.title = 'Oops! 页面崩溃了！';
    } else {
        // 欢迎信息
        document.title = "好耶！页面修好了！";
        // 1 秒后恢复原始信息
        setTimeout(function () {
            document.title = normal_title
        }, 1000)
    }
});
