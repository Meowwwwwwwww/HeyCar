;
(function(window, $) {
    // ���ߺ���
    window.util = {
        initSlideH: function(obj, state, src, linkState) { // �ֲ�
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
        initSlideV: function(obj) { // �������ֹ���
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
        initSlideChange: function(obj, btn) { // ��һ��
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
        replaceSrc: function(obj, srcName) { //�滻ͼƬ
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
        rpSrcMerge: function(obj, srcName) { // �滻����merge���ֲ�ͼ
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
        initLazy: function(id, src) { // ������
            Lazy.init(Lazy.create({
                lazyId: id,
                trueSrc: src,
                offset: 100,
                delay: 100,
                delay_tot: 1000
            }));
        },
        tabCtrl: function(target, ctrl, cls, fn) { // hoverѡ��л����ӳ�Ч��+�ص���
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

                        // ����ģ��ƽ�н��ڳ���ʾ
                        target.eq(index).siblings('.con-px') && target.eq(index).removeClass(cls).siblings('.con-px').removeClass(cls);

                        _self.replaceSrc(target.eq(index), 'src1');
                        fn && fn(target.eq(index));
                    }, 150)
                }).bind('mouseout', function(event) {
                    clearTimeout(timmer);
                });
            });
        },
        clickCtrl: function(obj, cls) { // ��������л�
            $(obj).bind('click', function(event) {
                $(obj).toggleClass(cls);
                event.stopPropagation();
            });
        },
        hoverCtrl: function(obj, cls) { // ����hover�л����ӳ٣�
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
        toggleHover: function(target, cls, type) { //���Ԫ��hover�л� type==1ʱ��������Ƴ��л�
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
        toggleCtrl: function(target, ctrl, cls, fn) { // ���ѡ��л����ص���
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
        typeTab: function(target, ctrl) { // ����rel�жϵ�ѡ��л� (���򣬴��ӳ�Ч��)
            var ctrls = $(ctrl);
            var cons = $(target);
            var timmer;
            ctrls.each(function(index, el) {
                ctrls.eq(index).bind('mouseover', function() {
                    var $self = $(this);
                    timmer = setTimeout(function() {
                        var ctrlRel = $self.attr("rel");
                        $self.addClass('current').siblings().removeClass('current');
                        if (ctrlRel == "all") { // ȫ��
                            cons.removeClass('hide');
                        } else { // ����
                            cons.each(function(index, el) {
                                var consRel = cons.eq(index).attr("rel");
                                consRel == ctrlRel ? cons.eq(index).removeClass('hide') : cons.eq(index).addClass('hide');
                                consRel == "px" && cons.eq(index).removeClass('hide'); // ƽ�н��ڳ�һֱ��ʾ
                            });
                        }
                    }, 150);
                }).bind('mouseout', function(event) {
                    clearTimeout(timmer);
                });
            });
        },
        placeHolder: function(obj) { // placeHolderģ��
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
        checkPhone: function(obj, errObj) { // ��֤�ֻ���
            var reg = /^0{0,1}1[0-9]{10}$/,
                val = $(obj).val();

            if (val == "" || val == "�������ֻ�����") { //Ϊ��     
                $(errObj).removeClass('vhide');
                return false;
            } else if (!reg.test(val)) { //�������  
                $(errObj).removeClass('vhide');
                return false;
            } else {
                $(errObj).addClass('vhide');
                return true;
            }
        },
        checkName: function(obj, errObj) { // ��֤����
            var reg = /^[A-Za-z\u4E00-\u9FA5]{1,20}$/,
                val = $(obj).val();

            if (val == "" || val == "����д���ĳƺ�") { //Ϊ��
                $(errObj).removeClass('vhide');
                return false;
            } else if (!reg.test(val)) { //���� 
                $(errObj).removeClass('vhide');
                return false;
            } else {
                $(errObj).addClass('vhide');
                return true;
            }
        },
        showMore: function(obj) { //չ������
            var obj = $(obj);
            var parentNode = obj.parent();
            obj.bind('click', function(event) {
                parentNode.hasClass('show') ? parentNode.removeClass('show') : parentNode.addClass('show');
                event.stopPropagation();
            });
        },
        setMaskH: function(id) { // �����ɲ㱳���߶�
            var bgElem = document.getElementById(id);
            if(window.XMLHttpRequest) return;
            var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            bgElem.style.height = _scrollHeight + "px";
            
        },
        checkTime: function(n) { // ʱ���ʽ��
            if (n > 0) {
                if (n <= 9) {
                    n = "0" + n;
                }
                return String(n);
            } else {
                return "00";
            }
        },
        getTime: function(expiry, obj) { // ����ʱ
            var _self = this;
            if (expiry == "" || !obj)  return; 
            var now = new Date();
            var expiry = expiry;
            var a = now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            var b = expiry;
            var startTime = new Date(a);
            var endTime = new Date(b);

            if (endTime <= now) {
                obj.innerHTML = "<i class='red'>0</i>��<i class='red'>0</i>ʱ<i class='red'>0</i>��";
            } else {
                var days = (endTime - now) / 1000 / 60 / 60 / 24;
                var daysRound = _self.checkTime(Math.floor(days));
                var hours = (endTime - now) / 1000 / 60 / 60 - (24 * daysRound);
                var hoursRound = _self.checkTime(Math.floor(hours));
                var minutes = (endTime - now) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                var minutesRound = _self.checkTime(Math.floor(minutes));
                var seconds = (endTime - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                var secondsRound = _self.checkTime(Math.round(seconds));
                obj.innerHTML = "�뱨����������<i class='red'>" + daysRound + "</i>��<i class='red'>" + hoursRound + "</i>ʱ<i class='red'>" + minutesRound + "</i>��";

                function _getTime(expiry) {
                    return function() {
                        _self.getTime(expiry, obj)
                    }
                }
                newtime = window.setTimeout(_getTime(expiry, obj), 1000);
            }
        },
        showPop: function(popObj) { // ��ʾ����
            $(popObj).removeClass('hide');
            util.setMaskH("JbgMark");
            $('#JbgMark').removeClass('hide');
            $('body,html').css('overflow', 'hidden');
        },
        hidePop: function(popObj) { // ���ص���
            $(popObj).addClass('hide');
            $('#JbgMark').addClass('hide');
            $('body,html').css('overflow', '');
        },
        beautySel: function(obj) { // ������������ʼ��
            $(obj).find('.bselect-wrapper').each(function(index, el) {
                $(this).beautySelect();
            });
            $(obj).find('select').beautySelect();
        }
    };
}(window, jQuery));
// �ص�����
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


// ��������ĳ�
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
/* ����+������� S*/
var treeFn = (function() {
    var setBottomFlg = true; // ��ֹ����padding-bottom���ִ��
    var timmer;
    
    // ����ͼƬ�������
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
            // ��Ԫ�ش浽������
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
                    this.imgList.splice(n, 1); //ɾ���Ѿ��������Ԫ��
                    n--;
                }
            }
        }
    }

    // ����ͼƬԤ���أ�dom�������ִ�У�
    window.treeImgLazy = function() {
        var leftTree = document.getElementById("leftTree");  
        addEventHandler(leftTree, "scroll", function(event) {
            treeLazy.init({
                wrapId: 'leftTree',
                holderSrc: 'src2'
            });
        })
    };

    // ê�㶨λ�¼�, t==1ʱΪ��ĸê�㶨λ��dom�������ִ�У�
    window.treeButton = function(tid, t) {
        var mum = document.getElementById(tid);
        if (!mum) return;

        var tB = getOffsetTop(mum, t);
        var treeInfo = document.getElementById("leftTree");
        if (!treeInfo) return;
        treeInfo.scrollTop = tB;
    };

    // �¼���
    function addEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        }
    };

    // ��ȡ���붥���߶�
    function getOffsetTop(ele, t) {
        var t = t ? t : -35;
        while (ele.id != "leftTree") {
            t += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return t;
    };

    //���������ɼ�����ĸ߶�
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

    // ����padding-bottom    
    function setBottom() {
        if(!setBottomFlg) return;
        var geshu = $("#tree li.pictreeTit").last().nextAll().length;
        var gaodu = $("#leftTree").height() - geshu * 52;
        $("#tree").css("padding-bottom", gaodu);
        setBottomFlg = false;
    } 

    // ��ʼ��
    function treeInit() {
       leftTreeClientHeight(); // �����߶�
       addEventHandler(window, "resize", function() { leftTreeClientHeight() });
    };

    // ��ѡ���
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

    // ҳ�����,nav-fixedA:����������nav-fixedB:����������
    function navScroll() {
        var JtopbarAdd = document.getElementById("JtopbarAdd"); // ����ͷ��
        var Jtopbar = document.getElementById("Jtopbar"); // ����ͷ��    
        var isFixed = $(window).height() > 800 ? true : false;
        var scrollT = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var topBarH = isFixed ? (JtopbarAdd.clientHeight + 30) : (Jtopbar.clientHeight + 30); // 30 Ϊ navibar �ĸ߶�
        if (scrollT >= topBarH) {
            isFixed && !$("body").hasClass("nav-fixedA") && $("body").addClass('nav-fixedA')
            !isFixed && !$("body").hasClass("nav-fixedB") && $("body").addClass('nav-fixedB')
        } else {
            $("body").hasClass('nav-fixedA') && $("body").removeClass('nav-fixedA')
            $("body").hasClass('nav-fixedB') && $("body").removeClass('nav-fixedB')
        }
        clearTimeout(timmer);
        timmer = setTimeout(leftTreeClientHeight,0);
        fixedSelect(isFixed); // ��ѡ���
        treeLazy.init({ wrapId: 'leftTree', holderSrc: 'src2' }); // ����ͼƬ����
    };

    return {
        init: function() {
            treeInit();
            navScroll(); // ��������
            addEventHandler(window, "scroll", navScroll);
            addEventHandler(window, "resize", navScroll);
        }
    }
}());
$(document).ready(function() {
    treeFn.init(); // ����+ҳ�渡�����
    util.hoverCtrl("#JnavDropPic", "show"); // ����ͼƬ
    util.hoverCtrl("#Jtool", "show"); // �������ù���
    screen.width < 1520 ? $("#j-qcbj-fixed").hide() : $("#j-qcbj-fixed").show(); // �������ƹ����
});
/* ����+������� E*/ 
/*�̳�js*/
;(function(){
    // �̳ǵ���ʱ
    window.calTime = function(obj){
        var countTimes = $(".count-time"); //��ȡ
        countTimes.each(function(index, el) {   
            var endTime = $(this).attr("end-time"),         
                obj = countTimes[index];
            util.getTime(endTime, obj);
        });
    }

    // �̳ǳ����������¼���
    window.gctBtnClick = function() {
        showGctPop('.gct_pic'); //���ͼƬ
        showGctPop('.btn-gct'); //�����ť
    }

    // ��ʾ�����ŵ���
    function showGctPop(ele){
        var TPL = '<div class="bg-mark" id="JbgMark"></div>'+
                '<div class="pop-wechat" id="JpopWechat">'+
                    '<p class="m-tit">{title}</p>'+
                    '<p class="code-img">'+
                        '<img src="{image}" alt="" width="146" height="146" class="s-lazyimg"/>'+
                        '<span>����Ʒ��{brand}</span>'+
                    '</p>'+
                    '<p class="m-tip">΢��/�����ɨ���ά�����ֻ��������Ż�</p>'+
                    '<i class="m-close" id="Jclose"></i>'+
                '</div>';

        $(ele).each(function(index, el) {
            $(ele).bind('click', function(event) {
                var infor = $(this).attr("data-infor");
                var data = infor.split("|");
                if(document.getElementById("JpopWechat"))  { // �����Ƿ�����ṹ
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

    // ��꽻��
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
/*ѡ�� S*/
function selCarDefault() {
    var locationHref = window.location.href;
    var cookieName = locationHref.match(/\/cars\//g) ? "choose_cars_" : "choose_price_"; // չ������cookie��(choose_cars_:choose_price_:��������)
    var cookieNameA = locationHref.match(/\/shangjia\//g) ? "choose_filter_sj_" : (locationHref.match(/\/market\//g) ? "choose_filter_mk_" : "choose_filter_"); // �����̣�choose_filter_sj_ | �����Żݣ�choose_filter_mk_ | ����������choose_filter_
    var JchooseNew = $("#JchooseNew");
    var hotDiv = $("#hotDiv");
    var selCarFn = {
        moreHover: function(){ // ���ཻ��
            var hasMore = JchooseNew.find(".has-more");
            hasMore.hover(function() {
                $(this).toggleClass('has-more-on');
            });    
        },       
        jiebieFn: function(){ // ���𽻻�
            var hasMoreCol = JchooseNew.find(".has-more-col");
            var jibie = JchooseNew.find(".jibie");

            // ����
            hasMoreCol.mouseover(function() {
                $(this).addClass("has-more-active").siblings(".has-more-col").removeClass("has-more-active");
            });

            // ��������Ƴ�������ʾĬ�ϸ���ģ�顣����          
            jibie.bind('mouseleave', function(e) {
                var target = $(this).find(".select").parent().parent().parent();
                target.addClass("has-more-active").siblings().removeClass("has-more-active");
            });  
        },     
        setCookieOpen: function(name){ // ����չ��cookie       
            Cookie.set(name + "open", 1, 1, "/", "pcauto.com.cn");
            Cookie.remove(name + "close");
        },  
        setCookieClose: function(name){ // ��������cookie                 
            Cookie.set(name + "close", 1, 1, "/", "pcauto.com.cn");
            Cookie.remove(name + "open");
        },
        hotBrandHover: function(){ // Ʒ�ƽ���
            var hotDivAs = hotDiv.find(".brandLetter a");
            var brandItem = JchooseNew.find(".brandItem");

            // ����
            hotDivAs.mouseenter(function(event) {
                $(this).addClass("s").siblings().removeClass("s");
                $("#hotDiv>p").slice(1).hide().eq($(this).index()).show();
            });

            // Ʒ������Ƴ�������ʾĬ�ϸ���ģ�顣����
            brandItem.bind("mouseleave", function(e) {
                var target = hotDiv.find(".select").parent(".brandDiv");
                var index = target.index() - 1;
                if (index < 0) return;
                var ctrl = $(this).find('.brandLetter .tag').eq(index);
                ctrl.addClass('s').siblings("a").removeClass("s");
                target.show().siblings(".brandDiv").hide();
            });
        },
        toggleFilterMore: function() { // չ�������������
            var self = this,
                btn = $('#ctrlBtn'),
                items = $('#JchooseNew div.getItem'),
                strOpen = '������������������䡢���õȣ�<em class="icon-arr"></em>',
                strClose = 'չ�����������������䡢���õȣ�<em class="icon-arr"></em>';
            if(btn.length <= 0) return;

            btn.bind("click", function(e) {
                e.preventDefault();
                if (btn.hasClass('ctrlBtnOpen')) { // ����
                    btn.removeClass('ctrlBtnOpen').html(strClose);
                    items.each(function() {
                        $(this).attr('rel') === '1' && $(this).addClass('hide');
                    });
                    var H = $("body").hasClass("nav-fixedA") ?JchooseNew.offset().top - 55 : JchooseNew.offset().top;
                    $(window).scrollTop(H);
                    self.setCookieClose(cookieName);
                } else { // չ��
                    btn.addClass('ctrlBtnOpen').html(strOpen);
                    items.removeClass('hide');
                    self.setCookieOpen(cookieName);
                }
            });
            
            // cookie��¼չ������
            if (Cookie.get(cookieName + "close")) { // ����
                btn.removeClass('ctrlBtnOpen').html(strClose);
                items.each(function() {
                    $(this).attr('rel') === '1' && $(this).addClass('hide');
                });
            } else if(Cookie.get(cookieName + "open")){ // չ��
                btn.addClass('ctrlBtnOpen').html(strOpen);
                items.removeClass('hide');
            }
        },
        toggleMore: function(){ // չ������ɸѡ
            var self = this;
            var JsubClose = JchooseNew.find('.subClose'),
                dataType = JsubClose.attr("data-type"),
                strOpen = dataType == 1 ? '����ɸѡ<em class="icon-arr"></em>' : '�����ҳ�ɸѡ<em class="icon-arr"></em>',
                strClose = dataType == 1 ? 'չ��ɸѡ<em class="icon-arr"></em>' : 'չ���ҳ�ɸѡ<em class="icon-arr"></em>';
            if(JsubClose.length <= 0) return;

            JsubClose.bind('click',  function() { 
                if(JchooseNew.hasClass('JchooseNewFold')){ // չ��
                    JchooseNew.removeClass('JchooseNewFold');
                    $(this).html(strOpen);
                    self.setCookieOpen(cookieNameA);
                }else {
                    JchooseNew.addClass('JchooseNewFold'); // ����
                    $(this).html(strClose);
                    self.setCookieClose(cookieNameA);
                }
            });

            // cookie��¼ɸѡչ������
            if(Cookie.get(cookieNameA + "open")){ // չ��
                JchooseNew.removeClass('JchooseNewFold');
                JsubClose.html(strOpen);
            }else if(Cookie.get(cookieNameA + "close")){
                JchooseNew.addClass('JchooseNewFold'); // ����
                JsubClose.html(strClose);
            }
        },
  
        init: function(){
            this.moreHover();
            this.jiebieFn();
            this.hotBrandHover();
            this.toggleFilterMore();
            this.toggleMore();
            // ����ƥ���Ƿ�Ĭ��չ��
            // location.href.match(/pz_\d|zw\d|jq\d|cs\d|rl\d|qd\d|cz\d|gb\d|l\d|x\d/i) && this.toggleFilterMore();
        }
    };

    // ��׼�ҳ�������ť����¼�(�ⲿ����)
    window.showFilter = function(){
        var JsubClose = JchooseNew.find('.subClose'),
            dataType = JsubClose.attr("data-type"),
            strOpen = dataType == 1 ? '����ɸѡ<em class="icon-arr"></em>' : '�����ҳ�ɸѡ<em class="icon-arr"></em>',
            strClose = dataType == 1 ? 'չ��ɸѡ<em class="icon-arr"></em>' : 'չ���ҳ�ɸѡ<em class="icon-arr"></em>';        

        selCarFn.setCookieOpen(cookieNameA);

        if(JsubClose.length <= 0) return;
        if(JchooseNew.hasClass('JchooseNewFold')){ // չ��
            JchooseNew.removeClass('JchooseNewFold');
            JsubClose.html(strOpen);
        }
    }

    selCarFn.init();
}
selCarDefault();
/*ѡ�� E*/     


//ȥ��getScript�����Դ���ʱ�������
$.ajaxSetup({cache: true });

// һ���ҳ�
function closeTj(){
    $('#JmodTj a').each(function(index, el) {
        $('#JmodTj a').eq(index).on('click', '.icon-close', function(event) {
            event.preventDefault();            
            $(this).parent().parent().remove();
            typeof closeTjCallback == "function" && closeTjCallback($(this));
        });
    });
}

// �³��ٵ��л�
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

// ����Դ�����а񽻻�
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



//������
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

//������
var jsload = Lazy.create({
    lazyId: "Jlazy_load",
    trueSrc: '#src',
    jsList: jsList_,
    offset: 100,
    delay: 100,
    delay_tot: 1000
});
Lazy.init(jsload);