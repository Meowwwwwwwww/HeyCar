;
(function(window, $) {
    // 工具函数
    window.util = {
        initSlideH: function(obj, state, src, linkState) { // 轮播
            var _self = this;
            var obj = $(obj);
            var targetObj = state == "base" ? obj.find('.focus-inner .pic') : obj.find('ul');
            var controlObj = state == "base" && obj.find('.focus-control a');
            var prevObj = state != "base" && obj.find('.prev');
            var nextObj = state != "base" && obj.find('.next');
            var config = state == "base" ? { control: controlObj, prevBtn: false, nextBtn: false } : { control: false, prevBtn: prevObj, nextBtn: nextObj };

            return new Slide({
                target: targetObj,
                prevBtn: config.prevBtn,
                nextBtn: config.nextBtn,
                control: config.control,
                effect: config.effect,
                effect: state,
                autoPlay: false,
                merge: false,
                animateTime: 600,
                link: linkState,
                onchange: function() {
                    _self.replaceSrc(this.target[this.curPage], src);
                    if (obj.attr('id') == 'JfocusPlst' && obj.find('.icon-qj')) {
                        var iconQj = obj.find('.icon-qj');
                        if (this.curPage == 3) {
                            iconQj.addClass('hide');
                        } else {
                            iconQj.removeClass('hide');
                        }
                    }
                }
            });
        },
        initSlideV: function(obj) { // 上下文字滚动
            var targetObj = $(obj).find('a');
            if (targetObj.length <= 1) { return; }
            return new Slide({
                target: targetObj,
                control: false,
                direction: 'y',
                effect: 'slide',
                height: 40,
                autoPlay: true,
                merge: true,
                animateTime: 500
            });
        },
        initSlideChange: function(obj, btn) { // 换一换
            if (!obj) return;
            var _self = this;
            _self.replaceSrc($(obj).get(0), "#src");
            _self.replaceSrc($(obj).get(0), "src1");
            new Slide({
                target: $(obj).find('ul'),
                nextBtn: $(btn),
                effect: 'base',
                control: false,
                autoPlay: false,
                onchange: function() {
                    _self.replaceSrc(this.target[this.curPage], "src1");
                }
            });
        },
        replaceSrc: function(obj, srcName) { //替换图片
            if (!obj || 'object' != typeof obj) return;
            var imgArr = typeof obj.find == 'function' ? obj.find('img') : obj.getElementsByTagName('img');
            for (var i = 0; i < imgArr.length; i++) {
                var oimg = imgArr[i];
                var lazySrc = oimg.getAttribute(srcName);
                if (lazySrc) {
                    oimg.src = lazySrc;
                    oimg.removeAttribute(srcName);
                }
            }
        },
        rpSrcMerge: function(obj, srcName) { // 替换带有merge的轮播图
            var imgs = $("img", obj);
            if (!imgs) return;
            for (var i = 0, len = imgs.length; i < len; i++) {
                var img = $(imgs).eq(i);
                if ($(img).attr(srcName)) {
                    var picUrl = $(img).attr(srcName);
                    $(img).attr("src", picUrl);

                }
            }
        },
        initLazy: function(id, src) { // 懒加载
            Lazy.init(Lazy.create({
                lazyId: id,
                trueSrc: src,
                offset: 100,
                delay: 100,
                delay_tot: 1000
            }));
        },
        tabCtrl: function(target, ctrl, cls, fn) { // hover选项卡切换（延迟效果+回调）
            var _self = this;
            var target = $(target);
            var ctrls = $(ctrl);

            if (ctrls.attr('rel') == 'all') {
                fn && fn(target);
            } else {
                fn && fn(target.eq(0));
                _self.replaceSrc(target.eq(0), 'src1');
            }

            var timmer;
            ctrls.each(function(index, el) {
                ctrls.eq(index).bind('mouseover', function() {
                    var $self = $(this);
                    timmer = setTimeout(function() {
                        var rel = $self.attr('rel');
                        $self.addClass('current').siblings().removeClass('current');
                        rel == 'all' ? target.removeClass('hide') : target.eq(index).removeClass(cls).siblings().addClass(cls);

                        // 车型模块平行进口车显示
                        target.eq(index).siblings('.con-px') && target.eq(index).removeClass(cls).siblings('.con-px').removeClass(cls);

                        _self.replaceSrc(target.eq(index), 'src1');
                        fn && fn(target.eq(index));
                    }, 150)
                }).bind('mouseout', function(event) {
                    clearTimeout(timmer);
                });
            });
        },
        clickCtrl: function(obj, cls) { // 单个点击切换
            $(obj).bind('click', function(event) {
                $(obj).toggleClass(cls);
                event.stopPropagation();
            });
        },
        hoverCtrl: function(obj, cls) { // 单个hover切换（延迟）
            var timmer;
            $(obj).bind('mouseover', function(event) {
                clearTimeout(timmer);
                timmer = setTimeout(function() {
                    $(obj).addClass(cls);
                }, 100)

            }).bind('mouseout', function(event) {
                clearTimeout(timmer);
                timmer = setTimeout(function() {
                    $(obj).removeClass(cls);
                }, 200)
            });
        },
        toggleHover: function(target, cls, type) { //多个元素hover切换 type==1时，有鼠标移出切换
            var target = $(target);
            target.each(function(index, el) {
                target.eq(index).bind('mouseover', function() {
                    $(this).addClass(cls).siblings().removeClass(cls);
                });

                if (type && type == 1) {
                    target.eq(index).bind('mouseout', function() {
                        $(this).removeClass(cls);
                    });
                }
            });
        },
        toggleCtrl: function(target, ctrl, cls, fn) { // 点击选项卡切换（回调）
            var target = $(target);
            var ctrls = $(ctrl);

            ctrls.each(function(index, el) {
                ctrls.eq(index).bind('click', function(event) {
                    event.stopPropagation();
                    target.eq(index).parent().toggleClass(cls).siblings().removeClass(cls);
                    fn && fn(target.eq(index), $(this));
                });
            });
        },
        typeTab: function(target, ctrl) { // 根据rel判断的选项卡切换 (无序，带延迟效果)
            var ctrls = $(ctrl);
            var cons = $(target);
            var timmer;
            ctrls.each(function(index, el) {
                ctrls.eq(index).bind('mouseover', function() {
                    var $self = $(this);
                    timmer = setTimeout(function() {
                        var ctrlRel = $self.attr("rel");
                        $self.addClass('current').siblings().removeClass('current');
                        if (ctrlRel == "all") { // 全部
                            cons.removeClass('hide');
                        } else { // 其他
                            cons.each(function(index, el) {
                                var consRel = cons.eq(index).attr("rel");
                                consRel == ctrlRel ? cons.eq(index).removeClass('hide') : cons.eq(index).addClass('hide');
                                consRel == "px" && cons.eq(index).removeClass('hide'); // 平行进口车一直显示
                            });
                        }
                    }, 150);
                }).bind('mouseout', function(event) {
                    clearTimeout(timmer);
                });
            });
        },
        placeHolder: function(obj) { // placeHolder模拟
            var inputObj = $(obj).find('input');
            if (!inputObj) return;

            inputObj.each(function(index, el) {
                inputObj.eq(index).bind('click', function() {
                    var str = $(this).attr("data-str");
                    var val = $(this).attr("value");
                    val == str && $(this).attr('value', '').addClass('on');
                }).bind('blur', function() {
                    var str = $(this).attr("data-str");
                    var val = $(this).val();
                    val == '' && $(this).attr('value', str).removeClass('on');
                });

            });
        },
        checkPhone: function(obj, errObj) { // 验证手机号
            var reg = /^0{0,1}1[0-9]{10}$/,
                val = $(obj).val();

            if (val == "" || val == "请输入手机号码") { //为空     
                $(errObj).removeClass('vhide');
                return false;
            } else if (!reg.test(val)) { //错误号码  
                $(errObj).removeClass('vhide');
                return false;
            } else {
                $(errObj).addClass('vhide');
                return true;
            }
        },
        checkName: function(obj, errObj) { // 验证姓名
            var reg = /^[A-Za-z\u4E00-\u9FA5]{1,20}$/,
                val = $(obj).val();

            if (val == "" || val == "请填写您的称呼") { //为空
                $(errObj).removeClass('vhide');
                return false;
            } else if (!reg.test(val)) { //错误 
                $(errObj).removeClass('vhide');
                return false;
            } else {
                $(errObj).addClass('vhide');
                return true;
            }
        },
        showMore: function(obj) { //展开更多
            var obj = $(obj);
            var parentNode = obj.parent();
            obj.bind('click', function(event) {
                parentNode.hasClass('show') ? parentNode.removeClass('show') : parentNode.addClass('show');
                event.stopPropagation();
            });
        },
        setMaskH: function(id) { // 设置蒙层背景高度
            var bgElem = document.getElementById(id);
            if(window.XMLHttpRequest) return;
            var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            bgElem.style.height = _scrollHeight + "px";
            
        },
        checkTime: function(n) { // 时间格式化
            if (n > 0) {
                if (n <= 9) {
                    n = "0" + n;
                }
                return String(n);
            } else {
                return "00";
            }
        },
        getTime: function(expiry, obj) { // 倒计时
            var _self = this;
            if (expiry == "" || !obj)  return; 
            var now = new Date();
            var expiry = expiry;
            var a = now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            var b = expiry;
            var startTime = new Date(a);
            var endTime = new Date(b);

            if (endTime <= now) {
                obj.innerHTML = "<i class='red'>0</i>天<i class='red'>0</i>时<i class='red'>0</i>分";
            } else {
                var days = (endTime - now) / 1000 / 60 / 60 / 24;
                var daysRound = _self.checkTime(Math.floor(days));
                var hours = (endTime - now) / 1000 / 60 / 60 - (24 * daysRound);
                var hoursRound = _self.checkTime(Math.floor(hours));
                var minutes = (endTime - now) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                var minutesRound = _self.checkTime(Math.floor(minutes));
                var seconds = (endTime - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                var secondsRound = _self.checkTime(Math.round(seconds));
                obj.innerHTML = "离报名结束还有<i class='red'>" + daysRound + "</i>天<i class='red'>" + hoursRound + "</i>时<i class='red'>" + minutesRound + "</i>分";

                function _getTime(expiry) {
                    return function() {
                        _self.getTime(expiry, obj)
                    }
                }
                newtime = window.setTimeout(_getTime(expiry, obj), 1000);
            }
        },
        showPop: function(popObj) { // 显示弹层
            $(popObj).removeClass('hide');
            util.setMaskH("JbgMark");
            $('#JbgMark').removeClass('hide');
            $('body,html').css('overflow', 'hidden');
        },
        hidePop: function(popObj) { // 隐藏弹层
            $(popObj).addClass('hide');
            $('#JbgMark').addClass('hide');
            $('body,html').css('overflow', '');
        },
        beautySel: function(obj) { // 下拉框美化初始化
            $(obj).find('.bselect-wrapper').each(function(index, el) {
                $(this).beautySelect();
            });
            $(obj).find('select').beautySelect();
        }
    };
}(window, jQuery));
// 回到顶部
! function() {
    function a(a, b, c) {
        if ("function" == typeof window.addEventListener) a.addEventListener(b, c, !1);
        else {
            var d = function() {
                c.call(a, window.event)
            };
            a.attachEvent("on" + b, d)
        }
    }

    function b(a) {
        return document.getElementById(a)
    }

    function e() {
        var a = c.scrollTop ? c.scrollTop : d.scrollTop,
            e = c.clientHeight ? c.clientHeight : d.clientHeight,
            f = b("btn-goTop"),
            g = a + e;
       f.style.display = g > 2 * e ? "block" : "none"
    }
    var c = document.documentElement,
        d = document.body;
    if (b("JfloatBtns")) {
        b("JfloatBtns").style.display = window.screen.width <= 1024 ? "none" : "",
            a(window, "scroll", e),
            a(window, "resize", e)
    }
}();


// 最近看过的车
function historyM(){
    $('#Jhistory').bind('click', function(event) {
        $('#JpopHistory').toggleClass('hide');
        event.stopPropagation();
    });

    $('#JcloseHistory').bind('click',  function() {
       $('#JpopHistory').addClass('hide'); 
    });

    $('#JclearHistory').bind('click', function() {
        $('#JhistoryCon').html('');
    });

    $('body').bind('click', function() {
        if(!$('#JpopHistory').hasClass('hide')){
            $('#JpopHistory').addClass('hide');
        }
    });

    closeHis();

    $('#JpopHistory').bind('click', function(event) {
       event.stopPropagation();
    });
}

function closeHis(){
    $('#JhistoryCon li').each(function(index, el) {
        $('#JhistoryCon li').eq(index).find('.icon-close').bind('click',  function() {
            $(this).parent().remove();
        });
    });
}
historyM();
/* 左树+导航相关 S*/
var treeFn = (function() {
    var setBottomFlg = true; // 防止设置padding-bottom多次执行
    var timmer;
    
    // 左树图片按需加载
    var treeLazy = {
        init: function(opt) {
            this.setOptions(opt);
            this.load();
        },
        setOptions: function(opt) {
            this.holderSrc = opt.holderSrc;
            this.wrapId = opt.wrapId;
            this.imgList = [];
            this.timer = null;
            var targets = null;
            if (document.querySelectorAll) {
                targets = document.querySelectorAll("#" + this.wrapId + " img")
            } else {
                targets = document.getElementById(this.wrapId).getElementsByTagName("img")
            }
            var n = 0,
                len = targets.length;
            // 把元素存到数组里
            for (; n < len; n++) {
                if (targets[n].getAttribute(this.holderSrc)) {
                    this.imgList.push(targets[n]);
                }
            }

        },
        load: function() {
            var st = document.body.scrollTop || document.documentElement.scrollTop,
                clientH = document.documentElement.clientHeight,
                scrollArea = st + clientH;
            for (var n = 0; n < this.imgList.length; n++) {
                var offsetTop = this.imgList[n].getBoundingClientRect().top + st,
                    imgH = this.imgList[n].clientHeight;
                if (scrollArea > (offsetTop - 200) && (imgH + offsetTop) > st) {
                    var _src = this.imgList[n].getAttribute(this.holderSrc);
                    this.imgList[n].setAttribute('src', _src);
                    this.imgList.splice(n, 1); //删除已经加载完的元素
                    n--;
                }
            }
        }
    }

    // 左树图片预加载（dom加载完后执行）
    window.treeImgLazy = function() {
        var leftTree = document.getElementById("leftTree");  
        addEventHandler(leftTree, "scroll", function(event) {
            treeLazy.init({
                wrapId: 'leftTree',
                holderSrc: 'src2'
            });
        })
    };

    // 锚点定位事件, t==1时为字母锚点定位（dom加载完后执行）
    window.treeButton = function(tid, t) {
        var mum = document.getElementById(tid);
        if (!mum) return;

        var tB = getOffsetTop(mum, t);
        var treeInfo = document.getElementById("leftTree");
        if (!treeInfo) return;
        treeInfo.scrollTop = tB;
    };

    // 事件绑定
    function addEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        }
    };

    // 获取距离顶部高度
    function getOffsetTop(ele, t) {
        var t = t ? t : -35;
        while (ele.id != "leftTree") {
            t += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return t;
    };

    //测试左树可见区域的高度
    function leftTreeClientHeight() {
        var leftTree = document.getElementById("leftTree");
        if (!leftTree) return;

        var offtop = leftTree.getBoundingClientRect().top;
        var dH = document.documentElement.clientHeight;
        leftTree.style.height = dH - offtop + "px";

        var Jdoc = document.getElementById("Jdoc");
        if (Jdoc && Jdoc.offsetHeight < dH) Jdoc.style.height = dH + "px";

        setBottom();
    }; 

    // 设置padding-bottom    
    function setBottom() {
        if(!setBottomFlg) return;
        var geshu = $("#tree li.pictreeTit").last().nextAll().length;
        var gaodu = $("#leftTree").height() - geshu * 52;
        $("#tree").css("padding-bottom", gaodu);
        setBottomFlg = false;
    } 

    // 初始化
    function treeInit() {
       leftTreeClientHeight(); // 左树高度
       addEventHandler(window, "resize", function() { leftTreeClientHeight() });
    };

    // 已选项浮动
    function fixedSelect(isFixed) {
        var H2 = isFixed ? 55 : 0;
        var JselectBanner = document.getElementById("JselectBanner");
        var bannerH = $(JselectBanner).find('.select-banner').height();
        if (!JselectBanner) return;
        var selH = JselectBanner.getBoundingClientRect().top;
        JselectBanner.style.height = bannerH + "px";
        selH <= H2 && !$("#JselectBanner").hasClass('select-fixed') && $("#JselectBanner").addClass('select-fixed')
        selH > H2 && $("#JselectBanner").hasClass('select-fixed') && $("#JselectBanner").removeClass('select-fixed')
    };

    // 页面滚动,nav-fixedA:导航浮动，nav-fixedB:导航不浮动
    function navScroll() {
        var JtopbarAdd = document.getElementById("JtopbarAdd"); // 公共头部
        var Jtopbar = document.getElementById("Jtopbar"); // 整个头部    
        var isFixed = $(window).height() > 800 ? true : false;
        var scrollT = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var topBarH = isFixed ? (JtopbarAdd.clientHeight + 30) : (Jtopbar.clientHeight + 30); // 30 为 navibar 的高度
        if (scrollT >= topBarH) {
            isFixed && !$("body").hasClass("nav-fixedA") && $("body").addClass('nav-fixedA')
            !isFixed && !$("body").hasClass("nav-fixedB") && $("body").addClass('nav-fixedB')
        } else {
            $("body").hasClass('nav-fixedA') && $("body").removeClass('nav-fixedA')
            $("body").hasClass('nav-fixedB') && $("body").removeClass('nav-fixedB')
        }
        clearTimeout(timmer);
        timmer = setTimeout(leftTreeClientHeight,0);
        fixedSelect(isFixed); // 已选项浮动
        treeLazy.init({ wrapId: 'leftTree', holderSrc: 'src2' }); // 左树图片按需
    };

    return {
        init: function() {
            treeInit();
            navScroll(); // 导航浮动
            addEventHandler(window, "scroll", navScroll);
            addEventHandler(window, "resize", navScroll);
        }
    }
}());
$(document).ready(function() {
    treeFn.init(); // 左树+页面浮动相关
    util.hoverCtrl("#JnavDropPic", "show"); // 导航图片
    util.hoverCtrl("#Jtool", "show"); // 导航常用工具
    screen.width < 1520 ? $("#j-qcbj-fixed").hide() : $("#j-qcbj-fixed").show(); // 酷养车推广入口
});
/* 左树+导航相关 E*/ 
/*商城js*/
;(function(){
    // 商城倒计时
    window.calTime = function(obj){
        var countTimes = $(".count-time"); //获取
        countTimes.each(function(index, el) {   
            var endTime = $(this).attr("end-time"),         
                obj = countTimes[index];
            util.getTime(endTime, obj);
        });
    }

    // 商城超级购车团事件绑定
    window.gctBtnClick = function() {
        showGctPop('.gct_pic'); //点击图片
        showGctPop('.btn-gct'); //点击按钮
    }

    // 显示购车团弹窗
    function showGctPop(ele){
        var TPL = '<div class="bg-mark" id="JbgMark"></div>'+
                '<div class="pop-wechat" id="JpopWechat">'+
                    '<p class="m-tit">{title}</p>'+
                    '<p class="code-img">'+
                        '<img src="{image}" alt="" width="146" height="146" class="s-lazyimg"/>'+
                        '<span>参与品牌{brand}</span>'+
                    '</p>'+
                    '<p class="m-tip">微信/浏览器扫描二维码用手机报名更优惠</p>'+
                    '<i class="m-close" id="Jclose"></i>'+
                '</div>';

        $(ele).each(function(index, el) {
            $(ele).bind('click', function(event) {
                var infor = $(this).attr("data-infor");
                var data = infor.split("|");
                if(document.getElementById("JpopWechat"))  { // 兼容是否引入结构
                    $("#JpopWechat").remove();
                    $("#JbgMark").remove();
                }
                var tpl = TPL.replace("{title}", data[0]).replace("{image}", data[1]).replace("{brand}", data[2]);
                $("body").append(tpl); 
                $('#Jclose').click(function(event) {
                    $("#JpopWechat").remove();
                    $("#JbgMark").remove();
                }); 
            });
        });
    }

    // 鼠标交互
    window.mallHandler = function(){
        $("#JmallFocus").hover(function() {
            $(this).find('.prev,.next').removeClass('hide');
        }, function() {
            $(this).find('.prev,.next').addClass('hide');
        }); 
    }
    mallHandler();
    
}());
 
