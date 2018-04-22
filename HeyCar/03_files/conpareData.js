var n = n || {};
n.Config = n.Config || {
        cssText: "",
        max: 4,
        add: function (item) {// 添加车型
               var mpSS = $(item);
               // mpSS[0] && (mpSS.attr("class", "btn btn-mini btn-ratio btn-disabled")) && (mpSS.text("已加入"));
               mpSS[0] && mpSS.addClass('pcbtn-added').html("<i class='pcbtn-success-txt'>已加入</i><i class='pcbtn-cancel-txt'>取消</i>");
        },
        remove: function (item) {// 删除车型
               var mpSS = $(item);
               // mpSS[0] && (mpSS.attr("class", "btn btn-mini btn-ratio")) && (mpSS.html("<i class='icon10 icon10-plus'></i>对比"));
               mpSS[0] && mpSS.removeClass('pcbtn-added').html("<i class='icon10 icon10-plus'></i>对比");
        }
},
n.init = function (e){
   $.extend(n.Config, e),
   $.extend(n.Config, {
            _add: function(e) {     //点击添加
                var t = $('[id="ADD_comparepop_' + e + '"]');
                t.parent().parent().removeClass("list").addClass("delinfo");
                t.filter('[data-ad="1"]').addClass('pcbtn-added').html("<i class='pcbtn-success-txt'>已加入</i><i class='pcbtn-cancel-txt'>取消</i>"),
                n.Config.add(t.filter('[data-ad!="1"]'))
            },
            _remove: function(e) {  
                for (var t, e = e || [], a = 0, i = e.length; i > a; a++) t = $('[id="ADD_comparepop_' + e[a] + '"]'), t.filter('[data-ad="1"]').removeClass('pcbtn-added').html('<i class="icon10 icon10-plus"></i>对比'), n.Config.remove(t.filter('[data-ad!="1"]'))
            },
            compare: function(e, t) {   // 开始对比按钮
                t = t || [];
                var a = n.Compare.getAdspecList(),
                    i = [location.protocol+"//price.pcauto.com.cn/choose.jsp?mid=" + t.join(",")];
                e.attr("href", i).attr("target", "_blank");
            }  
   }), 
   n.Menu.initHtml(n.Config);
   $(".comparepop").on("del", function(e, t, a, i) {
        n.Compare.delCompareCookie(t),n.Config._remove([t]);
    }).on("clear", function(e, t, a) {
        n.Compare.clearCompareCookie(),n.Config._remove(t),n.Advert.clear()
    }).on("expire", function(e, t, a) {
        $('[id="ADD_comparepop_' + t + '"]').blur(),
            alert("最多4个车型，请删除一个再添加")
    }).on("init", function(e, t) {
        n.Menu.init(t);
        var a = n.Compare.getCompareCookieList();
        a.length > 0 && n.Compare.addSpec(a.join(","), function(e) {
            t.add(e, function() {
                var a = null,
                    i = n.Compare.getLastNotAdSpec();
                $.each(e, function(e, t) {
                        n.Config._add(t.id),
                        t.id == i && (a = t)
                }),
                // t.show(),
                n.Advert.load(a)
            })
        })
    }).on("add", function(e, t, a, i) {
        var s = a ? 1 == a.attr("data-ad") : !1,
            r = a ? a.attr("data-pvid") : null;
        null == t || 1 == s && null == r || setTimeout(function() {
            var e = !1,
                a = n.Compare.getCompareCookieList(),
                p = n.Compare.getCompareCookieAdList();
                if (a.length > 0)
                    for (var d = 0; d < a.length; d++)
                        if (a[d] == t) {
                            e = !0;
                            break
                        }
                if (e || (0 == a.length && (a = []), a.push(t), a.length >= 4 && a.splice(0, a.length - 4), n.Cookie.writeCookie(n.Compare.cookieName, n.Compare.trimLeft(a.join(",")))), s && !e) 
                {
                    
                    0 == p.length && (p = []), p.push([t, r]), p.length >= 4 && p.splice(0, p.length - 4);
                    for (var c = [], l = 0; l < p.length; l++) c.push(p[l].join("$"));n.Cookie.writeCookie(n.Compare.cookieNameAd, n.Compare.trimLeft(c.join(","))),$('[id="ADD_comparepop_' + t + '"]').trigger($.Event("addOk"))
                }
                n.Compare.addSpec(a.join(","), function(a) {
                    i.add(a, function() {
                        var r = null;
                        $.each(a, function(e, a) {
                                n.Config._add(a.id),
                                a.id == t && (r = a)
                        }),
                        i.show(),
                        !s && !e && n.Advert.load(r)
                    })

                })
        }, 1)
    });
    n.Advert.init();
},
n.Advert = n.Advert || {},  //选择车型 出对应的猜你喜欢内容模块
$.extend(n.Advert, {
        widget: null,
        init: function() {
            this.widget = new r();
        },
        load: function(e) {
            var t = n.Compare.getCompareCookieList();
            this.widget.load({
                id: e.id,
                historyAllSpec: t
            })
        },
        changeList:function(){
            this.widget.changeList();
        },
        clear: function() {
            this.widget.clear()
        }
})
function o(g) {
        g = g || [];
        for (var n = '<p class="advert-name">猜您喜欢</p><ul class="advert-ul">', e = 0, o = g.length; o > e; e++) {
            var t = g[e];
            if(e < 6){
                if(e < 2){
                    n += '<li class="list" data-index="'+ e +'" data-specid="' + t.id + '"><div class="advert-text"><p class="advert-text-name"><a href="' + t.url + '" target="_blank" data-track="third">' + t.name + '</a></p></div><div class="advert-link"><a href="javascript:void(0);" target="_self" class="btn btn-mini" id="ADD_comparepop_' + t.id + '" data-toggle="comparepop" data-ad="1" data-pvid="' + t.sgId + '" data-track="third"><i class="icon10 icon10-plus"></i>对比</a></div></li>'
                }else{
                    n += '<li class="list" data-index="'+ e +'" style="display:none;" data-specid="' + t.id + '"><div class="advert-text"><p class="advert-text-name"><a href="' + t.url + '" target="_blank" data-track="third">' + t.name + '</a></p></div><div class="advert-link"><a href="javascript:void(0);" target="_self" class="btn btn-mini" id="ADD_comparepop_' + t.id + '" data-toggle="comparepop" data-ad="1" data-pvid="' + t.sgId + '" data-track="third"><i class="icon10 icon10-plus"></i>对比</a></div></li>'
                }
            }
        }
        return n += '</ul><a href="javascript:;" class="changemore" id="changemore" data-more="changemore"><i class="icon10"></i>换一换</a>'
}
function t(_, n) {
        var e, o, t = document.cookie,
            i = t.indexOf(_ + "=");
        return -1 !== i && (i += _.length + 1, o = t.indexOf(";", i), -1 === o && (o = t.length), e = decodeURIComponent(t.substring(i, o) || "")), e || n || ""
}
var a = {},
    r = function(){
    this.$item = $(".advert"), 
    this.data = {}, 
    this.loadingCount = 0, 
    this.init();
};
r.prototype = {
        constructor: r,
        init:function(g){
           var _this = this;  
            _this.$item.on("addOk", '[data-toggle="comparepop"][data-ad=1]', function() {
                var _ = $(this).attr("data-jiaurl");
                if (_) {
                    var n = new Image;
                    n.src = _
                }
            }), 
            _this.$item.on("click", '[data-track="third"][data-select!=1]', function() {
                var _ = $(this).closest("li").attr("data-specid"),
                    n = a[_];
                if (n) {
                    var e = new Image;
                    e.src = n
                }
            })
        },
        load:function(g){ 
            var n=this;
            if(g){
                var e = ++n.loadingCount,
                    m = location.protocol+"//price.pcauto.com.cn/api/hcs/select/compareNewBar/serial_recommend_model",
                    l = m + "?sgid="+ SGID +"&mid="+ g.id +"&callback=?";
                $.ajax({
                    url: l,
                    cache: !0,
                    dataType: "jsonp",
                    jsonpCallback: "jQueryUser_duibi_callback_yourlike2"
                }).done(function(o){
                    function t(_, n) {
                        for (var e = null, o = [], t = {}, i = 0, a = n.historyAllSpec.length; a > i; i++) n.historyAllSpec[i] && (t[n.historyAllSpec[i]] = !0);
                        for (var r = 0, c = _.length; c > r; r++) e = _[r], null != e && e.id && (t[e.id] || (t[e.id] = !0, o.push(e)));
                        return o
                    }
                    if(e===n.loadingCount && 0 == o.returncode){
                        var i = o.result || {},
                            a = i.models || [];
                        a = t(a, g), 0 != a.length && (n.data = {
                            choicespec: g.id,
                            models: a
                        }, n.render(), n.changeList())
                    }
                })
            }
        },
        render: function() {
            var n = this,
                e = n.data;
            n.$item.html(o(e.models)).show();
        },
        changeList:function(){  // 换一换
            var j=0,text, img1, img2, f= $(".advert-ul li.list");
            var len= f.length;

            if(len <=2){
                $(".changemore").hide();
            }
            $(".changemore").click(function(){
                    j +=2;
                    len= $(".advert-ul li.list").length;
                    if(len <=2){
                        $(".changemore").hide();
                    }
                    f= $(".advert-ul li.list");
                    if(j >= len){ j=0 }
                    $(".advert-ul li").filter(".delinfo").remove();
                    f.hide();
                    f.eq(j).show();
                    f.eq(j+1).show();
                    img1 = f.eq(j).find("img");
                    img2 = f.eq(j+1).find("img");
                    img1.attr("src",img1.attr("src1"));
                    img2.attr("src",img2.attr("src1"));
                    if(img1.attr("src1")) img1.removeAttr("src1");
                    if(img2.attr("src1")) img2.removeAttr("src1"); 
            })
        },
        clear: function() {
            this.$item.html("").hide()
        }
};
n.Compare = n.Compare || {}, // 相关cookie获取
$.extend(n.Compare, {
        cookieName: "product_compare",
        cookieNameAd: "product_compare_ad",
        Url: location.protocol+"//price.pcauto.com.cn/api/hcs/select/compareNewBar/model_info",
        getCompareCookieList: function() {
            var e = n.Cookie.readCookie(n.Compare.cookieName);
            return e ? e.replace("null,", "").replace("undefined,", "").split(",") : []
        },
        getCompareCookieAdList: function() {
            var e, t = n.Cookie.readCookie(n.Compare.cookieNameAd),
                a = [];
            t = t ? t.split(",") : [];
            for (var i = 0; i < t.length; i++) null != t[i] && (e = t[i].split("$"), e.length < 2 || a.push(e));
            return a
        },
        getAdspecList: function() {
            var e, t = n.Cookie.readCookie(n.Compare.cookieNameAd),
                a = [];
            t = t ? t.split(",") : [];
            for (var i = 0; i < t.length; i++) null != t[i] && (e = t[i].split("$"), e.length < 2 || a.push(e[0]));
            return a
        },
        getLastNotAdSpec: function() {
            var e = n.Compare.getCompareCookieList(),
                t = n.Compare.getAdspecList(),
                a = $(e, t) || [],
                o = a[a.length - 1] || null;
            return o
        },
        delCompareCookie: function(e) {
            for (var t = n.Compare.getCompareCookieList(), a = 0; a < t.length; a++)
                if (t[a] == e) {
                    t.splice(a, 1), null == n.Compare.trimLeft(t.join(",")) || void 0 == n.Compare.trimLeft(t.join(",")) ? n.Cookie.writeCookie(n.Compare.cookieName, "") : n.Cookie.writeCookie(n.Compare.cookieName, n.Compare.trimLeft(t.join(",")));
                    break
                }
            for (var i = n.Compare.getCompareCookieAdList(), o = [], s = 0; s < i.length; s++)
                if (i[s][0] == e) {
                    if (i.splice(s, 1), 0 == i.length) n.Cookie.writeCookie(n.Compare.cookieNameAd, "");
                    else {
                        for (var r = 0; r < i.length; r++) o.push(i[r].join("$"));
                        n.Cookie.writeCookie(n.Compare.cookieNameAd, n.Compare.trimLeft(o.join(",")))
                    }
                    break
                }
        },
        clearCompareCookie: function() {
            n.Cookie.writeCookie(n.Compare.cookieName, ""), n.Cookie.writeCookie(n.Compare.cookieNameAd, "")
        },
        trimLeft: function(e) {
            return e.length > 0 ? "," == e.substring(0, 1) ? e.substring(1, e.length - 1) : e : void 0
        },
        addSpec: function(e, t) {
            e.length > 1 && $.ajax({
                url: n.Compare.Url + "?mid=" + n.Compare.trimLeft(e) + "&callback=?",  //开始对比列表数据接口
                cache: !0,
                dataType: "jsonp",
                jsonpCallback: "jQueryUser_duibi_callback_mid",
                success: function(e) {
                    try {
                        e = e.result.models || []
                    } catch (a) {
                        e = []
                    }
                    e && e.length && t && t(e)
                }
            })
        }
}), 
n.Menu = n.Menu || {}, 
$.extend(n.Menu, {
        SeriesCache: new Array,
        Url:location.protocol+"//price.pcauto.com.cn/api/hcs/select/compareNewBar/model_json_chooser",    //车型接口
        initHtml: function(e) {
            $("body").append($('<div style="' + n.Config.cssText + '" class="comparepop"><div class="comparepop-content fn-hide"><div class="toppart"><b>车型对比</b><a class="j-compare-clear" href="javascript:void(0)">清空</a></div><ul class="comparepop-list"></ul><div id="divCompare" class="comparepop-select"><div class="area"><div data-type="select-spec" style="z-index: 200;" class="select"><div data-type="input" data-val="请选择车型" data-key="0" class="select-selected"><span>请选择车型</span><i class="icon10 icon10-down1"></i></div><div data-type="option" class="selectpop-spec" style="display:none;"><div class="selectpop-box"><div class="spec-title"><ul><li style="display:none;" class="f1"><a href="javascript:void(0)" target="_self" class="name" data-type="brandTitle">品牌</a></li><li style="display:none;" class="f2"><a href="javascript:void(0)" target="_self" class="name" data-type="seriesTitle">> 车系</a></li><li style="display:none;" class="f3"><a href="javascript:void(0)" target="_self" class="name" data-type="specTitle">> 车型</a></li></ul></div><div class="selectpop-cont"><dl class="cont-dl cont-dlbrd" data-type="brand"></dl><dl class="cont-dl" data-type="series"></dl><dl class="cont-dl" data-type="spec"></dl></div></div></div></div></div><div class="area comparepop-select-btn"><a target="_self" class="btn btn-small btn-orange fn-left j-compare-begin" href="javascript:void(0);">开始对比</a></div></div><div class="advert" style="display:none;"></div></div><a target="_self" href="javascript:void(0);" class="comparepop-btn">车型对比<i class="icon10 icon10-right"></i></a></div>'))
        },
        init:function(){
            $('#divCompare [data-type="input"]').click(function() { //选择品牌下拉
                var e = $(this).siblings('[data-type="option"]').is(":hidden");
                if(e){
                    return $(this).parent().hasClass("select-disabled") ? !1 : (e && $(this).siblings('[data-type="option"]').css({
                        display: "block",
                        visibility: "visible"
                    }), void(e && $(this).closest('[data-type="select-spec"]').addClass("active")),void(e && n.Menu.setDropPos()));
                }else{
                    $('#divCompare [data-type="select-spec"]').removeClass("active"), $('#divCompare [data-type="option"]').css({
                        display: "none",
                        visibility: "hidden"
                    })
                }
            }),
            $('#divCompare [data-type="select-spec"] dl').on("click", "dd", function(){
                var e = $(this).attr("data-key");
                if (e > 0) {
                    var t = $(this).closest("dl");
                    switch (t.attr("data-type")) {
                        case "brand":
                            $(this).addClass("selectedA").siblings().removeClass("selectedA");
                            n.Menu.initSeries(e);
                            break;
                        case "series":
                            $(this).addClass("selectedB").siblings().removeClass("selectedB");
                            n.Menu.initSpec(e);
                            break;
                        case "spec":
                            if($(this).attr("class") == "selected"){
                                return false;
                            }
                            $(this).addClass("selected")
                            n.Menu.selectSpec(e, $(this).find("a").text(), $(this))
                    }
                }
                n.Menu.setDropPos();
                return !1
            }), 
            $('#divCompare [data-type="select-spec"] .spec-title li').on("click", "a", function() {
                var e = $('#divCompare [data-type="select-spec"]'),
                    t = $('[data-type="brand"]', e),
                    a = $('[data-type="series"]', e),
                    i = $('[data-type="spec"]', e),
                    s = ($('[data-type="brandTitle"]', e), $('[data-type="seriesTitle"]', e)),
                    m = $('[data-type="specTitle"]', e),
                    r = $(this).attr("data-type");
                switch (r) {
                    case "brandTitle":
                        i.hide(), 
                        a.hide(), 
                        t.show(), 
                        m.closest("li").hide(), 
                        s.closest("li").hide();
                        $(this).parent().addClass("active");
                        break;
                    case "seriesTitle":
                        i.hide(), 
                        a.show(), 
                        m.closest("li").hide();
                        $(this).parent().addClass("active");
                        break;
                    case "specTitle":
                        i.show()
                }
                n.Menu.setDropPos();
                return !1
            }),
            $(document).on("click", function(e) { //选择品牌关闭下拉
                var t = $(e.target).closest('[data-type="select-spec"]');
                0 == t.length && ($('#divCompare [data-type="select-spec"]').removeClass("active"), $('#divCompare [data-type="option"]').css({
                    display: "none",
                    visibility: "hidden"
                }))
            }),
            n.Menu.initBrand();
            n.Menu.initOther();
        },
        setDropPos:function(){//设置下拉框的top，触及底部后与底部对齐

            var compare = $('#divCompare');
            if(!compare) return;
            var screenH = $(window).height(),
                area = $("#divCompare .area"),
                drop = $('#divCompare [data-type="option"]'),
                dropH = drop.height(),
                dropTop = area.get(0).getBoundingClientRect().top,
                gap = screenH - dropTop;
            if(gap <= dropH ){
                drop.css("top",gap-dropH);
            }else{
                var areaH = area.height();
                drop.css("top",areaH);              
            }
        },
        initBrand: function() {
            var e = $('#divCompare [data-type="select-spec"]'),
                t = $('[data-type="input"]', e),
                a = $('[data-type="brand"]', e),
                i = $('[data-type="series"]', e),
                s = $('[data-type="spec"]', e),
                r = $('[data-type="brandTitle"]', e),
                p = $('[data-type="seriesTitle"]', e),
                d = $('[data-type="specTitle"]', e);
            t.attr("data-key", 0), 
            $("span", t).text(t.attr("data-val")), 
            i.hide(), 
            s.hide(), 
            a.empty().show(), 
            r.closest("li").addClass("active frist").show().siblings("li").removeClass("active"), 
            p.closest("li").hide(), 
            d.closest("li").hide();
            var c = "";
            var zimi='';
            $.each(listCompareInfo, function(e, t) {
                c !== t.LETTER && (a.append("<dt>" + t.LETTER + "</dt>"),zimi+='<a href="javascript:void(0)">'+t.LETTER+'</a>', c = t.LETTER), 
                a.append('<dd data-key="' + t.ID + '"><a target="_self" href="javascript:void(0)">' + t.NAME + "</a></dd>")
            }),
            n.Menu.initSeries();
            a.append('<dt class="absleft">'+zimi+'</dt>');
        },
        initSeries: function(e) {
            var t = $('#divCompare [data-type="select-spec"]'),
                a = ($('[data-type="input"]', t), $('[data-type="brand"]', t)),
                i = $('[data-type="series"]', t),
                s = ($('[data-type="spec"]', t), $('[data-type="brandTitle"]', t), $('[data-type="seriesTitle"]', t)),
                r = $('[data-type="specTitle"]', t);
                e > 0 && (a.hide(), i.empty().show(), 
                s.closest("li").addClass("active").show().siblings("li").removeClass("active"), 
                r.closest("li").hide(), 
                $.each(listCompareInfo, function(t, a) {
                return a.ID == e ? ($.each(a.LIST, function(e, t) {
                    i.append("<dt>" + t.NAME + "</dt>"), $.each(t.LIST, function(e, t) {
                        i.append('<dd data-key="' + t.ID + '"><a target="_self" href="####">' + t.NAME + "</a></dd>")
                    })
                }), !1) : void 0
            })), 
            n.Menu.initSpec()
        },
        initSpec: function(e) {
            function t(e) {
                i.hide(), 
                s.empty().show(), 
                r.closest("li").addClass("active").show().siblings("li").removeClass("active"), 
                $.each(e.LIST, function(e, t) {
                    s.append("<dt>" + t.NAME + "</dt>"),
                    $.each(t.LIST, function(e, t) {
                        s.append('<dd data-key="' + t.ID + '" ><span>' + t.PRICE + '</span><a target="_self" href="javascript:void(0)">' + t.NAME + "</a></dd>");
                        for(var k=0; k<arr.length;k++){
                            if(t.ID == arr[k]){
                                 $('[data-key="' + t.ID + '"]','[data-type="spec"]').addClass("selected");
                            }
                        }
                    })
                })
            }
            var a = $('#divCompare [data-type="select-spec"]'),
                i = ($('[data-type="input"]', a), $('[data-type="brand"]', a), $('[data-type="series"]', a)),
                s = $('[data-type="spec"]', a),
                r = ($('[data-type="brandTitle"]', a), $('[data-type="seriesTitle"]', a), $('[data-type="specTitle"]', a)); 
            var a= n.Compare.getCompareCookieList();
            var arr = new Array();
                if(a != null){
                    arr = a.toString().split(",");
                }
                //车型 
                /*e > 0 && (n.Menu.SeriesCache[e] ? t(n.Menu.SeriesCache[e]) : $.getJSON(n.Menu.Url + "?sgid=" + e + "&type=1&callback=?", function(e) {
                return 0 == e.ID ? !1 : (n.Menu.SeriesCache[e.ID.toString()] = e, void t(e))
                }))*/
            var l= location.protocol+"//price.pcauto.com.cn/api/hcs/select/compareNewBar/model_json_chooser?sgid=" + e + "&type=1&callback=?"; 
                e > 0 && (n.Menu.SeriesCache[e] ? t(n.Menu.SeriesCache[e]): $.ajax({
                        url: l,
                        cache: !0,
                        dataType: "jsonp",
                        jsonpCallback: "jQueryUser_duibi_callback_chexing",
                        success: function(e) {
                            try {
                                e = e || []
                            } catch (a) {
                                e = []
                            }
                            t(e)
                        }
                 }))
        },
        initOther:function(e){ //猜你喜欢
            var e = this;
            var v= $(".comparepop"),
                i= $(".comparepop-content"),
                m= $(".advert"),
                l = location.protocol+"//price.pcauto.com.cn/api/hcs/select/compareNewBar/serial_recommend_model?sgid="+ SGID +"&mid=0&callback=?";
            var a= n.Compare.getCompareCookieList();
            $.ajax({
                    url: l,
                    cache: !0,
                    dataType: "jsonp",
                    jsonpCallback: "jQueryUser_duibi_callback_yourlike",
                    success: function(e) {
                        try {
                            e = e.result.models || []
                        } catch (a) {
                            e = []
                        }
                        if(e.length > 0){
                            $(".advert").show();
                            $(".advert").html(o(e));
                        }
                        n.Advert.changeList();
                        n.Menu.setDropPos();
                    }
            })
        },
        selectSpec: function(e, t, a) {
            var i = $('#divCompare [data-type="select-spec"]'),
                s = $('[data-type="input"]', i),
                n = $('[data-type="option"]', i);
            i.removeClass("active"), 
            //s.attr("data-key", e).find("span").text("请选择车型"), 
            n.css({
                display: "none",
                visibility: "hidden"
            }), 
            i.trigger($.Event("change"), [e])
        },
        show: function() {
            $(".comparepop").show()
        },
        hide: function() {
            $(".comparepop").hide()
        }
}),
n.Cookie = n.Cookie || {}, 
$.extend(n.Cookie, {
        writeCookie: function(e, t) {  //设置cookite
            var a = 1,
                i = new Date;
            i.setTime(i.getTime() + 6 * a * 60 * 60 * 1e3), document.cookie = e + "=" + escape(t) + ";expires=" + i.toGMTString() + ";domain=price.pcauto.com.cn; path=/"
        },
        readCookie: function(e) {     //读取cookite
            var t, a = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return (t = document.cookie.match(a)) ? unescape(t[2]) : null
        }
}), 
n.init();
var m = function(e,t){  
    var o = this;
    o.options = $.fn.comparepop.defaults, 
    o.$item = $(".comparepop"), //当前大盒子
    o.options.cssText && (o.$item[0].style.cssText += ";" + o.options.cssText),
    o.$item.width(50),
    o.$content = $(".comparepop-content", o.$item),
    o.$arrow = $(".comparepop-btn i", o.$item),
    o.$list = $(".comparepop-list", o.$content),
    o.$tipNum = $(".comparepop-tip", o.$content),
    o.$alert = $('<div class="comparepop-alert">最多' + o.options.max + "个对比车型</div>"), 
    o.$select = $('[data-type="select-spec"]', o.$content),
    o.$duibiBtn = $(".j-compare-begin", o.$content),
    o.key = []
};
m.prototype = {
   constructor: m,
   init:function(){
       var e = this;
       $(".comparepop-btn", e.$item).on("click", $.proxy(e.toggle, e) ), 
       $(".j-compare-begin", e.$content).on("click", function() {    //开始对比
                n.Config.compare($(this), e.key)
       }), 
       $(".j-compare-clear", e.$content).on("click", $.proxy(e.clear, e)),   //清空
       $(document).on("click", '[data-toggle="comparepop"][data-select!=1]', function() {
        //    $item.trigger($.Event("del"))
            e.key.length < e.options.max ? e.show().$item.trigger($.Event("add"), [this.id.replace("ADD_comparepop_", ""), $(this), e]) : e.$item.trigger($.Event("expire"), [this.id.replace("ADD_comparepop_", ""), e])
       }), 
       $(document).on("click", '[data-toggle="comparepop"][data-select!=0]', function() {
           e.remove(this.id.replace(/\D/g, ''))
       }),
       e.$select.on("change",function(t, o){  //添加车型
           o > 0 && e.key.length < e.options.max && !e.contains(o) && e.$item.trigger($.Event("add"), [o, null, e])
       }),
       e.$list.on("click", "i", function() {  //删除对比列表
           var rep = $(this).closest("li").attr("data-key");
           $('[data-key="' + rep + '"]','[data-type="spec"]').removeClass("selected");
            if($(this).parent().siblings("li").length ==0){ n.Advert.clear()}
           return e.remove(rep), !1
       }), 
       e.disabled().$item.trigger($.Event("init"), e)
   },
   toggle:function(){
      this[this.shown ? "hide" : "show"]()
   },
   show:function(){
       var e = this;
       return e.$item.width(350).trigger($.Event("show")),
              e.$content.removeClass("fn-hide"), 
              e.$arrow.removeClass("icon10-right").addClass("icon10-left"), 
            e.shown = !0,this
   },
   hide: function(e) {
        return this.$item.width(50).trigger($.Event("hide")),
            this.$content.addClass("fn-hide"), 
            this.$arrow.removeClass("icon10-left").addClass("icon10-right"), 
            this.shown = !1,this
   },
   contains: function(e) {
            var t = !1;
            return $.each(this.key, function(o, i) {
                return i == e ? (t = !0, !1) : void 0
            }), t
   },
   add: function(e, t) {
            if ("object" == typeof e) {
                var o = [],
                    s = !1,
                    n = this;
                $.each(e, function(e, t) {
                    !n.contains(t.id) && n.key.length < n.options.max && (o.push('<li data-key="' + t.id + '"><a target="_blank" href="' + t.url + '">' + t.name + '</a><i class="icon16 icon16-close"></i></li>'), n.key.push(t.id), $('[id="ADD_comparepop_' + t.id + '"]').attr("data-select", 1), s = !0)
                }), 
                s && (this.$list.append(o.join("")).css({
                    overflow: "auto",
                    height: "auto"
                }), 
                this.alert().disabled()), 
                t && t.call(this)
            }
            return this
    },
    alert: function(e) {
            var t = this,
                o = $.Callbacks();
            return o.add(function() {
                t.$select.addClass("select-disabled"), 
                t.$select.find('[data-type="input"]').attr("data-key", 0).find("span").html(t.$select.find('[data-type="input"]').attr("data-val"))
            }), 
            t.key.length >= t.options.max ? (t.$alert.insertAfter(t.$duibiBtn), t.$select.closest(".area").hide(), o.fire()) : (t.$alert.remove(), t.$select.removeClass("select-disabled").closest(".area").show()), 
            e && (o.fire(), t.$select.removeClass("select-disabled")), t.$tipNum.html(t.key.length > 0 ? "选择了<b>" + t.key.length + '</b>个车型<span class="comparepop-tip-grey">(最多4个)</span>' : '选择车型<span class="comparepop-tip-grey">(最多4个)</span>'), this
    },
    remove: function(e) {
            var t = this;
            return $('[data-key="' + e + '"]', t.$list).remove(), 
            $('[id="ADD_comparepop_' + e + '"]').attr("data-select", 0), 
            $.each(t.key, function(o, i) {
                return i == e ? (t.key.splice(o, 1), !1) : void 0
            }), 
            0 == t.key.length && t.$list.css({
                overflow: "hidden",
                height: 0
            }), 
            t.alert().disabled().$item.trigger($.Event("del"), [e, 0 == t.key.length, t]), this
    },
    clear:function(){
        return this.$item.trigger($.Event("clear"), [this.key, this]), 
        $.each(this.key, function(e, t) {
                $('[id="ADD_comparepop_' + t + '"]').attr("data-select", 0)
        }), 
        this.$list.html("").css({
                overflow: "hidden",
                height: 0
        }), 
        this.key = [], 
        this.alert(!0).disabled(), this,
        $('.selectpop-cont dd').removeClass("selected");
    },
   disabled: function() {
        return $(".comparepop-select-btn", this.$content)[this.key.length > 0 ? "show" : "hide"](), this
   }
};
$.fn.comparepop = function(e) {
        return this.each(function() {
            var t = $(this),
                o = t.data("comparepop"),
                s = $.extend({}, $.fn.comparepop.defaults, t.data(), "object" == typeof e && e);
            o || t.data("comparepop", o = new m(this, s)), "string" == typeof e && o[e]()
        })
}, 
$.fn.comparepop.defaults = {
    max: 4,
    cssText: "",
    compare: $.noop
}, 
$.fn.comparepop.Constructor = m;
var Car = new m();
Car.init();
/*if($("#kuaisou").length >0){
    var oTopFix = $("#kuaisou").offset().top;
    //alert(oTopFix);
    $(".comparepop").css("top",oTopFix);
}*/
//n.Menu.show();

$('.absleft a').click(function(){   
    $('.selectpop-cont .cont-dlbrd').scrollTop(0);//先复位滚动位置
    var curt=$(this).index();
    var val=$('.cont-dlbrd dt').eq(curt).position().top;
    $('.selectpop-cont .cont-dlbrd').scrollTop(val);
})
