/**
 *  属性上所有字段
 *  
 */
var sceneList = function(_Dopen, _global) {
    var sceneList = {}; 

	var newArticleList = {
        init:function () {
            var self = this;
            /* 设计器中，初始化 不需要加载，有 sceneLists:reload加载 */
            if(!sceneList._str) { 
                $.each($('.wqdelementEdit[data-elementtype="sceneList"]'), function (i, _) {
                    // 判定是否为默认模板
                    if($(_).attr('artnavtype')) {
                        sceneList.loadEvent1($(_));
                        sceneList.loadScene($(_), sceneList.listStr[sceneList.getListName($(_))], $(_).attr('navids'));
                    }
                });
            }
            if(sceneList._str) {
                sceneList.bindTrigger();   
            }
        },
        /**
         * 绑定默认文章详情页
         */
        bindDefaultDetail: function ($elem, dfd) {
            var hasDetailPage = $(".menu-list-page>li[data-type=HouseKeeping]"),
                addPageDfd = $.Deferred(),pageId,needCatch;
            if(hasDetailPage.length) {
                addPageDfd.resolve(hasDetailPage.eq(0).attr("data-pageid"));
            } else {
                needCatch = true;
                //页面数量上线
                if((_global.permission.langCount||_global.page.data.length) < _global.permission.pageCount){
                    $(document).trigger("page:add.page",{
                        // pageId : sceneList._isDesignPhone == 'pc' ? "36365" : "36366",  // 测试
                        pageId : sceneList._isDesignPhone == 'pc' ? "11338" : "11339",
                        type : "HouseKeeping",
                        // pageId : "36364",
                        // type : "article",
                        dfd : addPageDfd
                    });
                }else{
                    var Ismall=(_global.permission.version.indexOf("mall") >=0)?true:false;
                    var Bool=!!isagentUser?true:false;
                    $(document).trigger("Popup:popup",{
                        title: "操作提示",
                        class: "pupAgent",
                        info: "您的页面数量已经达到版本上限",
                        desc: (!Ismall&&!Bool)?"如要继续使用该功能请升级至更高版本！":"",
                        done: (!Ismall&&!Bool)?"升级":"确定",
                        href:(!Ismall&&!Bool)?WWWCTX+"pricingpackage.html":"javascript:void(0)",
                        cancel:(!Ismall&&!Bool)?"取消":"",
                        href:(!Ismall&&!Bool)?WWWCTX+"pricingpackage.html":"javascript:void(0)",
                        target:"_blank",
                        clickOK: function(obj){
                             obj.find(".pupcloseBtn").click();
                        },
                        clickCancel:function(obj){
                            obj.find(".pupcloseBtn").click();
                        }
                    });
                }
            }
            //添加详情页成功后再取值
            $.when(addPageDfd).done(function (_id) {
                pageId = _id || "";
                $elem.attr("data-pageid",pageId);
                needCatch && $(document).trigger("cache:push");
                dfd.resolve();
            });
        }
    };
    /* 新闻相关所有接口 */
    var newsAJAX = {
        navAJAX: {
            url: SAAS_NEWS+"/api/news/navigationbars/",
            // +$obj.attr('userid')+"/"+($obj.attr('artnavtype') || "CATEGORY")  url后面添加
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {}
        },
        listAJAX: {
            url: SAAS_NEWS+'/api/news/page',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            // data: json,
        }
    };
    /* 场景应用相关所有接口 */
    var sceneAJAX = {
        navAJAX: {
            url: (window['DisplayModel'] ? '/pcdesign/' : '/')+'scene/listBasicType',
            type: 'POST',
            dataType: 'json',
            jsonp: '',
            data: {}
        },
        advSearchAJAX: {
            url: (window['DisplayModel'] ? '/pcdesign/' : '/')+'scene/listUserSearchFields',
            type: 'POST',
            dataType: 'json',
            jsonp: '',
            data: {}
        },
        listAJAX: {
            url: (window['DisplayModel'] ? '/pcdesign/' : '/')+'scene/listRecords',
            type: 'POST',
            dataType: 'json',
            jsonp: '',
            data: {}
        }
    };

    /* 定义 模块字符串 */
    var sceneListStr = {
        listSearch: {
            search1: [  // 支持 pc
                '<div class="advSearch-box wqd-mgn-t">',
                    // '<div class="select-checked">',
                    //     '<div class="check-item">',
                    //         '<div class="label">服务内容</div>',
                    //         '<em>月嫂</em><em>月嫂</em><em>月嫂</em>',
                    //     '</div>',
                    //     '<div class="check-item">',
                    //         '<div class="label">经验</div>',
                    //         '<em>1~2年</em><em>3~4年</em>',
                    //     '</div>',
                    // '</div>',
                    '<div class="select-group wqd-brs wqd-brc wqd-brw">',
                        '<div class="item wqd-brc wqd-brw only">', 
                            '<span class="name wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">服务内容：</span>',
                            '<div class="sel-tags">',
                                '<span class="tag on wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-code="-1">全部</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">月嫂</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">育儿师</span>',
                            '</div>',
                            '<div class="add-more wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" style="display:none;">更多</div>',
                        '</div>',
                        '<div class="item wqd-brc wqd-brw only">',
                            '<span class="name wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">经验：</span>',
                            '<div class="sel-tags">',
                                '<span class="tag on wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-code="-1">全部</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">2年以内</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">3~4年</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">5~8年</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">8年以上</span>',
                            '</div>', 
                            '<div class="add-more wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">更多</div>',
                        '</div>',
                        '<div class="item wqd-brc wqd-brw">',
                            '<span class="name wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">年龄(多选)：</span>',
                            '<div class="sel-tags">',
                                '<span class="tag on wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-code="-1">全部</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">30岁以内</span>', 
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">31~35岁</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">36~40岁</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">41~45岁</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">46~50岁</span>', 
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">51~55岁</span>',
                                '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">55岁以上</span>',
                            '</div>',
                            '<div class="add-more wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">更多</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''),
            search2: [ // 支持 phone
                '<div class="advSearch-box1 wqd-mgn-t">',
                    '<div class="btn-self">',
                        // '<span class="wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst wqd-brs wqd-brc wqd-brw">按星级</span>',
                        // '<span class="wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst wqd-brs wqd-brc wqd-brw">按年代</span>',
                        '<span class="wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst wqd-brs wqd-brc wqd-brw">筛选</span>',
                    '</div>',
                    '<div class="sel-box">',
                        '<div class="self-mark">',
                            '<div class="sel-popover">',
                                '<div class="sel-group-box">',
                                    '<div class="gr-box">',
                                        '<div class="b-hd">',
                                            '<div class="left-content">服务内容</div>',
                                            '<div class="right-content"><span>全部</span>',
                                                '<svg class="down" viewBox="0 0 1026 1024"><path d="M1018.701913 255.75513c-8.704-8.704-22.77287-8.704-31.47687 0L516.563478 726.416696 45.924174 255.75513c-8.704-8.704-22.77287-8.704-31.47687 0s-8.704 22.77287 0 31.47687l486.4 486.4c4.34087 4.34087 10.039652 6.522435 15.738435 6.522435s11.397565-2.181565 15.738435-6.522435l486.4-486.4C1027.383652 278.550261 1027.383652 264.45913 1018.701913 255.75513z" p-id="7641"></path></svg>',
                                                '<svg class="up" viewBox="0 0 150.3 150" style="display:none;"><path d="M2.1,113.3c1.3,1.3,3.3,1.3,4.6,0l68.9-68.9l68.9,68.9c1.3,1.3,3.3,1.3,4.6,0c1.3-1.3,1.3-3.3,0-4.6L78,37.5  c-0.6-0.6-1.5-1-2.3-1s-1.7,0.3-2.3,1L2.1,108.7C0.8,110,0.8,112,2.1,113.3z"></path></svg>',
                                            '</div>',
                                            '<div class="center-content"></div>',
                                        '</div>',
                                        '<div class="b-bd">',
                                            '<div class="item on">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '全部',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '月嫂',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '育儿师',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '幼教',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '家庭助理',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '钟点工',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="gr-box">',
                                        '<div class="b-hd">',
                                            '<div class="left-content">星级</div>',
                                            '<div class="right-content"><span>全部</span>',
                                                '<svg class="down" viewBox="0 0 1026 1024"><path d="M1018.701913 255.75513c-8.704-8.704-22.77287-8.704-31.47687 0L516.563478 726.416696 45.924174 255.75513c-8.704-8.704-22.77287-8.704-31.47687 0s-8.704 22.77287 0 31.47687l486.4 486.4c4.34087 4.34087 10.039652 6.522435 15.738435 6.522435s11.397565-2.181565 15.738435-6.522435l486.4-486.4C1027.383652 278.550261 1027.383652 264.45913 1018.701913 255.75513z" p-id="7641"></path></svg>',
                                                '<svg class="up" viewBox="0 0 150.3 150" style="display:none;"><path d="M2.1,113.3c1.3,1.3,3.3,1.3,4.6,0l68.9-68.9l68.9,68.9c1.3,1.3,3.3,1.3,4.6,0c1.3-1.3,1.3-3.3,0-4.6L78,37.5  c-0.6-0.6-1.5-1-2.3-1s-1.7,0.3-2.3,1L2.1,108.7C0.8,110,0.8,112,2.1,113.3z"></path></svg>',
                                            '</div>',
                                            '<div class="center-content"></div>',
                                        '</div>',
                                        '<div class="b-bd only">',
                                            '<div class="item on">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '全部',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '五星',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '四星',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '三星',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '二星',
                                            '</div>',
                                            '<div class="item">',
                                                '<svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>',
                                                '一星',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                            '<div class="sel-group-btn">',
                                '<div class="can-cel">重置</div>',
                                '<div class="sub-mit">确定</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')
        },
        listLoad: {
            load1: [    // 支持 pc、phone
                '<div class="load-more">',
                    '<p class="wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">加载更多</p>',
                '</div>',
            ].join(''),
            load2: [    // 支持 pc
                '<div class="load-more">',
                    '<div class="pagination">',
                        '<p class="first wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">首页</p>',
                        '<p class="prev wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">上一页</p>',
                        '<div class="pages">',
                            '<p class="item wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">1</p>',
                            '<p class="item wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">2</p>',
                            '<p class="item on wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">3</p>',
                            '<p class="item wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">4</p>',
                            '<p class="item wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">5</p>',
                            '<p class="more wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">...</p>',
                            '<p class="item wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">25</p>',
                        '</div>',
                        '<p class="next wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr">下一页</p>',
                    '</div>',
                '</div>',
            ].join('')
        },
        listNav: {
            nav1: [   // 支持 pc
                '<div class="nav">',
                    '<hr class="line">',
                    '<div class="cont-nav">',
                        '<span class="on wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="width:19%;margin:0 2px;">月嫂</span>',
                        '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="width:19%;margin:0 2px;">育儿嫂</span>',
                        '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="width:19%;margin:0 2px;">家庭助理</span>',
                        '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="width:19%;margin:0 2px;">钟点工</span>',
                        '<span class="showMore wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="width:19%;margin:0 2px;">更多</span>',
                    '</div>',
                    '<div class="nav-more"></div>',
                '</div>'
            ].join(''),
            nav2: [   // 支持  pc、phone
                '<div class="nav float-left">',
                    '<hr class="line">',
                    '<div class="cont-nav">',
                        '<span class="on wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">月嫂</span>',
                        '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">育儿嫂</span>',
                        '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">家庭助理</span>',
                        '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">钟点工</span>',
                    '</div>',
                    '<div class="nav-more"></div>',
                '</div>'
            ].join('')
        },
        /* 获取当前的 加载样式 -- common */
        getLoadMoreStyle: function ($obj) {
            return sceneListStr.listLoad[$obj && $obj.attr('artload') || 'load1'];
        },
        /* 获取当前的 高级搜索样式 -- common */
        getSearchStyle: function ($obj) {
            return sceneListStr.listSearch[$obj && $obj.attr('artsearch') || 'search1'];
        },
        /* 获取当前的 导航样式 -- common */
        getNavStyle: function ($obj) {
            return sceneListStr.listNav[$obj && $obj.attr('artnav') || 'nav1'];
        }
    }
    /**
     * 导航样式 1   兼容 pc
     * pcdesign and host 用一个
     * 包括 
     *    1. 是否为导航1 方法  isNav1
     *    2. 渲染添加导航1字符串 方法  renderNav1
     *    3. 绑定导航点击事件 方法  doEvent , 提供 点击成功后 callback回调方法 解决 一个页面多种导航问题
     */
    var Nav1 = (function () {
        var _obj = function () {};
        _obj.prototype = {
            isNav1: function ($obj) {
                return $obj.attr('artnav') == 'nav1' ? true : false;
            },
            /* 重新计算 导航条 只支持 pc */
            renderNav: function ($obj, navHtml) {
                /* 判断，如果navHtml 为空，则按照现有的导航数据加载导航条，如果不为空，按照接口加载导航条 */
                if(!!navHtml) {
                    /* 如已存在 先清空  插入分类和更多分类的容器 */
                    $obj.find('.nav').empty().append('<hr class="line"><div class="cont-nav"></div><div class="nav-more"></div>');
                    /* 内容-导航 */
                    var $nav = $obj.find('.nav .cont-nav');
                    /* 更多-导航 */
                    var $moreNav = $obj.find('.nav .nav-more');
                    /* 添加分类导航内容和更多 */
                    $nav.append(navHtml + '<span class="show-more wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">更多</span>');
                } else {
                    /* 内容-导航 */
                    var $nav = $obj.find('.nav .cont-nav');
                    /* 更多-导航 */
                    var $moreNav = $obj.find('.nav .nav-more');
                    /* 添加分类导航内容和更多 */
                    $nav.find('.show-more').length && $nav.find('.show-more').remove();
                    $nav.append($moreNav.html()+ '<span class="show-more wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">更多</span>');
                    $moreNav.html('');
                }

                /* 分类导航值 */
                var $spanArr = $nav.find('span').removeAttr('style', ''), length = $spanArr.length;
                /* 导航宽度 */    
                var maxWidth = $obj.find('.nav').outerWidth()-5;
                /* 元素宽度 按照比例的25px/725px */
                var sum1 = $spanArr.eq(length-1).width(), temp1 = 4 + (50/725*maxWidth); 
                /* 元素的padding + margin值 */
                var sum2 = temp1;
                /* padding 25/725  margin:2px */
                var i = 0, flag = true;
                $.each($spanArr, function (_, val) {
                    if(_ == length - 1) return false;
                    /* 需要填充到第一行的有哪些 */
                    if(flag) {
                        var temp = sum1 + sum2 + $(val).width() + temp1;
                        if(temp > maxWidth) {
                            flag = false;
                            $moreNav.append($(val)[0].outerHTML);
                            $(val).remove();
                            return true;
                        }
                        if(temp == maxWidth) flag = false;
                        sum1 += $(val).width();
                        sum2 += temp1;
                        i ++;
                    } else {
                        if(!$(val).hasClass('show-more')) {
                            $moreNav.append($(val)[0].outerHTML);
                            $(val).remove();
                        }
                    }
                });
                /* 分类不够多，不需要有更多俩字 */
                if(i >= length - 1) {
                    var $move = $obj.find('.nav .show-more');
                    sum1 -= $move.width();
                    $move.remove();
                }
                var lastLength = $nav.find('span').length;
                if(i >= length - 1) {
                    $spanArr.css({
                        "padding": '0 '+25/725*maxWidth+'px',
                        "margin": '0 2px'
                        // "margin": '0 '+parseInt((maxWidth - sum1 - lastLength*(50/725*maxWidth))/(lastLength*2))+'px'
                    });
                } else {
                    $spanArr.css({
                        "padding": '0 '+parseInt((maxWidth - sum1 - lastLength*4)/(lastLength*2))+'px',
                        "margin": '0 2px'
                    });
                    $moreNav.find('span').css({
                        "padding": '0 '+parseInt((maxWidth - sum1 - lastLength*4)/(lastLength*2))+'px',
                        "margin": '0 2px'
                    });
                }
            },
            /* 重新计算 导航条1 只支持 pc  本导航需要优化 */
            renderNav1: function ($obj, navHtml) {
                if(!!navHtml) {
                    /* 如已存在 先清空  插入分类和更多分类的容器 */
                    $obj.find('.nav').html(navHtml);
                }
            },
            bindEvent: function ($obj, callback) {
                var self = this;
                 $obj.find('.nav').off('click.nav').on('click.nav', '.cont-nav span', function () {
                    var that = $(this);
                    if(that.hasClass('show-more')) return ;
                    if($obj.attr('navids')) {
                        // 清除所有span标签上的on
                        $obj.find('.nav span').removeClass('on');
                        
                        // 根据点击对应的容器内的span元素  执行对应的操作
                        if(that.parents('.nav-more').length) {
                            var _that = that.clone();
                            $obj.find('.nav span.show-more').before(_that);
                            that.remove();
                            that = _that;
                            that.parents('.nav-more').hide();
                        }
                        self.renderNav($obj, '');
                        that.addClass('on');
                        callback($obj);
                    } else {
                        that.addClass('on');
                    }
                    // 每次点击导航时，重置数据之后应当重置加载更多按钮的样式 和flag
                    $obj.attr('curPage', 1);
                    $obj.attr('artload') == 'load1' && $obj.find('.load-more p').removeAttr('style').text('加载更多');
                    $obj.find('.nav-more').hide();
                });

                /* 移入查看更多 导航更多展开 -- 针对样式 nav1 */
                $obj.find('.nav').off('mouseenter.show-more').on('mouseenter.show-more', '.cont-nav .show-more', function () {
                    $obj.find('.nav-more').show();
                });
                /* 移出显示更多 导航更多收起 -- 针对样式 nav1 */
                $obj.find('.nav').off('mouseleave.nav-more').on('mouseleave.nav-more', '.nav-more', function () {
                    $obj.find('.nav-more').hide();
                });
            }
        };
        return new _obj();
    })();

    /**
     * 导航样式 2   兼容 pc、phone
     * pcdesign and host 用一个
     * 包括 
     *    1. 是否为导航2 方法  isNav2
     *    2. 渲染添加导航2字符串 方法  renderNav2
     *    3. 绑定导航点击事件 方法  doEvent , 提供 点击成功后 callback回调方法 解决 一个页面多种导航问题
     */
    var Nav2 = (function () {
        var _obj = function () {};
        _obj.prototype = {
            isNav2: function ($obj) {
                return $obj.attr('artnav') == 'nav2' ? true : false;
            },
            renderNav2: function ($obj, navHtml) {
                if(!!navHtml) {
                    /* 如已存在 先清空  插入分类和更多分类的容器 */
                    $obj.find('.nav .cont-nav').html(navHtml);
                } 
            },
            /* 点击事件成功后，对应回调 */
            bindEvent: function ($obj, callback) {
                /* 导航事件 绑定 */
                $obj.find('.nav').off('click.nav').on('click.nav', '.cont-nav span', function () {
                    var that = $(this);
                    if(that.hasClass('show-more')) return ;
                    if($obj.attr('navids')) {
                        var warp = that.parents(".nav"),
                        warpWidth = warp.width(),
                        thisOL_W = that.parent().width(),
                        centerLeft = warpWidth/2,
                        index = that.index();
                        if(thisOL_W > warpWidth) {
                            var lastLeft = 0;
                            that.parent().children().each(function (i, _) {
                                if(i == index) { return false; }
                                lastLeft += $(_).outerWidth(true);
                            });
                            lastLeft += that.outerWidth()/2;
                            // 点击 最前面几个时
                            if(centerLeft > lastLeft) {
                                lastLeft = 0;
                            } else {
                                lastLeft = centerLeft - lastLeft;
                            }
                            /* 跟着第二种导航动画一起 */
                            var _getStyle = function (val, time) {
                                return {
                                    '-webkit-transition': '-webkit-transform '+time+'ms',
                                    '-moz-transition': '-webkit-transform '+time+'ms',
                                    '-o-transition': '-webkit-transform '+time+'ms',
                                    'transition': 'transform '+time+'ms',
                                    '-webkit-transform': 'translate3d('+val+'px,0,0)',
                                    '-moz-transform': 'translate3d('+val+'px,0,0)',
                                    '-o-transform': 'translate3d('+val+'px,0,0)',
                                    'transform': 'translate3d('+val+'px,0,0)',
                                    '-webkit-backface-visibility': 'hidden'
                                };
                            }

                            that.parent().css(_getStyle(lastLeft, 300));
                        };
            
                        if(!that.hasClass('on')) {
                            that.addClass('on').siblings('span').removeClass('on');
                            callback($obj);
                        }
                    } else {
                        that.addClass('on').siblings('span').removeClass('on');
                    }
                });
            }
        };
        return new _obj();
    })();
    var Pagination1 = (function () {
        var _obj = function () {};
        _obj.prototype = {
            isPagination1: function ($obj) {
                return $obj.attr('artload') == 'load1' ? true : false;
            },
            bindEvent: function ($obj, callback) {
                $obj.off('click.load-more').on('click.load-more', '.load-more p', function (e) {
                    var id = $obj.find('.nav span.on').data('categoryid'), curPage = 0;
                    if(id) {
                        curPage = parseInt($obj.attr('curPage')) + 1;
                        $obj.attr('curPage', curPage)
                        callback($obj);
                    } 
                });
            }
        };
        return new _obj();
    })();
    /**
     * 分页样式2  只支持 pc
     * pcdesign and host 用一个
     *
     */
    var Pagination2 = (function () {
        var _obj = function () {};
        _obj.prototype = {
            /* 存放对应的全部条数，当前页面 */
            pageData: {
                totalCount: 25,
                curPage: 3          // 当前页数 先从对应元素节点attr上获取 再从接口获取 
            },
            isPagination2: function ($obj) {
                return $obj.attr('artload') == 'load2' ? true : false;
            },
            /* 重新计算 分页 只支持 pc */
            renderPagination: function ($obj) {
                var self = this;
                var page = Math.ceil(self.pageData.totalCount / ((-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1)));
                var str = '';
                /* 大于7才会有...方式 */
                if(page >= 7) {
                    /* 点击最后一个或...之前的一个 */
                    if(self.pageData.curPage+2 >= page) {
                        for(var i=0;i<5; i++) {
                            str = '<p class="item '+(page-i == self.pageData.curPage ? 'on':'')+'">'+(page-i)+'</p>' + str;
                        }
                    } else {
                        var prevCount = nextCount = self.pageData.curPage; /* 显示5个 */
                        str += '<p class="item on">'+self.pageData.curPage+'</p>';
                        for(var i=0; i<2; i++) {
                            prevCount --;nextCount ++;
                            if(prevCount > 0) {
                                str = '<p class="item">'+prevCount+'</p>'+str+'<p class="item">'+nextCount+'</p>';
                            } else {
                                str += '<p class="item">'+nextCount+'</p>';
                                nextCount ++;
                                str += '<p class="item">'+nextCount+'</p>';
                            }
                        }
                        str += '<p class="more">...</p><p class="item">'+page+'</p>';
                    }
                } else {
                    for(var i=1; i<=page; i++) {
                        str += '<p class="item '+(i == self.pageData.curPage ? 'on':'')+'">'+i+'</p>';
                    }
                }
                $obj.find('.load-more .pages').html(str);
                $obj.find('.load-more .pages p').addClass('wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr');
            },
            /* 为了保证 一个页面中有多个控件，都可用，使用统一事件绑定，执行时判断方式 */
            bindEvent: function ($obj, callback) {
                var self = this;
                $obj.off('click.load-more').on('click.load-more', '.load-more p', function (e) {
                    var id = $obj.find('.nav span.on').data('categoryid'), curPage = 0, that = $(e.target);
                    if(id != undefined || id != '') {
                        if(that.hasClass('item')) {
                            curPage = that.text();
                        } else if(that.hasClass('first')) {
                            curPage = 1;
                        } else if(that.hasClass('prev')) {
                            curPage = parseInt($obj.attr('curPage')) - 1;
                            if(curPage <= 0) return ;
                        } else if(that.hasClass('next')) {
                            curPage = parseInt($obj.attr('curPage')) + 1;
                            if(curPage > Math.ceil(self.pageData.totalCount / ((-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1)))) return ;
                        } else {
                            return ;
                        }
                        $obj.attr('curPage', curPage);
                        callback($obj);
                    } 
                });
            }
        };
        return new _obj();
    })();

    /**
     * 高级搜索样式 1   只支持 pc
     * pcdesign and host 用一个
     * 包括 
     *    1. 是否为高级搜索1 方法  isAdvSearch1
     *    2. 渲染添加高级搜索1字符串 方法  renderAdvSearch1
     *    3. 绑定高级搜索点击事件 方法  bindEvent , 提供 点击成功后 callback回调方法
     */
    var AdvSearch1 = (function () {
        var _obj = function () {};
        _obj.prototype = {
            isAdvSearch1: function ($obj) {
                return $obj.attr('artsearch') == 'search1' ? true : false;
            },
            renderAdvSearch1: function ($obj, data) {
                var advSearchHtml = '';
                for(var i=0; i<data.length; i++) {
                    if(data[i].code == 'hometown') continue;
                    var ranges = data[i].ranges;
                    var str = (ranges[0] && ranges[0].rangeType || '') != 'Multi' ? 'only' : '';
                    var tagStr = '<span class="tag on wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-code="-1">全部</span>';
                    for(var j=0; j<ranges.length; j++) {
                        tagStr += '<span class="tag wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-val="'+ranges[j].fixedValue+'" data-code="'+data[i].code+'" data-type="'+ranges[j].rangeType+'">'+(ranges[j].fixedAlias || ranges[j].fixedValue)+'</span>';
                    }
                    advSearchHtml += [
                        '<div class="item wqd-brc wqd-brw '+str+'">',
                            '<span class="name wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">'+data[i].fieldName+(str != 'only'?'(多选)':'')+'：</span>',
                            '<div class="sel-tags">',
                                tagStr,
                            '</div>',
                            '<div class="add-more wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">更多</div>',
                        '</div>'
                    ].join('');
                }
                $obj.find('.advSearch-box .select-group').html(advSearchHtml);
                /* 默认搜索项不多时，隐藏更多 */
                $obj.find('.advSearch-box .select-group .item').each(function (i, _) {
                    var totalWidth = $(_).find('.sel-tags').outerWidth();
                    var sumWidth = 0;
                    $(_).find('.sel-tags span').each(function (i, _) {
                        sumWidth += $(_).outerWidth();
                    });
                    if(sumWidth < totalWidth) { $(_).find('.add-more').hide(); } else { $(_).find('.add-more').show(); }
                });
            },
            bindEvent: function ($obj, callback) {
                /* 绑定 高级搜索 */
                $obj.off('click.sel-tag').on('click.sel-tag', '.sel-tags .tag', function (e) {
                    if($(this).parents('.item').hasClass('only')) {
                        $(this).addClass('on').siblings().removeClass('on');
                    } else {
                        /* 第一个全选操作 */
                        if($(this).index() == 0) {
                            if(!$(this).hasClass('on')) {
                                $(this).addClass('on').siblings().removeClass('on');
                            }
                        } else {
                            if($(this).hasClass('on')) {
                                $(this).removeClass('on');
                                if(!$(this).siblings().hasClass('on')) {
                                    $(this).siblings().eq(0).addClass('on');
                                }
                            } else {
                                $(this).addClass('on');
                                $(this).siblings().eq(0).removeClass('on');
                            }
                        }
                    }

                    /* 选择完成后，循环遍历，调用数据 */
                    callback($obj);
                });
                /* 绑定 高级搜索 点击查看更多 */
                $obj.off('click.sel-tag-more').on('click.sel-tag-more', '.add-more', function (e) {
                    if($(this).hasClass('on')) {
                        $(this).removeClass('on');
                        $(this).prev().removeAttr('style', '');
                    } else {
                        $(this).addClass('on');
                        $(this).prev().css({
                            'white-space': 'normal'
                        });
                    }
                });
            }
        };
        return new _obj();
    })();

    /**
     * 高级搜索样式 2   只支持 phone
     * pcdesign and host 用一个
     * 包括 
     *    1. 是否为高级搜索2 方法  isAdvSearch2
     *    2. 渲染添加高级搜索2字符串 方法  renderAdvSearch2
     *    3. 绑定高级搜索点击事件 方法  bindEvent , 提供 点击成功后 callback回调方法
     */
    var AdvSearch2 = (function () {
        var _obj = function () {};
        _obj.prototype = {
            isAdvSearch2: function ($obj) {
                return $obj.attr('artsearch') == 'search2' ? true : false;
            },
            renderAdvSearch2: function ($obj, data) {
                var advSearchHtml = '';
                for(var i=0; i<data.length; i++) {
                    if(data[i].code == 'hometown') continue;
                    var ranges = data[i].ranges;
                    var str = (ranges[0] && ranges[0].rangeType || '') != 'Multi' ? 'only' : '';
                    var tagStr = '<div class="item on wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-code="-1"><svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>全部</div>';
                    for(var j=0; j<ranges.length; j++) {
                        tagStr += '<div class="item wqd-bgclr wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst" data-val="'+ranges[j].fixedValue+'" data-code="'+data[i].code+'" data-type="'+ranges[j].rangeType+'"><svg style="display:none;" viewBox="0 0 1024 1024"><path d="M380.416 822.144c-10.432 0-20.864-3.968-28.8-11.968L75.968 534.592c-15.936-15.936-15.936-41.664 0-57.6 15.872-15.872 41.664-15.872 57.536 0L380.416 723.84l510.08-510.016c15.872-15.936 41.664-15.936 57.536 0 15.936 15.936 15.936 41.664 0 57.6L409.216 810.24c-7.936 7.936-18.368 11.904-28.8 11.904z" /></svg>'+(ranges[j].fixedAlias || ranges[j].fixedValue)+'</div>';
                    }
                    advSearchHtml += [
                        '<div class="gr-box">',
                            '<div class="b-hd">',
                                '<div class="left-content">'+data[i].fieldName+(str != 'only'?'(多选)':'')+'</div>',
                                '<div class="right-content"><span>全部</span>',
                                    '<svg class="down" viewBox="0 0 1026 1024"><path d="M1018.701913 255.75513c-8.704-8.704-22.77287-8.704-31.47687 0L516.563478 726.416696 45.924174 255.75513c-8.704-8.704-22.77287-8.704-31.47687 0s-8.704 22.77287 0 31.47687l486.4 486.4c4.34087 4.34087 10.039652 6.522435 15.738435 6.522435s11.397565-2.181565 15.738435-6.522435l486.4-486.4C1027.383652 278.550261 1027.383652 264.45913 1018.701913 255.75513z" p-id="7641"></path></svg>',
                                    '<svg class="up" viewBox="0 0 150.3 150" style="display:none;"><path d="M2.1,113.3c1.3,1.3,3.3,1.3,4.6,0l68.9-68.9l68.9,68.9c1.3,1.3,3.3,1.3,4.6,0c1.3-1.3,1.3-3.3,0-4.6L78,37.5  c-0.6-0.6-1.5-1-2.3-1s-1.7,0.3-2.3,1L2.1,108.7C0.8,110,0.8,112,2.1,113.3z"></path></svg>',
                                '</div>',
                                '<div class="center-content"></div>',
                            '</div>',
                            '<div class="b-bd '+str+'">',
                                tagStr,
                            '</div>',
                        '</div>'
                    ].join('');
                }
                $obj.find('.advSearch-box1 .sel-group-box').html(advSearchHtml);
            },
            bindEvent: function ($obj, callback) {
                /* 绑定 高级搜索 */
                $('body').off('click.gr-box-bd-advSearch2').on('click.gr-box-bd-advSearch2', '.advSearch-box1.show .gr-box .b-bd .item', function (e) {
                    if($(this).parents('.b-bd').hasClass('only')) {
                        $(this).addClass('on').siblings().removeClass('on');
                    } else {
                        /* 第一个全选操作 */
                        if($(this).index() == 0) {
                            if(!$(this).hasClass('on')) {
                                $(this).addClass('on').siblings().removeClass('on');
                            }
                        } else {
                            if($(this).hasClass('on')) {
                                $(this).removeClass('on');
                                if(!$(this).siblings().hasClass('on')) {
                                    $(this).siblings().eq(0).addClass('on');
                                }
                            } else {
                                $(this).addClass('on');
                                $(this).siblings().eq(0).removeClass('on');
                            }
                        }
                    }

                    /* 将选中的内容 显示在对应头部上 */
                    var str = '';
                    $(this).parents('.b-bd').find('.item').each(function (i, _) {
                        if($(_).text() != '全部' && $(_).hasClass('on')) {
                            str += $(_).text() + '，';
                        }
                    });
                    $(this).parents('.b-bd').prev().find('.center-content').html(str.replace(/，$/gi, ''));
                    str == '' && $(this).parents('.b-bd').prev().find('.right-content').removeClass('on');
                    str != '' && $(this).parents('.b-bd').prev().find('.right-content').addClass('on');

                    return false;
                });
                /* 绑定 高级搜索 点击查看全部 */
                $('body').off('click.sel-show-all-advSearch2').on('click.sel-show-all-advSearch2', '.advSearch-box1.show .gr-box .b-hd', function (e) {
                    if($(this).hasClass('on')) {
                        $(this).removeClass('on');
                        $(this).next().removeClass('on');
                    } else {
                        $(this).addClass('on');
                        $(this).next().addClass('on');
                    }

                    return false;
                });
                // 不在设计器 在host时， 进行绑定
                if(!sceneList._str) {
                    $obj.off('click.btn-self-advSearch2').on('click.btn-self-advSearch2', '.btn-self span', function (e) {
                        if($(this).html() == "筛选" && !$('body').find('.advSearch-box1.self').length) {
                            var _obj = $obj.find('.advSearch-box1').clone().addClass('self');
                            $('body').append(_obj[0].outerHTML);
                            setTimeout(function () {
                                $('body').find('.advSearch-box1.self').addClass('show');
                            }, 50);
                            // 确定
                            $('body').off('click.clear-advSearch2').on('click.clear-advSearch2', '.advSearch-box1.self .sub-mit', function (e) {
                                // 确定时 还需要 提交搜索结果
                                /* 选择完成后，循环遍历，调用数据 */
                                callback($obj);

                                $('body').find('.advSearch-box1.self').removeClass('show');
                                setTimeout(function () {
                                    var _obj = $('body').find('.advSearch-box1.self').clone();
                                    $obj.find('.advSearch-box1').replaceWith(_obj.removeClass('self')[0].outerHTML);
                                    $('body').find('.advSearch-box1.self').remove();
                                }, 700);

                                return false;
                            });
                            // 重置
                            $('body').off('click.reset-advSearch2').on('click.reset-advSearch2', '.advSearch-box1.self .can-cel', function (e) {
                                $('body').find('.advSearch-box1.show .gr-box .b-bd').each(function (i, _) {
                                    $(_).find('.item').eq(0).click();
                                });

                                return false;
                            }); 
                            // 消失
                            $('body').off('click.disappear-advSearch2').on('click.disappear-advSearch2', '.advSearch-box1.self .self-mark', function (e) {
                                if($(e.target).hasClass('self-mark')) {
                                    $('body').find('.advSearch-box1.self').removeClass('show');
                                    setTimeout(function () {
                                        var _obj = $('body').find('.advSearch-box1.self').clone();
                                        $obj.find('.advSearch-box1').replaceWith(_obj.removeClass('self')[0].outerHTML);
                                        $('body').find('.advSearch-box1.self').remove();
                                    }, 700);
                                }
                            });
                        }
                    });
                }

            }
        };
        return new _obj();
    })();

    /**
     * pc、phone公用方法， 在 pcdesign 和 host 中同样适用
     * 包括 
     *    1. 设置通栏高度 方法  setSectionHeight  
     *    2. 是否设置通栏高度 方法  isSetSectionHeight
     *    3. 重新计算所有图片显示 方法  resizeImageShow
     *    4. 计算得到距通栏低端最低元素 方法  getLastTopElem
     */
    var sceneCommon = (function () {
        var _obj = function () {};
        _obj.prototype = {
            /* 通用加载更多事件绑定，判别对应不同类型加载更多 对应点击事件 */
            bindLoadMoreEvent: function ($obj, callback) {
                Pagination1.isPagination1($obj) && Pagination1.bindEvent($obj, function ($obj) {
                    callback($obj);
                });
                Pagination2.isPagination2($obj) && Pagination2.bindEvent($obj, function ($obj) {
                    callback($obj);
                });
            },
            /* 通用导航事件绑定，判别对应不同类型的导航 对应点击事件 */
            bindNavEvent: function ($obj, callback) {
                Nav2.isNav2($obj) && Nav2.bindEvent($obj, function ($obj) {
                    callback($obj);
                });
                Nav1.isNav1($obj) && Nav1.bindEvent($obj, function ($obj) {
                    callback($obj);
                });
            },
            /* 通用高级搜索事件绑定，判别对应不同类型的高级搜索 对应点击事件 */
            bindAdvSearchEvent: function ($obj, callback) {
                AdvSearch1.isAdvSearch1($obj) && AdvSearch1.bindEvent($obj, function ($obj) {
                    callback($obj);
                });
                AdvSearch2.isAdvSearch2($obj) && AdvSearch2.bindEvent($obj, function ($obj) {
                    callback($obj);
                });
            },
            /**
             * 设置section高度值  -  为控件时 才使用 
             * 根据最低的元素 给通栏赋高度值
             */
            setSectionHeight: function ($obj, sJSON) {
                var self = this;
                var $parent = $obj.parent('section');
                var eJSON = self.getLastTopElem($obj);
                self.isSetSectionHeight($parent) && $parent.css({
                    'height': eJSON.lastTop + (eJSON.$lastElem && eJSON.$lastElem.outerHeight()) + 'px'
                }); 
            },
            /**
             * 是否 动态设置通栏高度，只有在控件条件下  才设置通栏高度
             */
            isSetSectionHeight: function ($obj) {
                if($obj.closest('.wqdSectiondiv').data('coltype') == 'newColList') {
                    return false;
                } else if($obj.closest('.wqdSectiondiv').data('coltype') == 'sceneColList') {
                    return false;
                }
                return true;
            },
            /**
             * 重新 计算通栏中所有图片的大小，并给出最佳显示方式，居中显示
             */
            resizeImageShow: function ($obj) {
                // 对当前通栏中所有图片进行循环
                $obj.find('img').each(function (i, _) {
                    var img = new Image();
                    img.src = $(_).attr('src');
                    if(img.complete) {
                        if(img.width/img.height > ($(_).parent().width()/$(_).parent().height())) {
                            $(_).css({ "width": "auto", "height": "100%" });
                        } else {
                            $(_).css({ "width": "100%", "height": "auto" });
                        }
                    } else {
                        (function (img, _) {
                            img.onload = function () {
                                if(this.width/this.height > ($(_).parent().width()/$(_).parent().height())) {
                                    $(_).css({ "width": "auto", "height": "100%" });
                                } else {
                                    $(_).css({ "width": "100%", "height": "auto" });
                                }  
                            }
                        })(img, _);
                    }
                });
            },
            /**
             * 得到最高元素  -  为控件时 才使用
             * 计算当前通栏中距离底部 最近的元素 是哪个
             */
            getLastTopElem: function ($obj) {
                var json = {};
                var $parent = $obj.parent('section');
                var $arr = $parent.children('.wqdelementEdit');
                json.top = $obj.position().top;
                json.H = $obj.outerHeight();

                json.lastTop = json.top;
                json.$lastElem = $obj;
                json.offsetH = $parent.outerHeight() - json.lastTop - (json.$lastElem && json.$lastElem.outerHeight());
                $arr.each(function (i, _) {
                    var tempTop = $(_).position().top;
                    if(json.lastTop+json.$lastElem.outerHeight() < tempTop+$(_).outerHeight()) {
                        json.lastTop = tempTop;
                        json.$lastElem = $(_);
                    }
                });
                json.offsetH = $parent.outerHeight() - json.lastTop - (json.$lastElem && json.$lastElem.outerHeight());
                return json;
            },
            AJAX: function (_obj, callback) {
                $.ajax({
                    url: _obj.url,
                    dataType: _obj.dataType,
                    jsonp: _obj.jsonp || '',
                    type: _obj.type,
                    data: _obj.data,
                    success: function (data) {
                        callback(data);
                    }
                });
            } 
        }
        return new _obj();
    })();


    /** 
     * 公共方法提取   场景应用
     * 从场景应用中  区分出来  文章、商品、具体行业等 
     */
    sceneList = {
        /* 直接 添加通栏字符串 */
        addSectionStr: [
            '<div class="yzmoveContent">',
                '<div class="wqdSectiondiv" data-type="wqdSectiondiv" data-unused="height,elem">',
                    '<section class="wqd1445504393015css wqdBkEditos sectionV2 moveMainArea elementsContainer" style="margin:0 auto;position:relative;"></section>',
                '</div>',
            '</div>' 
        ].join(''),
        listStr: {
            sceneList1: [
                sceneListStr.getNavStyle(),
                sceneListStr.getSearchStyle(),
                '<ul class="comList">',
                    '<li class="list-cell wqd-brc wqd-brw">',
                        '<span class="svg-box"><svg fill="#ff3333" viewBox="0 0 200 200"> <path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M112.3,133.3H97.6V80.6c-4.8,3.5-10.1,6.4-15.9,8.7V76   c6.1-2.8,11.7-6.1,17.1-9.9h13.6V133.3z"></path> </svg> </span> ',
                        '<span class="newsTitle wqd-ff wqd-fs wqd-clr wqd-fw wqd-fst">为用户免费提供搭建一个优秀网站所需的全部功能，提供700多种模板无限模板无限</span>',
                        '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst"> <i> <svg viewBox="0 0 48 48"> <path class="wqd-bgclr" d="M23.4,15.9c-4.2,0-7.7,3.6-7.7,8s3.5,8,7.7,8c1.2,0,2.3-0.3,3.3-0.8c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.8-0.7-1.3-0.5    c-0.8,0.4-1.6,0.6-2.5,0.6c-3.1,0-5.7-2.7-5.7-5.9s2.6-5.9,5.7-5.9c3.1,0,5.7,2.7,5.7,5.9c0,0.6-0.1,1.1-0.2,1.6    c-0.1,0.6,0.1,1.1,0.7,1.3c0.5,0.2,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.5,0.3-2.2C31.1,19.5,27.7,15.9,23.4,15.9z M19.8,22.4    c-0.2,0.5-0.3,1-0.3,1.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-0.4,0.1-0.7,0.2-1.1c0.4-1.2,1.5-1.9,2.7-1.9    c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5C21.8,19.8,20.4,20.9,19.8,22.4z M46.2,22.6C40.5,15.2,32.1,9.7,23.4,9.7    c-8.7,0-15.9,5.4-21.6,12.8c-0.1,0.2-0.2,0.4-0.2,0.6v1.3c0,0.2,0.1,0.5,0.2,0.6C7.5,32.6,14.7,38,23.4,38c8.7,0,17-5.4,22.8-12.9    c0.1-0.2,0.2-0.4,0.2-0.6v-1.3C46.4,23,46.4,22.8,46.2,22.6z M44.4,24.2c-5.4,6.8-13,11.8-21,11.8s-14.5-5-19.8-11.8v-0.6    C9,16.8,15.4,11.8,23.4,11.8c8,0,15.6,5,21,11.8C44.4,23.6,44.4,24.2,44.4,24.2z"></path> </svg> </i>9999W+ </span> ',
                    '</li>',
                    sceneListStr.getLoadMoreStyle(),
                '</ul>'
            ].join(''),
            sceneList2: [
                sceneListStr.getNavStyle(),
                sceneListStr.getSearchStyle(),
                '<div class="comList">',
                    '<div class="list-cell">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">自身开发应用，如社交分享插件、图册、联系表单、数据分析等，提供数据分析等，提供自身开发应用，如社交分享插件、图册、联系表单、供</p>',
                        '<div class="imgGroup">',
                            '<div class="img-box wqd-h"><img src="http://ohuih434n.bkt.clouddn.com/qngroup001%2Fu434341%2F1%2F0%2Fdb3ee3c73ace40119a96f965d8b78b18.jpg" ondragstart="return false;"></div>',
                            '<div class="img-box wqd-h"><img src="http://ohuih434n.bkt.clouddn.com/qngroup001%2Fu434341%2F1%2F0%2F980d7bb8ecca47508871edaaaf9ba03c.jpg" ondragstart="return false;"></div>',
                            '<div class="img-box wqd-h"><img src="http://ohuih434n.bkt.clouddn.com/qngroup001%2Fu434341%2F1%2F0%2F66a8cb03179c41ce830879f953c87208.jpg" ondragstart="return false;"></div>',
                        '</div>',
                        '<div class="footer">',
                            '<div class="fl">',
                                '<span class="show-time wqd-clr wqd-bgclr wqd-fw wqd-fst">2017-08-17</span>',
                                '<span class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff midSpan">互联网</span>',
                                '<span class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">免费建站</span>',
                            '</div>',
                            '<div class="fr">',
                                '<span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst"><i class="icon-fav"> <svg viewBox="0 0 48 48">  <g> <g> <path class="st0 wqd-bgclr" d="M36.4,19.2C36,19,35.5,19,34.9,19H31c0.5-2.3,0.6-5.6,0.6-7.6c0-2.3-1.9-4.2-4.2-4.2c-2.3,0-4.2,1.9-4.2,4.2    v0.8c0,4.6-3.7,8.3-8.2,8.4c-0.1,0-0.1,0-0.2,0h-4.2c-1.9,0-3.4,1.5-3.4,3.4v13.4c0,1.9,1.5,3.4,3.4,3.4h4.2    c0.4,0,0.8-0.4,0.8-0.9V22.2c5.2-0.4,9.3-4.7,9.3-10v-0.8c0-1.3,1.1-2.5,2.5-2.5c1.3,0,2.5,1.1,2.5,2.5c0,3.8-0.3,6.8-0.8,8.1    c-0.1,0.2,0,0.5,0.1,0.8c0.1,0.2,0.4,0.4,0.7,0.4h5c0.4,0,0.8,0,1.1,0.1c2.3,0.6,3.6,2.9,3,5.1c-0.7,2.5-4.1,11.2-4.4,12    c-0.5,0.8-1.2,1.2-2.2,1.2H19.8c-0.4,0-0.8,0.3-0.8,0.8c0,0.4,0.3,0.8,0.8,0.8h12.6c0,0,0.1,0,0.2,0c1.4,0,2.7-0.8,3.5-2.1    c0,0,0,0,0-0.1c0.1-0.4,3.8-9.6,4.5-12.2C41.4,23.3,39.6,20,36.4,19.2z M13.9,39h-3.4c-0.9,0-1.7-0.8-1.7-1.7V23.9    c0-0.9,0.8-1.7,1.7-1.7h3.4V39z"></path> </g> </g> </svg> </i>3672</span>',
                                '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst"><i class="icon-view"> <svg viewBox="0 0 48 48"> <g> <g> <path class="wqd-bgclr" d="M23.4,15.9c-4.2,0-7.7,3.6-7.7,8s3.5,8,7.7,8c1.2,0,2.3-0.3,3.3-0.8c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.8-0.7-1.3-0.5    c-0.8,0.4-1.6,0.6-2.5,0.6c-3.1,0-5.7-2.7-5.7-5.9s2.6-5.9,5.7-5.9c3.1,0,5.7,2.7,5.7,5.9c0,0.6-0.1,1.1-0.2,1.6    c-0.1,0.6,0.1,1.1,0.7,1.3c0.5,0.2,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.5,0.3-2.2C31.1,19.5,27.7,15.9,23.4,15.9z M19.8,22.4    c-0.2,0.5-0.3,1-0.3,1.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-0.4,0.1-0.7,0.2-1.1c0.4-1.2,1.5-1.9,2.7-1.9    c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5C21.8,19.8,20.4,20.9,19.8,22.4z M46.2,22.6C40.5,15.2,32.1,9.7,23.4,9.7    c-8.7,0-15.9,5.4-21.6,12.8c-0.1,0.2-0.2,0.4-0.2,0.6v1.3c0,0.2,0.1,0.5,0.2,0.6C7.5,32.6,14.7,38,23.4,38c8.7,0,17-5.4,22.8-12.9    c0.1-0.2,0.2-0.4,0.2-0.6v-1.3C46.4,23,46.4,22.8,46.2,22.6z M44.4,24.2c-5.4,6.8-13,11.8-21,11.8s-14.5-5-19.8-11.8v-0.6    C9,16.8,15.4,11.8,23.4,11.8c8,0,15.6,5,21,11.8C44.4,23.6,44.4,24.2,44.4,24.2z"></path> </g> </g> </svg> </i>2560</span>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                    sceneListStr.getLoadMoreStyle(),
                '</div>'
            ].join(''),
            sceneList3: [
                sceneListStr.getNavStyle(),
                sceneListStr.getSearchStyle(),
                '<div class="comList">',
                    '<div class="list-cell">',
                        '<div class="left-con wqd-w wqd-h"> <img src="http://ohuih434n.bkt.clouddn.com/qngroup001%2Fu434341%2F1%2F0%2Fdb3ee3c73ace40119a96f965d8b78b18.jpg " ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">专业评测 用H5技术免费建企业官网</p>',
                            '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst ">是个免费好用的H5自助建站工具，能够通过在线拖放工具帮助用户创建HTML5网站和移动网站。</p>',
                            '<div class="infoBar">',
                                '<div class="tags"> <span class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">娱乐</span> <span class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">电影</span> </div>',
                                '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst">2016/6/18 15:50</div>',
                                '<div class="info"> <span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">阅读:1829</span> <span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst">点赞:39</span> </div>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                    sceneListStr.getLoadMoreStyle(),
                '</div>'
            ].join(''),
            sceneList4: [
                '<div class="nav">',
                    '<hr class="line">',
                    '<span class="on wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="margin:0 2px;">热点新闻</span>',
                    '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="margin:0 2px;">国际时事</span>',
                    '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="margin:0 2px;">娱乐爆料</span>',
                    '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc" style="margin:0 2px;">经济头条</span>',
                '</div>',
                sceneListStr.getSearchStyle(),
                '<div class="comList">',
                    '<div class="list-cell">',
                        '<div class="left-con wqd-w wqd-h"> <img src="http://ohuih434n.bkt.clouddn.com/qngroup001%2Fu434341%2F1%2F0%2Fdb3ee3c73ace40119a96f965d8b78b18.jpg " ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">专业评测 用H5技术免费建企业官网</p>',
                            '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst ">是个免费好用的H5自助建站工具，能够通过在线拖放工具帮助用户创建HTML5网站和移动网站。</p>',
                            '<div class="infoBar">',
                                '<div class="tags"> <span class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">娱乐</span> <span class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">电影</span> </div>',
                                '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst">2016/6/18 15:50</div>',
                                '<div class="info"> <span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">阅读:1829</span> <span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst">点赞:39</span> </div>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                    sceneListStr.getLoadMoreStyle(),
                '</div>'
            ].join(''),
            sceneList5: [
                sceneListStr.getNavStyle(),
                sceneListStr.getSearchStyle(),
                '<div class="comList">',
                    '<div class="list-cell wqd-brs wqd-brc wqd-brw wqd-mgn-t">',
                        '<div class="left-con wqd-w wqd-h wqd-mgn-r"> <img src="http://u10161-b56ce923f0cc4660a7b8c3d8b0496e44.ktb.wqdian.xin/qngroup001%2Fu10161%2F1%2F0%2F977c45086bdd4662aa39a4ec7c595f74.jpg" ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<div style="line-height:0;font-size:0;"><span style="display:-webkit-box;display:-moz-box;display:box;width:1px;height:1px;"></span></div>',  //手机端 展示两列时，解决右侧内容不自动被挤下去的问题
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">张阿姨</p>',
                            '<div class="tags">',
                                '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                                '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                                '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                                '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                                '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                            '</div>',
                            '<div class="detail wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">45岁 | 北京 | 115单</div>',
                            '<p class="money wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">￥60 <em class=" wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">/ 小时</em></p>',
                        '</div>',
                    '</div>',
                    sceneListStr.getLoadMoreStyle(),
                '</div>'
            ].join(''),
            sceneList6: [
                sceneListStr.getNavStyle(),
                sceneListStr.getSearchStyle(),
                '<div class="comList">',
                    '<div class="list-cell wqd-brs wqd-brc wqd-brw wqd-mgn-t">',
                        '<div class="top-con wqd-h"> <img src="http://u10161-b56ce923f0cc4660a7b8c3d8b0496e44.ktb.wqdian.xin/qngroup001%2Fu10161%2F1%2F0%2F0378948d64b944efb29c0715c81e7ad5.jpg" ondragstart="return false; "> </div>',
                        '<div class="bottom-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">全方位 • 家政保洁护理服务 -1人次 </p>',
                            '<p class="detail wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst ">健康证、护工证、家政人员证 </p>',
                            '<hr class="line wqd-brc wqd-brw">',
                            '<div class="money wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">￥259.00/人</div>',
                            '<div class="fav wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">已有338人预定</div>',
                        '</div>',
                    '</div>',
                    sceneListStr.getLoadMoreStyle(),
                '</div>'
            ].join('')
        },
        listNullStr: {
            sceneList1: [
                '<li class="list-cell artPlugin-no-data wqd-brc wqd-brw">',
                    '<span class="svg-box"></span>',
                    '<span class="newsTitle wqd-ff wqd-fs wqd-clr wqd-fw wqd-fst">暂没有数据</span>',
                    '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst"></span>',
                '</li>'
            ].join(''),
            sceneList2: [
                '<div class="list-cell artPlugin-no-data">',
                    '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                    '<div class="imgGroup"></div>',
                    '<div class="footer">',
                        '<div class="fl"><span></span></div>',
                        '<div class="fr"></div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join(''),
            sceneList3: [
                '<div class="list-cell artPlugin-no-data">',
                    '<div class="right-con" style="margin-left:0;">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                        '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst"></p>',
                        '<div class="infoBar">',
                            '<div class="tags"></div>',
                            '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst"></div>',
                            '<div class="info"></div>',
                        '</div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join(''),
            sceneList4: [
                '<div class="list-cell artPlugin-no-data">',
                    '<div class="right-con" style="margin-left:0;">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                        '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst"></p>',
                        '<div class="infoBar">',
                            '<div class="tags"></div>',
                            '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst"></div>',
                            '<div class="info"></div>',
                        '</div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join(''),
            sceneList5: [
                '<div class="list-cell artPlugin-no-data">',
                    '<div class="right-con" style="margin-left:0;">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                        '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst"></p>',
                        '<div class="infoBar">',
                            '<div class="tags"></div>',
                            '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst"></div>',
                            '<div class="info"></div>',
                        '</div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join(''),
            sceneList6: [
                '<div class="list-cell artPlugin-no-data">',
                    '<div class="right-con" style="margin-left:0;">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                    '</div>',
                '</div>'
            ].join('')
        },
        listFun: {
            sceneList1Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                // 存放svg图形
                var svgArr = [
                    ['<svg fill="#ff3333" viewBox="0 0 200 200"><path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M112.3,133.3H97.6V80.6c-4.8,3.5-10.1,6.4-15.9,8.7V76   c6.1-2.8,11.7-6.1,17.1-9.9h13.6V133.3z"></path></svg>'].join(''),
                    ['<svg fill="#ff5c5c" viewBox="0 0 200 200"><path d="M43.6,42L12.4,157.5h144L187.6,42H43.6z M123.3,133.2H76.7v-13.3c1-1.2,3.6-3.6,7.8-7c16.3-13.8,24.3-23.3,24-28.4   c-0.5-5.4-3.2-8.2-8.1-8.5c-4.9,0.5-7.6,3.8-8.1,10H77.8c0.2-12.6,7.8-19.1,22.5-19.6c14.5,0.7,22,6.9,22.5,18.5   c0,7.6-7.1,17.4-21.4,29.2c-5.2,4.4-8.6,7.6-10.3,9.6h32.1V133.2z"></path></svg>'].join(''),
                    ['<svg fill="#ff9999" viewBox="0 0 200 200"><path d="M43.6,42L12.4,157.5h144L187.6,42H43.6z M99.5,133.2c-14.6,0-21.9-6.2-21.9-18.6h14.3c0.2,5.8,2.9,9.1,8,9.9   c5.1-0.5,7.9-3.8,8.4-9.9c-0.2-7.3-5.5-10.8-15.7-10.6v-9.1c10.7-0.2,16-3.7,15.7-10.2c-0.2-5.6-2.9-8.5-8-8.8   c-4.4,0.7-6.9,3.7-7.7,8.8H78.3c0.7-11.7,8-17.8,21.9-18.3c13.6,1.2,20.9,6.7,21.9,16.4c-0.2,8.8-4.4,14.1-12.4,16.1   c8.5,2.4,12.8,8.3,12.8,17.5C121.3,126.6,113.6,132.2,99.5,133.2z"></path></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><polygon points="101.4,108.1 101.4,84.3 85.2,108.1  "></polygon> <path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M124.9,119.1h-9.4v14.4h-14v-14.4H74.2v-12.8l27.2-39.7h14v41.6h9.4V119.1z"></path></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M101.1,133.4c-14.2-0.3-21.5-6-22-17.2h14.2c0.7,5.2,3.5,8,8.2,8.2   c6-0.2,9.2-5,9.7-14.2c-0.5-7.5-3.6-11.5-9.3-12c-4,0.3-6.7,2.7-8.2,7.5l-14.2-0.4l1.9-38.9h40.3v9.3h-28l-0.7,17.6   c3.2-3.2,7.3-4.9,12.3-4.9c13.2,0.5,19.9,8.1,20.2,22.8C124.1,125.1,116,132.4,101.1,133.4z"></path></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M100.5,99.9c-5.4,0.2-8.3,4.3-8.8,12.1c0.5,8.1,3.4,12.2,8.8,12.5c5.6-0.2,8.6-4.4,8.8-12.5   C109.1,104.2,106.1,100.2,100.5,99.9z"/><path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M118.5,126.3c-4.9,4.4-11.1,6.7-18.7,7c-15.2,0-22.7-9.2-22.7-27.5   c-0.7-26.6,7.8-39.9,25.7-39.6c12.7,0.7,19.2,6.5,19.4,17.2h-13.9c0-2.9-0.6-5-1.8-6.2c-1.5-1-3.3-1.5-5.5-1.5   c-5.9,0.2-8.9,6.7-9.2,19.4c2.9-3.2,7-4.8,12.1-4.8c12.7,0.7,19.4,7.5,20.2,20.2C124,116.9,122.2,122.2,118.5,126.3z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M44.1,42.3L12.9,157.7h144l31.1-115.5H44.1z M124,78.7l-20.9,54.6H88.8l21.6-56.1h-30v-11H124V78.7z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M100.5,104.2c-5.8,0.5-8.9,3.9-9.1,10.2c0.2,6.6,3.4,10,9.5,10.2c5.6-0.5,8.6-3.9,9.1-10.2   C109.5,107.8,106.3,104.4,100.5,104.2z"/><path d="M100.1,76.2c-5.6,0.5-8.5,3.3-8.7,8.4c0.2,5.6,3.5,8.5,9.8,8.7c5.6-0.5,8.5-3.4,8.7-8.7C109.7,79.2,106.5,76.4,100.1,76.2z   "/><path d="M44.1,42.3L12.9,157.7h144l31.1-115.5H44.1z M100.5,133.3c-15-0.5-22.8-6.7-23.3-18.6c0.5-8,5-13.3,13.5-16v-0.4   c-8.3-2.4-12.4-7.3-12.4-14.6c1-10.2,8.4-15.9,22.2-17.1c14.6,0.7,22.1,6.4,22.6,17.1c-0.7,7.8-5,12.6-12.7,14.6   c8.7,2.4,13.2,7.9,13.5,16.4C122.8,126.4,115.1,132.6,100.5,133.3z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M103.4,76.9c-6.1,0-9.1,3.9-9.1,11.7c0,7.3,3,11,9.1,11c5.4-0.2,8.2-3.9,8.4-11C111.6,81.1,108.8,77.2,103.4,76.9z"/><path d="M44.3,43.1L13.1,158.6h144l31.1-115.5H44.3z M102.3,134.3c-14.1,0.2-21.3-5.4-21.6-16.8H95c1,5.4,3.3,8,6.9,8   c7.3,0,10.6-6.8,9.9-20.5c-3.7,2.9-7.9,4.3-12.8,4c-11.7-1.2-18.2-7.8-19.4-19.7c1-13.6,8.6-21,23-21.9   c15.8-0.2,23.6,9.4,23.4,28.9C127.1,122.1,119.2,134.8,102.3,134.3z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M121.9,77c-5.6,0.2-8.4,8.4-8.4,24.6c0,15.9,2.8,24,8.4,24.2c5.6-0.2,8.4-8.3,8.4-24.2C130.3,85.4,127.5,77.2,121.9,77z"/><path d="M44.3,43.1L13.1,158.6h144l31.1-115.5H44.3z M88.2,133.8H73.9v-51c-4.6,3.4-9.8,6.2-15.4,8.4V78.4   c5.9-2.7,11.4-5.9,16.5-9.5h13.2V133.8z M121.5,134.5c-14.4-0.2-21.9-11.2-22.4-33c0.5-22.5,7.9-33.9,22.4-34.1   c15.2,0.2,23,11.6,23.5,34.1C144.8,123.3,136.9,134.3,121.5,134.5z"/></svg>'].join('')
                ];

                var news = data.news;
                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<li class="list-cell wqd-brc wqd-brw">',
                        '<span class="svg-box">',
                            svgArr[index] || (index+1),
                        '</span>',
                        '<span class="newsTitle wqd-ff wqd-fs wqd-clr wqd-fw wqd-fst">',
                            (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                            news.title,
                        '</span>',
                        '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">',
                            '<i>',
                                '<svg viewBox="0 0 48 48"><path class="wqd-bgclr" d="M23.4,15.9c-4.2,0-7.7,3.6-7.7,8s3.5,8,7.7,8c1.2,0,2.3-0.3,3.3-0.8c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.8-0.7-1.3-0.5    c-0.8,0.4-1.6,0.6-2.5,0.6c-3.1,0-5.7-2.7-5.7-5.9s2.6-5.9,5.7-5.9c3.1,0,5.7,2.7,5.7,5.9c0,0.6-0.1,1.1-0.2,1.6    c-0.1,0.6,0.1,1.1,0.7,1.3c0.5,0.2,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.5,0.3-2.2C31.1,19.5,27.7,15.9,23.4,15.9z M19.8,22.4    c-0.2,0.5-0.3,1-0.3,1.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-0.4,0.1-0.7,0.2-1.1c0.4-1.2,1.5-1.9,2.7-1.9    c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5C21.8,19.8,20.4,20.9,19.8,22.4z M46.2,22.6C40.5,15.2,32.1,9.7,23.4,9.7    c-8.7,0-15.9,5.4-21.6,12.8c-0.1,0.2-0.2,0.4-0.2,0.6v1.3c0,0.2,0.1,0.5,0.2,0.6C7.5,32.6,14.7,38,23.4,38c8.7,0,17-5.4,22.8-12.9    c0.1-0.2,0.2-0.4,0.2-0.6v-1.3C46.4,23,46.4,22.8,46.2,22.6z M44.4,24.2c-5.4,6.8-13,11.8-21,11.8s-14.5-5-19.8-11.8v-0.6    C9,16.8,15.4,11.8,23.4,11.8c8,0,15.6,5,21,11.8C44.4,23.6,44.4,24.2,44.4,24.2z"></path></svg>',
                            '</i>'+(news.initialPageView+news.pageView)+' </span>',
                    '</li>',
                '</a>'
                ].join('');
            },
            sceneList2Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                var news = data.news;

                /**
                 * 获取标签字符串
                 * @param {[Array]} arr 传入标签数据数组
                 */
                function getTags (arr) {
                    var i = 0, str='';
                    for (;i<arr.length;i++) {
                        str += '<span data-tagid="'+arr[i].id+'" class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">'+arr[i].name+'</span>';
                    }
                    return str;
                }

                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<div class="list-cell">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                            (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                            news.title,
                        '</p>',
                        '<div class="imgGroup">',
                            '<div class="img-box wqd-h"><img src="' + (!!news.coverPicture.split(',')[0] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[0])?(news.coverPicture.split(',')[0]):(CSSURLPATH + news.coverPicture.split(',')[0])) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false;" onerror="this.setAttribute(\'src\',\''+sceneList._str+'images/news-demo/imgerror.png\');onerror = null;"/></div>',
                            '<div class="img-box wqd-h"><img src="' + (!!news.coverPicture.split(',')[1] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[1])?(news.coverPicture.split(',')[1]):(CSSURLPATH + news.coverPicture.split(',')[1])) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false;" onerror="this.setAttribute(\'src\',\''+sceneList._str+'images/news-demo/imgerror.png\');onerror = null;"/></div>',
                            '<div class="img-box wqd-h"><img src="' + (!!news.coverPicture.split(',')[2] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[2])?(news.coverPicture.split(',')[2]):(CSSURLPATH + news.coverPicture.split(',')[2])) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false;" onerror="this.setAttribute(\'src\',\''+sceneList._str+'images/news-demo/imgerror.png\');onerror = null;"/></div>',
                        '</div>',
                        '<div class="footer">',
                            '<div class="fl">',
                                '<span class="show-time wqd-clr wqd-bgclr wqd-fw wqd-fst">'+news.issueDate.split(' ')[0]+'</span>',
                                getTags(data.tags),
                            '</div>',
                            '<div class="fr">',
                                '<span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst"> <i class="icon-fav">',
                                    '<svg viewBox="0 0 48 48" >',
                                        '<path class="st0 wqd-bgclr" d="M36.4,19.2C36,19,35.5,19,34.9,19H31c0.5-2.3,0.6-5.6,0.6-7.6c0-2.3-1.9-4.2-4.2-4.2c-2.3,0-4.2,1.9-4.2,4.2    v0.8c0,4.6-3.7,8.3-8.2,8.4c-0.1,0-0.1,0-0.2,0h-4.2c-1.9,0-3.4,1.5-3.4,3.4v13.4c0,1.9,1.5,3.4,3.4,3.4h4.2    c0.4,0,0.8-0.4,0.8-0.9V22.2c5.2-0.4,9.3-4.7,9.3-10v-0.8c0-1.3,1.1-2.5,2.5-2.5c1.3,0,2.5,1.1,2.5,2.5c0,3.8-0.3,6.8-0.8,8.1    c-0.1,0.2,0,0.5,0.1,0.8c0.1,0.2,0.4,0.4,0.7,0.4h5c0.4,0,0.8,0,1.1,0.1c2.3,0.6,3.6,2.9,3,5.1c-0.7,2.5-4.1,11.2-4.4,12    c-0.5,0.8-1.2,1.2-2.2,1.2H19.8c-0.4,0-0.8,0.3-0.8,0.8c0,0.4,0.3,0.8,0.8,0.8h12.6c0,0,0.1,0,0.2,0c1.4,0,2.7-0.8,3.5-2.1    c0,0,0,0,0-0.1c0.1-0.4,3.8-9.6,4.5-12.2C41.4,23.3,39.6,20,36.4,19.2z M13.9,39h-3.4c-0.9,0-1.7-0.8-1.7-1.7V23.9    c0-0.9,0.8-1.7,1.7-1.7h3.4V39z"></path>',                                    '</svg>',
                                '</i>'+ (news.initialPraiseAmount+news.praiseAmount) +'</span>',
                                '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst"> <i class="icon-view">',
                                    '<svg viewBox="0 0 48 48"><path class="wqd-bgclr" d="M23.4,15.9c-4.2,0-7.7,3.6-7.7,8s3.5,8,7.7,8c1.2,0,2.3-0.3,3.3-0.8c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.8-0.7-1.3-0.5    c-0.8,0.4-1.6,0.6-2.5,0.6c-3.1,0-5.7-2.7-5.7-5.9s2.6-5.9,5.7-5.9c3.1,0,5.7,2.7,5.7,5.9c0,0.6-0.1,1.1-0.2,1.6    c-0.1,0.6,0.1,1.1,0.7,1.3c0.5,0.2,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.5,0.3-2.2C31.1,19.5,27.7,15.9,23.4,15.9z M19.8,22.4    c-0.2,0.5-0.3,1-0.3,1.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-0.4,0.1-0.7,0.2-1.1c0.4-1.2,1.5-1.9,2.7-1.9    c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5C21.8,19.8,20.4,20.9,19.8,22.4z M46.2,22.6C40.5,15.2,32.1,9.7,23.4,9.7    c-8.7,0-15.9,5.4-21.6,12.8c-0.1,0.2-0.2,0.4-0.2,0.6v1.3c0,0.2,0.1,0.5,0.2,0.6C7.5,32.6,14.7,38,23.4,38c8.7,0,17-5.4,22.8-12.9    c0.1-0.2,0.2-0.4,0.2-0.6v-1.3C46.4,23,46.4,22.8,46.2,22.6z M44.4,24.2c-5.4,6.8-13,11.8-21,11.8s-14.5-5-19.8-11.8v-0.6    C9,16.8,15.4,11.8,23.4,11.8c8,0,15.6,5,21,11.8C44.4,23.6,44.4,24.2,44.4,24.2z"></path>   </svg>',
                                '</i>'+ (news.initialPageView+news.pageView) +'</span>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                '</a>'
                ].join('');
            },
            sceneList3Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                var news = data.news;

                /**
                 * 获取标签字符串
                 * @param {[Array]} arr 传入标签数据数组
                 */
                function getTags (arr) {
                    var i = 0, str = '';
                    for (; i<arr.length; i++) {
                        str += '<span data-tagid="'+arr[i].id+'" class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">'+arr[i].name+'</span>';
                    }
                    return str;
                }

                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<div class="list-cell">',
                        '<div class="left-con wqd-w wqd-h"> <img src="' + (!!news.coverPicture.split(',')[0] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[0])?(news.coverPicture.split(',')[0]):(CSSURLPATH + news.coverPicture.split(',')[0])) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                                (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                                news.title,
                            '</p>',
                            '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">'+ news.digest +'</p>',
                            '<div class="infoBar">',
                                '<div class="tags">'+getTags(data.tags)+'</div>',
                                '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst">'+news.issueDate.split(' ')[0]+'</div>',
                                '<div class="info"> <span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">阅读:'+ (news.initialPageView+news.pageView) +'</span> <span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst">点赞:'+ (news.initialPraiseAmount+news.praiseAmount) +'</span> </div>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                '</a>'
                ].join('');
            },
            sceneList4Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                var news = data.news;

                /**
                 * 获取标签字符串
                 * @param {[Array]} arr 传入标签数据数组
                 */
                function getTags (arr) {
                    var i = 0, str = '';
                    for (; i<arr.length; i++) {
                        str += '<span data-tagid="'+arr[i].id+'" class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">'+arr[i].name+'</span>';
                    }
                    return str;
                }

                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<div class="list-cell">',
                        '<div class="left-con wqd-w wqd-h"> <img src="' + (!!news.coverPicture.split(',')[0] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[0])?(news.coverPicture.split(',')[0]):(CSSURLPATH + news.coverPicture.split(',')[0])) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                                (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                                news.title,
                            '</p>',
                            '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">'+ news.digest +'</p>',
                            '<div class="infoBar">',
                                '<div class="tags">'+getTags(data.tags)+'</div>',
                                '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst">'+news.issueDate.split(' ')[0]+'</div>',
                                '<div class="info"> <span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">阅读:'+ (news.initialPageView+news.pageView) +'</span> <span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst">点赞:'+ (news.initialPraiseAmount+news.praiseAmount) +'</span> </div>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                '</a>'
                ].join('');
            },
            sceneList5Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                /**
                 * 获取标签字符串
                 * @param {[number]} star 传入标签数据数组
                 */
                function getTags (star) {
                    var i = 0, str = '', star = star || 0;
                    for (; i<parseInt(star); i++) {
                        str += '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>';
                    }
                    return str;
                }
                return [
                '<a href="page_'+data.sceneId+'_'+pageId + '_' +data.id+'.html">',
                    '<div class="list-cell wqd-brs wqd-brc wqd-brw wqd-mgn-t">',
                        '<div class="left-con wqd-w wqd-h wqd-mgn-r"> <img src="' + (!!data.icon ? (CSSURLPATH + data.icon) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<div style="line-height:0;font-size:0;"><span style="display:-webkit-box;display:-moz-box;display:box;width:1px;height:1px;"></span></div>',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                                '<span style="visibility:hidden;">|</span>',
                                // (data.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                                data.name,
                            '</p>',
                            '<div class="tags">',
                                data.star != undefined && '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                                data.star != undefined && '<svg class="wqd-h" viewBox="0 0 500 476.6" xml:space="preserve"><path class="wqd-bgclr" fill="rgb(255, 177, 61)" d="M490.2,209.6c17.2-16.7,7.7-45.9-16-49.3l-122.1-17.7c-9.4-1.4-17.6-7.3-21.7-15.8L275.8,16.1c-10.6-21.5-41.3-21.5-51.9,0l-54.6,110.6c-4.2,8.6-12.4,14.4-21.7,15.8L25.5,160.2c-23.7,3.4-33.2,32.6-16,49.3l88.3,86c6.9,6.6,10,16.2,8.4,25.6L85.3,442.6c-4,23.7,20.7,41.6,42,30.5l109.1-57.4c8.5-4.5,18.5-4.5,26.9,0l109.1,57.4c21.3,11.2,46-6.9,42-30.5l-20.8-121.5c-1.6-9.4,1.5-19,8.4-25.6L490.2,209.6z"></path></svg>',
                                getTags(data.star),
                            '</div>',
                            '<div class="detail wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">'+data.age+'岁 | '+data.hometown+' | '+data.deals+'单</div>',
                            '<p class="money wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">￥'+data.price+' <em class="wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">/ '+data.workUnitStr+'</em></p>',
                        '</div>',
                    '</div>',
                '</a>'
                ].join('');
            },
            sceneList6Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];

                return [
                '<a href="page_'+data.sceneId+'_'+pageId + '_' +data.id+'.html">',
                    '<div class="list-cell wqd-brs wqd-brc wqd-brw wqd-mgn-t">',
                        '<div class="top-con wqd-h"> <img src="' + (!!data.icon ? (CSSURLPATH + data.icon) : sceneList._str+'images/news-demo/wqd_no_img.png') +'" ondragstart="return false; "> </div>',
                        '<div class="bottom-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                                '<span style="visibility:hidden;">|</span>',
                                // (data.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                                data.name,
                            '</p>',
                            '<p class="detail wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst "><span style="visibility:hidden;">|</span>'+ (data.certificate && data.certificate.split(',').join('、')) +'</p>',
                            '<hr class="line wqd-brc wqd-brw">',
                            '<div class="money wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">￥'+data.price+'/'+data.workUnitStr+'</div>',
                            '<div class="fav wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">已有'+ data.deals +'人预定</div>',
                        '</div>',
                    '</div>',
                '</a>'
                ].join('');
            }
        },
        /* lib库里 模板对应类名 后期可能不能随便更改 */
        arrArtStr: [
            ".sceneList1", 
            ".sceneList2", 
            ".sceneList3", 
            ".sceneList4", 
            ".sceneList5", 
            ".sceneList6"
        ].join(','),
        /* 对应 具体的内类名 后期也不能随便改 */
        arrArtContStr: [
            ".ListScene_1",
            ".ListScene_2",
            ".ListScene_3",
            ".ListScene_4",
            ".ListScene_5",
            ".ListScene_6"
        ].join(','),
        /* 是否添加 /pcdesign/ 前缀  host中 没有 DisplayModel 属性  */
        _str: window['DisplayModel'] ? '/pcdesign/' : '',
        /* 是phone 还是 pc host中使用 */
        _isPhone: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
        /* 是phone 还是 pc design 中使用 */
        _isDesignPhone: $('body').hasClass('pc') ? 'pc':'phone',
        /**
         * 获取对应 列表模板的名称
         * @param {[Object]} $obj 传入当前容器对象
         * return - str {[string]} 返回对应模板名称字符串
         */
        getListName: function ($obj) {
            if($obj.hasClass('sceneList1')) {
                return 'sceneList1';
            } else if($obj.hasClass('sceneList2')) {
                return 'sceneList2';
            } else if($obj.hasClass('sceneList3')) {
                return 'sceneList3';
            } else if($obj.hasClass('sceneList4')) {
                return 'sceneList4';
            } else if($obj.hasClass('sceneList5')) {
                return 'sceneList5';
            } else if($obj.hasClass('sceneList6')) {
                return 'sceneList6';
            }
        },
        /* 导航样式 */
        _renderNav: function ($obj, navHtml) {
            var self = this;
            if(Nav2.isNav2($obj)) {
                Nav2.renderNav2($obj, navHtml);
            } else {
                if($obj.hasClass('sceneList4')) {
                    Nav1.renderNav1($obj, navHtml);
                } else {
                    Nav1.renderNav($obj, navHtml);
                }
            }
        },
        /* 高级搜索样式 */
        _renderAdvSearch: function ($obj, data) {
            AdvSearch1.isAdvSearch1($obj) && AdvSearch1.renderAdvSearch1($obj, data);
            AdvSearch2.isAdvSearch2($obj) && AdvSearch2.renderAdvSearch2($obj, data);
        },
        /* 加载更多样式 */
        _renderLoadMore: function ($obj) {
            Pagination2.isPagination2($obj) && Pagination2.renderPagination($obj);
        },
        /**  
         * 设计器中 -- common
         * 设置文章控件模板样式 
         * 用途：通过对整体加 类名，控制某些元素是否显示
         */
        setDisplay: function ($obj) {
            var self = this, o = $obj.data(), _obj = $obj.find(self.arrArtContStr);
            for (var i in o) {
                switch(i) {
                    case 'setTitle': !o[i] ? _obj.addClass('no-title') : _obj.removeClass('no-title'); break;
                    case 'setContent': !o[i] ? _obj.addClass('no-content') : _obj.removeClass('no-content'); break;
                    case 'setImg': !o[i] ? _obj.addClass('no-img') : _obj.removeClass('no-img'); break;
                    case 'setBorder': !o[i] ? _obj.addClass('no-border') : _obj.removeClass('no-border'); break;
                    case 'setAllBorder': !o[i] ? _obj.addClass('no-all-border') : _obj.removeClass('no-all-border'); break;
                    case 'setNav': !o[i] ? _obj.addClass('no-nav') : _obj.removeClass('no-nav'); break;
                    case 'setHalvingLine': !o[i] ? _obj.addClass('no-line') : _obj.removeClass('no-line'); break;
                    case 'setContBG': !o[i] ? _obj.addClass('no-bg') : _obj.removeClass('no-bg'); break;
                    case 'setLoadMore': !o[i] ? _obj.addClass('no-loadmore') : _obj.removeClass('no-loadmore'); break;
                    case 'setLabel': !o[i] ? _obj.addClass('no-tag') : _obj.removeClass('no-tag'); break;
                    case 'setTime': !o[i] ? _obj.addClass('no-time') : _obj.removeClass('no-time'); break;
                    case 'setGoods': !o[i] ? _obj.addClass('no-goods') : _obj.removeClass('no-goods'); break;
                    case 'setViews': !o[i] ? _obj.addClass('no-view') : _obj.removeClass('no-view'); break;
                    case 'setMoney': !o[i] ? _obj.addClass('no-money') : _obj.removeClass('no-money'); break;
                    case 'setAdvSearch': !o[i] ? _obj.addClass('no-search') : _obj.removeClass('no-search'); break;
                    case 'setAdvSearchItemName': !o[i] ? _obj.addClass('no-searchItemName') : _obj.removeClass('no-searchItemName'); break;
                    case 'setAdvSearchItemLine': !o[i] ? _obj.addClass('no-searchItemLine') : _obj.removeClass('no-searchItemLine'); break;
                    case 'setAdvSearchBorder': !o[i] ? _obj.addClass('no-searchborder') : _obj.removeClass('no-searchborder'); break;
                    default: break;
                }
            }
        },
        /* 重置通栏高度 -- common */
        resizeHeight: function ($obj) {
            var self = this;
            sceneCommon.resizeImageShow($obj);
            if(sceneCommon.isSetSectionHeight($obj)) {
                $obj.css({ 'height': $obj.find(self.arrArtContStr).outerHeight()+'px' });
            }
        },
        /* 添加新通栏 -- common */
        addSection: function (_parent) {
            var self = this,
                secObj = $(self.addSectionStr),
                newId =  "wqd" + new Date().getTime() + "serial";
            /* 设置新 */
            secObj.find('.wqdSectiondiv').attr({
                id : newId,
                partid : newId,
                sectionname : '通栏场景',
                "data-colType" : 'sceneColList'
            });
            $(_parent).length ? $(_parent).parents('.yzmoveContent').after(secObj) : $('#HTMLDATACENTER').find('.wqdAreaView').append(secObj);
            var section = $('#'+newId);
            /* 滚动到当前位置 */
            if( $("body").hasClass("phone") ){
                var scrollTo = section.offset().top - $("#HTMLDATABOX").offset().top + $("#hdb-cont").scrollTop();
                $('#hdb-cont').animate({ scrollTop: scrollTo }, 250);
            }else{
                var scrollTo = section.offset().top - 50;
                $('body,html').animate({ scrollTop: scrollTo }, 250);
            }
            return section;
        },
        /* 绑定 文章相关发布事件 ---- 等待响应  设计器中 事件绑定 */
        bindTrigger: function () {
            var self = this;

            /* 绑定 添加文章通栏 过程,执行会在下面的事件之前 */
            $(document).on("drag:endSceneColList", function (e, _obj) {
                var section = self.addSection(_obj.parent);
                section.find('section').html(_obj.element);
                section.find('.wqdelementEdit').css({
                    "position": "relative",
                    "margin": "0 auto"
                });
                section.find('section').children().css({width:'100%'});
            });
            $(document).on("designer:setFinish", function (e, data) {
                self.resizeHeight(data._obj);
            });
            $(document).on("element:change", ".wqdelementEdit", function (e, data) {
                var _obj = $(e.target).closest('.wqdelementEdit[data-elementtype=sceneList]');
                if(_obj.length) {
                    /* 获取当前选中文章列表元素 */
                    self.resizeHeight(_obj);
                    /* 使用哪种导航渲染方式 */
                    self._renderNav(_obj, '');
                }
            });

            /* trigger 事件绑定 */
            $(document).on("sceneLists:reload", function () {
                $(".wqdelementEdit[data-elementtype=sceneList]").each(function (i, _) {
                    // 如果此模板为默认模板
                    if(!$(_).attr('artnavtype')) {
                        return true;
                    }
                    sceneList.loadScene($(_), sceneList.listStr[sceneList.getListName($(_))], $(_).attr('navids'));
                });
            })
            .on("sceneLists:load", self.arrArtStr, function (e) {
                var $that = $(this);
                var dfd = $.Deferred();
                /* 判断添加 详情页 */
                newArticleList.bindDefaultDetail($that, dfd);
                /* 加载并重新渲染导航、新闻 */
                self.loadScene($that, self.listStr[self.getListName($that)]);
            })
            /* PC设置导航 类型 */
            .on("setNavTypeScene:toPc", function (e, data) {
                var $that = $(data);
                /* 加载并重新渲染导航、新闻 */
                self.loadScene($that, self.listStr[self.getListName($that)], $that.attr('navids'));
                /* 调用保存 */
                $(document).trigger("cache:push");
            })
            .on("setSceneList:toPc", function (e, data, setType) {
                var $that = $(data);
                var oldType = $that.attr('data-conf'), type = $that.attr('artformat') || '';
                // 切换模板
                if(type) {
                    var oldNum = oldType.replace(/.*([\d])/gi, '$1');
                    var num = type.replace(/.*([\d])/gi, '$1');
                    $that.find('.ListScene_'+oldNum).length && $that.find('.ListScene_'+oldNum).removeClass('ListScene_'+oldNum).addClass('ListScene_'+num);
                    $that.attr('data-conf', '_newList_pc'+num);
                    $that.removeClass('sceneList'+oldNum).addClass('sceneList'+num);

                    if(num == 1) {
                        // 无数据的时候隐藏加载更多
                        $that.find('.comList .load-more').length && $that.find('.comList .load-more').remove();
                    }
                }
                // 如果是切换模板 重新打开设计器
                if(setType == "setFormat") {
                    // 关闭设计器弹框
                    $('#wqd-boxD').find('.hd-close').click();
                    // 重新打开设计器弹框
                    _Dopen.init(window.wqdDesign[type], $that.attr('id'));
                }
                // 判定是否需要加载默认模板
                if(!$that.attr('artnavtype') || !$that.attr('navids')) {
                    /* 加载并重新渲染导航、新闻 */
                    self.loadScene($that, self.listStr[self.getListName($that)], $that.attr('navids'));
                } else {
                    self.renderSceneList($that);
                }
                /* 调用保存 */
                $(document).trigger("cache:push");
            })
            /* 设置是否显示 */
            .on("isShowSetScene:toPC", function (e, data) {
                data.elem.data(data.val.val, data.val.isCheck)
                self.setDisplay(data.elem);
                /* 调用保存 */
                $(document).trigger("cache:push");
            })
            /* 设置加载方式 */
            .on("setSceneLoading:toPC", function (e, data, val) {
                $(data).find('.load-more').replaceWith(sceneListStr.listLoad[val]);
                self._renderLoadMore($(data));
                /* 调用保存 */ 
                $(document).trigger("cache:push");
            });
        },
        /**
         * 初始化加载    加载导航栏信息以及新闻列表   添加 列表页、分类、高级搜索
         * @param {[Object]} $obj 传入当前容器对象
         * @param {[string]} str 传入当前默认模板的字符串
         * @param {[string]} 传入选中id的字符串
         */
        loadScene: function ($obj, str, strings) {
            var self = this;
            // 假如没有传入strings   即没有选择任何栏目和分类  则显示默认字符串
            if(!strings) {
                // 新增添加 高级搜索功能
                $obj.find(self.arrArtContStr).html(str);
                // 替换对应的  加载更多样式   导航样式   高级搜索样式
                $obj.find('.comList .load-more').replaceWith(sceneListStr.getLoadMoreStyle($obj));
                $obj.find('.nav').replaceWith(sceneListStr.getNavStyle($obj));
                $obj.find('.advSearch-box').replaceWith(sceneListStr.getSearchStyle($obj));

                var $loadMore = $obj.find('.comList .load-more');
                // 获取存放列表的容器 newsList   以及 单元列表 list-cell;
                var $newList = $obj.find('.comList');
                var $newsListCell =  $newList.find('.list-cell');
                // 获取字符串
                var strHtml = $newsListCell[0].outerHTML;
                var size = (-(-$obj.attr('col'))|| 1) * (-(-$obj.attr('row'))|| 1);
                var i = 0, html = '';
                for(; i< size; i++) {
                    html += strHtml;
                }
                // 判定是否为有加载更多按钮 的模板
                if($loadMore.length) {
                    // 判断是否在执行加载更多 的事件， 并且在加载完成后使得 加载按钮更换颜色
                    $newsListCell.length && $newsListCell.remove()
                    $loadMore.before(html);
                } else {
                    $obj.find('.comList').html(html);
                }
                self.renderColumnNumStyle($obj);
                /* 重新计算高度 */
                // self.resizeHeight($obj);
                return;
            }

            var dfd = $.Deferred();

            var navBack = function (dfd) {
                var navHtml = '';
                sceneCommon.AJAX(sceneAJAX.navAJAX, function (data) { 
                    var arr = strings.split(',');
                    for(var i=0; i<arr.length; i++) {
                        for(var j=0; j<data.length; j++) {
                            if(arr[i] == data[j].value) {
                                navHtml += '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc ' + (i == 0 ? 'on':'') + '" data-categoryid="'+data[j].value+'">'+data[j].text+'</span>';
                                break;
                            }
                        }
                    }
                    /* 使用哪种导航渲染方式 */
                    self._renderNav($obj, navHtml); 
                    /* 重新计算高度 */
                    // self.resizeHeight($obj);
                    dfd.resolve(); 
                });
                return dfd.promise();  
            };
            var advSearchBack = function (dfd) {
                sceneCommon.AJAX(sceneAJAX.advSearchAJAX, function (data) {
                    self._renderAdvSearch($obj, data);
                    dfd.resolve();
                }); 
                return dfd.promise();
            };
            $.when(navBack(dfd), advSearchBack(dfd))
                .done(function (v1, v2) {
                    // 绑定事件
                    if(!sceneList._str) { 
                        sceneList.loadEvent1($obj);
                    } else {
                        sceneList.loadEvent($obj);
                    }
                    // 加载 对应列表数据
                    self.renderSceneList($obj);
                });
        },
        /**
         * 获取新闻列表
         * @param {[data]} data 传入新闻数据对象
         * @param {[Object]} flagStr 传入标志对应哪个文章控件的字符串
         * @param {[Number]} index 传入当前遍历的索引值 
         * @param {[Number]} pageId 传入当前详情页id 
         */
        getListHtml: function (data, flagStr, index, pageId) {
            var self = this;
            /* 加入没有数据（传入的data为空），则返回默认模板结构 和无数据文本 */
            if($.isEmptyObject(data)) { return self.listNullStr[flagStr]; }
            return self.listFun[flagStr+'Fun'].call(self, data, flagStr, index, pageId);
        },
        /** 
         * 调接口获取数据，渲染到列表中 
         * @param {[Object]} $obj 传入当前容器对象
         * @param {[Object]} data 传入所属要的数据对象
         * @param {[string]} data.categoryId 传入分类ID
         * @param {[string]} data.pageNo 传入页数
         * @param {[string]} data.pageSize 传入需要返回每一页的数据量
         * @param {[string]} data.userId 传入用户ID
         * @param {[string]} data.sortType 传入数据返回值排序类型
         */
        renderSceneList: function ($obj, data) {
            var self = this;
            // 获取数据对象，并未对象赋值或赋予默认值
            var json = {};
            /* 获取选中导航 */
            json.basicType = $obj.find('.nav span.on').attr('data-categoryid');
            /* 获取点击加载更多 */
            json.pageNo = parseInt($obj.attr('curPage') || 1);
            json.pageSize = (-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1);
            /* 获取高级搜索分类 */
            var arr = [], _i = 0;
            if($obj.attr('artsearch') == 'search1') {
                $obj.find('.advSearch-box .select-group .item').each(function (i, _) {
                    if($(_).find('span.tag.on').attr('data-code') == "-1") { return true; }
                    arr.push({code:'', ope: '', value: ''});
                    /* 进行分类判断 */
                    var type = '';
                    $(_).find('span.tag.on').each(function (j, _) {
                        type = $(_).data('type');
                        arr[_i].code = $(_).data('code');
                        if(type == 'Fixed') {
                            arr[_i].ope = '=';
                            arr[_i].value = $(_).data('val');
                        } else if(type == 'Multi') {
                            arr[_i].ope = 'like';
                            arr[_i].value += $(_).data('val') + ',';
                        } else if(type == 'Range') {
                            arr[_i].ope = $(_).data('val').split(',')[0];
                            arr[_i].value = $(_).data('val').split(',')[1];
                        }
                    });

                    if(type == 'Multi') arr[_i].value = arr[_i].value.replace(/,$/gi, '');
                    _i ++;
                });
            } else if($obj.attr('artsearch') == 'search2') {
                $('body').find('.advSearch-box1.self .sel-group-box .gr-box').each(function (i, _) {
                    if($(_).find('.b-bd .item.on').attr('data-code') == "-1") { return true; }
                    arr.push({code:'', ope: '', value: ''});
                    /* 进行分类判断 */
                    var type = '';
                    $(_).find('.b-bd .item.on').each(function (j, _) {
                        type = $(_).data('type');
                        arr[_i].code = $(_).data('code');
                        if(type == 'Fixed') {
                            arr[_i].ope = '=';
                            arr[_i].value = $(_).data('val');
                        } else if(type == 'Multi') {
                            arr[_i].ope = 'like';
                            arr[_i].value += $(_).data('val') + ',';
                        } else if(type == 'Range') {
                            arr[_i].ope = $(_).data('val').split(',')[0];
                            arr[_i].value = $(_).data('val').split(',')[1];
                        }
                    });

                    if(type == 'Multi') arr[_i].value = arr[_i].value.replace(/,$/gi, '');
                    _i ++;
                });
            }

            json.querys = arr.length?JSON.stringify({params:arr}):'';

            sceneAJAX.listAJAX.data = json;
            // 调用接口  获取数据
            var newsListHtml = '';
            sceneCommon.AJAX(sceneAJAX.listAJAX, function (data) {
                    var data = data.data;
                    /* 存储页数 */
                    Pagination2.pageData.totalCount = parseInt(data.totalCount);
                    Pagination2.pageData.curPage = parseInt(data.pageNo || 1);
                    $obj.attr('curPage', parseInt(data.pageNo || 1));


                    if(sceneCommon.isSetSectionHeight($obj)) { var sJSON = sceneCommon.getLastTopElem($obj); }
                    // 加载更多按钮对象
                    var $loadMore = $obj.find('.comList .load-more');
                    if(json.pageNo > data.totalPages) {
                        if($loadMore.length && $obj.attr('artload') == 'load1') {
                            $loadMore.find('p').css({ 'background':'#eee', 'color':'#000' }).text('没有更多了');
                        }
                        return;
                    }

                    if(data.data && data.data.length) {
                        $.each(data.data, function (i, val) {
                            newsListHtml += self.getListHtml(val, self.getListName($obj), i, $obj.attr('data-pageid'));
                        });
                        $loadMore.length && $loadMore.attr("style", '');
                    } else {
                        newsListHtml = self.getListHtml({}, self.getListName($obj));
                        // 无数据的时候隐藏加载更多
                        $loadMore.length && $loadMore.hide();
                    }

                    // 获取存放列表的容器 newsList   以及 单元列表 list-cell;
                    var $newList = $obj.find('.comList');
                    var $newsListCell =  $newList.find('.list-cell');
                    // 判定是否为有加载更多按钮 的模板
                    if($loadMore.length) {
                        // 判断是否在执行加载更多 的事件， 并且在加载完成后使得 加载按钮更换颜色
                        if(json.pageNo > 1 && $obj.attr('artload') != 'load2') {
                            $loadMore.before(newsListHtml);
                        } else {
                            $newsListCell.length && $newsListCell.parent('a').length && $newsListCell.parent('a').remove();
                            $newsListCell.length && $newsListCell.remove();
                            $loadMore.before(newsListHtml);
                        }
                        // 如果数据加载完成之后 判定是否仍有更多的数据   以此来修改加载更多 按钮的样式
                        if($obj.attr('artload') != 'load2') {
                            if(data.totalPages == $obj.attr('curPage')) {
                                $loadMore.find('p').css({ 'background':'#eee', 'color':'#000' }).text('没有更多了');
                            } else {
                                $loadMore.find('p').text('加载更多').removeAttr('style');
                            }
                        }
                    }
                    $newsListCell =  $newList.find('.list-cell');


                    // 根据列数动态调整样式  --- 必要
                    if(data.data && data.data.length) {
                        self.renderColumnNumStyle($obj);
                    }
                    /* 重新计算高度 */
                    self.resizeHeight($obj);
                    if(sceneCommon.isSetSectionHeight($obj)) { sceneCommon.setSectionHeight($obj, sJSON); }
                    /* 重新显示分页 */
                    Pagination2.isPagination2($obj) && Pagination2.renderPagination($obj);
                    $(document).trigger("cache:push");
                }
            );
        },
        /**
         * 绑定事件  设计器中 
         * @augments $obj 传入当前操作对象
         */
        loadEvent: function ($obj) {
            var self = this;
            sceneCommon.bindNavEvent($obj, function ($obj) {
                self.renderSceneList($obj);
            });
            sceneCommon.bindAdvSearchEvent($obj, function ($obj) {
                self.renderSceneList($obj);
            });
        },
        /**
         * 计算行列数，并控制样式展示 
         * @param {[Object]} $obj 传入当前容器对象
         */ 
        renderColumnNumStyle: function ($obj) {
            var $sceneListCell =  $obj.find('.comList .list-cell');
            var col = ($obj.attr('col') || 1);
            var width = ((99.5 - ($obj.attr('colnumval') || 0)/$obj.find('.comList').outerWidth()*100*(col-1))/col).toFixed(2);
            $sceneListCell.each(function (i, _) {
                if(i%col == 0) {
                    $(_).css({
                        'width': width + '%',
                        'display': 'inline-block',
                        'padding-right': '10px'
                    });
                } else {
                    $(_).css({
                        'width': width + '%',
                        'margin-left': (($obj.attr('colnumval') || 0)/$obj.find('.comList').outerWidth()*100).toFixed(2) + '%',
                        'display': 'inline-block',
                        'padding-right': '10px'
                    });
                }
            });
        },
        /* 需要优化 */
        /**
         * 绑定事件  host中  
         * @augments $obj 传入当前操作对象
         */
        loadEvent1: function ($obj) {
            var self = this;
            sceneCommon.bindNavEvent($obj, function ($obj) {
                self.renderSceneList($obj);
            });
            sceneCommon.bindLoadMoreEvent($obj, function ($obj) {
                self.renderSceneList($obj);
            });
            sceneCommon.bindAdvSearchEvent($obj, function ($obj) {
                self.renderSceneList($obj);
            });
        }
    }

    newArticleList.init();

    return newArticleList;
        
};

if(window['DisplayModel']) {
    define(['designerOpen', 'global'], function (_Dopen, _global) {
        return sceneList(_Dopen, _global);
    });
} else {
    sceneList();
}