// Cookie
var Cookie = {
    get: function(check_name) {
        check_name = encodeURIComponent(check_name);
        var a_all_cookies = document.cookie.split(';');
        var a_temp_cookie = '';
        var cookie_name = '';
        var cookie_value = '';
        var b_cookie_found = false;
        var i = '';
        var len = a_all_cookies.length;
        for (i = 0; i < len; i++) {
            a_temp_cookie = a_all_cookies[i].split('=');
            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
            if (cookie_name == check_name) {
                b_cookie_found = true;
                if (a_temp_cookie.length > 1) { cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, '')); }
                return cookie_value;
                break;
            }
            a_temp_cookie = null;
            cookie_name = '';
        }
        if (!b_cookie_found) { return null; }
    },
    set: function(name, value, expires, path, domain, secure) {
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
    },
    remove: function(name) { Cookie.set(name, 1, -1, "/", "pcauto.com.cn"); }
};  
/*选车 S*/
function selCarDefault() {
    var locationHref = window.location.href;
    var cookieName = locationHref.match(/\/cars\//g) ? "choose_cars_" : "choose_price_"; // 展开收起cookie名(choose_cars_:choose_price_:报价索引)
    var cookieNameA = locationHref.match(/\/shangjia\//g) ? "choose_filter_sj_" : (locationHref.match(/\/market\//g) ? "choose_filter_mk_" : "choose_filter_"); // 经销商：choose_filter_sj_ | 购车优惠：choose_filter_mk_ | 报价索引：choose_filter_
    var JchooseNew = $("#JchooseNew");
    var hotDiv = $("#hotDiv");
    var selCarFn = {
        moreHover: function(){ // 更多交互
            var hasMore = JchooseNew.find(".has-more");
            hasMore.hover(function() {
                $(this).toggleClass('has-more-on');
            });    
        },       
        jiebieFn: function(){ // 级别交互
            var hasMoreCol = JchooseNew.find(".has-more-col");
            var jibie = JchooseNew.find(".jibie");

            // 更多
            hasMoreCol.mouseover(function() {
                $(this).addClass("has-more-active").siblings(".has-more-col").removeClass("has-more-active");
            });

            // 级别鼠标移出整块显示默认高亮模块。。。          
            jibie.bind('mouseleave', function(e) {
                var target = $(this).find(".select").parent().parent().parent();
                target.addClass("has-more-active").siblings().removeClass("has-more-active");
            });  
        },     
        setCookieOpen: function(name){ // 设置展开cookie       
            Cookie.set(name + "open", 1, 1, "/", "pcauto.com.cn");
            Cookie.remove(name + "close");
        },  
        setCookieClose: function(name){ // 设置收起cookie                 
            Cookie.set(name + "close", 1, 1, "/", "pcauto.com.cn");
            Cookie.remove(name + "open");
        },
        hotBrandHover: function(){ // 品牌交互
            var hotDivAs = hotDiv.find(".brandLetter a");
            var brandItem = JchooseNew.find(".brandItem");

            // 更多
            hotDivAs.mouseenter(function(event) {
                $(this).addClass("s").siblings().removeClass("s");
                $("#hotDiv>p").slice(1).hide().eq($(this).index()).show();
            });

            // 品牌鼠标移出整块显示默认高亮模块。。。
            brandItem.bind("mouseleave", function(e) {
                var target = hotDiv.find(".select").parent(".brandDiv");
                var index = target.index() - 1;
                if (index < 0) return;
                var ctrl = $(this).find('.brandLetter .tag').eq(index);
                ctrl.addClass('s').siblings("a").removeClass("s");
                target.show().siblings(".brandDiv").hide();
            });
        },
        toggleFilterMore: function() { // 展开收起更多条件
            var self = this,
                btn = $('#ctrlBtn'),
                items = $('#JchooseNew div.getItem'),
                strOpen = '收起更多条件（变速箱、配置等）<em class="icon-arr"></em>',
                strClose = '展开更多条件（变速箱、配置等）<em class="icon-arr"></em>';
            if(btn.length <= 0) return;

            btn.bind("click", function(e) {
                e.preventDefault();
                if (btn.hasClass('ctrlBtnOpen')) { // 收起
                    btn.removeClass('ctrlBtnOpen').html(strClose);
                    items.each(function() {
                        $(this).attr('rel') === '1' && $(this).addClass('hide');
                    });
                    var H = $("body").hasClass("nav-fixedA") ?JchooseNew.offset().top - 55 : JchooseNew.offset().top;
                    $(window).scrollTop(H);
                    self.setCookieClose(cookieName);
                } else { // 展开
                    btn.addClass('ctrlBtnOpen').html(strOpen);
                    items.removeClass('hide');
                    self.setCookieOpen(cookieName);
                }
            });
            
            // cookie记录展开收起
            if (Cookie.get(cookieName + "close")) { // 收起
                btn.removeClass('ctrlBtnOpen').html(strClose);
                items.each(function() {
                    $(this).attr('rel') === '1' && $(this).addClass('hide');
                });
            } else if(Cookie.get(cookieName + "open")){ // 展开
                btn.addClass('ctrlBtnOpen').html(strOpen);
                items.removeClass('hide');
            }
        },
        toggleMore: function(){ // 展开收起筛选
            var self = this;
            var JsubClose = JchooseNew.find('.subClose'),
                dataType = JsubClose.attr("data-type"),
                strOpen = dataType == 1 ? '收起筛选<em class="icon-arr"></em>' : '收起找车筛选<em class="icon-arr"></em>',
                strClose = dataType == 1 ? '展开筛选<em class="icon-arr"></em>' : '展开找车筛选<em class="icon-arr"></em>';
            if(JsubClose.length <= 0) return;

            JsubClose.bind('click',  function() { 
                if(JchooseNew.hasClass('JchooseNewFold')){ // 展开
                    JchooseNew.removeClass('JchooseNewFold');
                    $(this).html(strOpen);
                    self.setCookieOpen(cookieNameA);
                }else {
                    JchooseNew.addClass('JchooseNewFold'); // 收起
                    $(this).html(strClose);
                    self.setCookieClose(cookieNameA);
                }
            });

            // cookie记录筛选展开收起
            if(Cookie.get(cookieNameA + "open")){ // 展开
                JchooseNew.removeClass('JchooseNewFold');
                JsubClose.html(strOpen);
            }else if(Cookie.get(cookieNameA + "close")){
                JchooseNew.addClass('JchooseNewFold'); // 收起
                JsubClose.html(strClose);
            }
        },
  
        init: function(){
            this.moreHover();
            this.jiebieFn();
            this.hotBrandHover();
            this.toggleFilterMore();
            this.toggleMore();
            // 链接匹配是否默认展开
            // location.href.match(/pz_\d|zw\d|jq\d|cs\d|rl\d|qd\d|cz\d|gb\d|l\d|x\d/i) && this.toggleFilterMore();
        }
    };

    // 精准找车浮动按钮点击事件(外部调用)
    window.showFilter = function(){
        var JsubClose = JchooseNew.find('.subClose'),
            dataType = JsubClose.attr("data-type"),
            strOpen = dataType == 1 ? '收起筛选<em class="icon-arr"></em>' : '收起找车筛选<em class="icon-arr"></em>',
            strClose = dataType == 1 ? '展开筛选<em class="icon-arr"></em>' : '展开找车筛选<em class="icon-arr"></em>';        

        selCarFn.setCookieOpen(cookieNameA);

        if(JsubClose.length <= 0) return;
        if(JchooseNew.hasClass('JchooseNewFold')){ // 展开
            JchooseNew.removeClass('JchooseNewFold');
            JsubClose.html(strOpen);
        }
    }

    selCarFn.init();
}
selCarDefault();
/*选车 E*/     


//去掉getScript方法自带的时间戳参数
$.ajaxSetup({cache: true });

// 一键找车
function closeTj(){
    $('#JmodTj a').each(function(index, el) {
        $('#JmodTj a').eq(index).on('click', '.icon-close', function(event) {
            event.preventDefault();            
            $(this).parent().parent().remove();
            typeof closeTjCallback == "function" && closeTjCallback($(this));
        });
    });
}

// 新车速递切换
function newCarStTab(){
    var target = $("#JmodSt .contentdiv");
    var ctrls = $("#JmodSt .tab");
    var timmer;
    ctrls.each(function(index, el) {
        ctrls.eq(index).bind('mouseover', function() {
            var $self = $(this);
            timmer = setTimeout(function(){
                $self.addClass('current').siblings().removeClass('current');
                target.eq(index).css({"display": "block"}).siblings().css({"display": "none"});
            },150)
        }).bind('mouseout', function(event) {
            clearTimeout(timmer);
        });
    });
};

// 新能源车排行榜交互
function syTopFn() {
  var hover = function(obj) {
    $(obj).on('mouseover', 'li', function(event) {
      $(this)
        .addClass('on')
        .siblings()
        .removeClass('on');
      util.replaceSrc($(this), 'src1');
    });
  };

  var tab = function() {
    var JmodSyTopB = $('#JmodSyTopB');
    var csTop = JmodSyTopB.find('.csTop');
    csTop.each(function(index, el) {
      var target = $(this).find('ul');
      util.replaceSrc(target.eq(0).find('li').eq(0), 'src1');
      hover($(this));
      csTop.on('click', '.tab', function(event) {
        var target = $(this).parents('.csTop').find('ul').eq($(this).index());
        util.replaceSrc(target.eq(0).find('li').eq(0), 'src1');
        $(this)
          .addClass('current')
          .siblings()
          .removeClass('current');
        target
          .removeClass('hide')
          .siblings()
          .addClass('hide');
        util.toggleHover($(this), 'on');
        hover(target);
      });

    });
  };
  tab();
}



//懒加载
var jsList_ = [ 
    {
        id: 'JmodTj',
        js: 'closeTj();'
    },
    {
        id: 'JmodSt',
        js: 'newCarStTab()'
    },{
        id: 'JmodSyTopB',
        js: 'syTopFn();'
    }
];

//懒加载
var jsload = Lazy.create({
    lazyId: "Jlazy_load",
    trueSrc: '#src',
    jsList: jsList_,
    offset: 100,
    delay: 100,
    delay_tot: 1000
});
Lazy.init(jsload);