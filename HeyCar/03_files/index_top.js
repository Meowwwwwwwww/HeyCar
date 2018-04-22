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


// 排行榜左树
function topTreeInit(){
	$('#leftNav .ctrl').bind('click', function() {
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$(this).next('ul').addClass('hide');
		} else {
			$(this).addClass('on');
			$(this).next('ul').removeClass('hide');
		}
	});	

	// 锚点定位
    var prevH = 0;
    $("#leftTree .cur").parents("li").eq(2).prevAll().each(function(index, el) {
        prevH += $(el).height();
    });
    $("#leftTree").scrollTop(prevH);
}

function rankFn(){
	$('#JboxRank li').bind('mouseover', function() {
		$(this).parent().find('li').removeClass('on');
		$(this).addClass('on');
		util.replaceSrc($(this), 'src1');
	});
	$('#JboxRank .rd, #JboxRank .rd-mark').bind('mouseover', function() {
		$('#rd-ts').css({
			'top': $(this).offset().top + 30 + 'px',
			'left': $(this).offset().left - 50 + 'px'
		}).show();
	}).bind('mouseleave', function() {
		$('#rd-ts').hide();
	});	
}

// 日期选择
function selDate(){
	$('.sel-date-tit').bind('click', function(event) {
		event.stopPropagation();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(".sel-date-box").hide();
		} else {
			$(this).addClass('active');
			$(".sel-date-box").show();
		}
	});

	$("body").bind('click',  function() {
		$(".sel-date-box").hide();
		$(".sel-date-tit").removeClass('active');
	});	
}

function showMonth(selectYear, currentYear) {
	if (selectYear == currentYear) {
		for (var i = currentMonth + 1; i <= 12; i++) {
			$("#month" + i).hide();
		}
	} else {
		for (var i = 1; i <= 12; i++) {
			$("#month" + i).show();
		}
	}
}

$(document).ready(function() {
    topTreeInit();
    rankFn();
    selDate();
});

//去掉getScript方法自带的时间戳参数
$.ajaxSetup({cache: true });

//懒加载
var jsload = Lazy.create({
    lazyId: "Jlazy_load",
    trueSrc: '#src',
    offset: 100,
    delay: 100,
    delay_tot: 1000
});
Lazy.init(jsload);

