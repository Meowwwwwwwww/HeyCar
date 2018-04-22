var sceneDetail = function(_Dopen, _global) {
    var Detail = {
	    /* 是否添加 /pcdesign/ 前缀 */
	    _str: window['DisplayModel'] ? '/pcdesign/' : '',
	    isDetailScene1: function () { // 只支持PC
            return $('body').find('.sceneDetail1').length;
        },
        isDetailScene2: function () { // 只支持手机
            return $('body').find('.sceneDetail2').length;
        },
    	/* 初始化数据 */
    	init: function () {
    		var self = this;
    		if(self._str) {
                self.bindTrigger();   
            }

            if(self.isDetailScene1()) {
	            /* host中 首先重置  module1中头像 */
	            self.reSetImgHeight($('.module1.only-module1-border'));
	            self.bindDetail1Event(); 
            }
            if(self.isDetailScene2()) {
            	// 初始化页面中图片显示
            	self.reSetImgHeight($('.DetailScene_2 .personal-intro'));
            	self.reSetImgHeight($('.DetailScene_2 .modular-media.modular-album'));
            	if(!self._str) {
            		// 预约悬浮
					var _obj = $('.wqdelementEdit[data-elementtype="sceneDetail"]');
					var id = _obj.attr('id');
					var str = _obj.find('.modular-order')[0].outerHTML;
					_obj.find('.modular-order').remove();
					$('body').append([
						'<div class="detailScene_yuyue" id="'+id+'">',
							str,
						'</div>'
					].join(''));

            		self.bindDetail2Event();
            	}
            }
    	},
    	/* 绑定设计器中的监听事件 */
    	bindTrigger: function () {
    		var self = this;
    		$(document).on('isShowSetSceneDetail:toPC', function (e, data) {
	            self.setDisplay(data);
	            /* 调用保存 */
	            $(document).trigger("cache:push");
	        }); 
            /* 切换页面时，重新刷新页面中的内容 */
            $(document).on("sceneDetail:reload", function() {
            	if(self.isDetailScene1()) {
	            	self.bindDetail1Event(); 
	            }
	            if(self.isDetailScene2()) {
	            	// 初始化页面中图片显示
	            	self.reSetImgHeight($('.DetailScene_2 .personal-intro'));
	            	self.reSetImgHeight($('.DetailScene_2 .modular-media.modular-album'));
	            }
            });
            /* 设计器 设置完成时 刷新页面 */
            $(document).on("designer:setFinish", function (e, data) {
	            self.reSetImgHeight(data._obj);
	        });
    	}, 
    	/**
	     * 设置文章控件模板样式 
	     * 用途：通过对整体加 类名，控制某些元素是否显示
	     */
	    setDisplay: function (data) {
	        var _obj = data.elem.children();
            switch(data.val.val) {
                case 'setImage': !data.val.isCheck ? _obj.addClass('no-img') : _obj.removeClass('no-img'); break;
                case 'setTitle': !data.val.isCheck ? _obj.addClass('no-title') : _obj.removeClass('no-title'); break;
                case 'setStar': !data.val.isCheck ? _obj.addClass('no-star') : _obj.removeClass('no-star'); break;
                case 'setInfo1': !data.val.isCheck ? _obj.addClass('no-info1') : _obj.removeClass('no-info1'); break;
                case 'setInfo2': !data.val.isCheck ? _obj.addClass('no-info2') : _obj.removeClass('no-info2'); break;
                case 'setAmount': !data.val.isCheck ? _obj.addClass('no-amount') : _obj.removeClass('no-amount'); break; 
                case 'setPrice': !data.val.isCheck ? _obj.addClass('no-price') : _obj.removeClass('no-price'); break;
                case 'setPhone': !data.val.isCheck ? _obj.addClass('no-phone') : _obj.removeClass('no-phone'); break;	                
                case 'setTabSwitch': !data.val.isCheck ? _obj.addClass('no-tab') : _obj.removeClass('no-tab'); break;	                
                case 'setSubTitle': !data.val.isCheck ? _obj.addClass('no-subtit') : _obj.removeClass('no-subtit'); break;	                
                default: break;
            }
	    },
	    bindDetail1Event: function () {
	    	var self = this;
	    	$.each($('.wqdelementEdit[data-elementtype="sceneDetail"]'), function (i, _) {
				$(_).off('click.tab').on('click.tab', '.DetailScene_1 .tab .item-tab', function () {
					$(this).addClass('on').siblings().removeClass('on');
					$(this).parent().next('.tab-contain').children().eq($(this).index()).show().siblings().hide();
					self.reSetImgHeight($(this).parent().next('.tab-contain').children().eq($(this).index()));
				});                
            });

			/* 点击放大图功能 */
			$('body').off('click.imgBigShow').on('click.imgBigShow', '.item-img.img-box', function () {
				var that = $(this);
				if(!$('#scene-imgBigShow-JS').length) {
					self.loadCSS((self._str?self._str:window['PC_CTX'])+'components/elements/scene/detailLibs/fancybox/fancybox.css', 'scene-imgBigShow-CSS', function () {
						self.loadScript((self._str?self._str:window['PC_CTX'])+'components/elements/scene/detailLibs/fancybox/fancybox.js', 'scene-imgBigShow-JS', function () {
							$('.fancybox-img1').fancybox({ openEffect: 'elastic', closeEffect: 'elastic', helpers: { title: { type: 'outside' }, thumbs: { width: 50, height: 50 } } });
							$('.fancybox-img2').fancybox({ openEffect: 'elastic', closeEffect: 'elastic', helpers: { title: { type: 'outside' }, thumbs: { width: 50, height: 50 } } });
							
							that.find('a').click();
						});
					});
				} 
			});
			/* 点击视频播放功能 */
			$('body').off('click.videoShow').on('click.videoShow', '.item-img.item-video', function () {
				var that = $(this);
				if(!$('#scene-VideoShow-JS').length) {
					self.loadCSS((self._str?self._str:window['PC_CTX'])+'components/elements/scene/detailLibs/VideoJS/css/video-js.css', 'scene-VideoShow-CSS', function () {
						var strHtml = [
							'<div class="fix-box" id="VideoShow">',
								'<div class="black-fu"></div>',
								'<div class="fix-center">',
									'<div class="hd-svg hd-close"><svg width="32" height="32" viewBox="0 0 25 25"><path fill="#fff" d="M11.793 12.5L8.146 8.854 7.793 8.5l.707-.707.354.353 3.646 3.647 3.646-3.647.354-.353.707.707-.353.354-3.647 3.646 3.647 3.646.353.354-.707.707-.354-.353-3.646-3.647-3.646 3.647-.354.353-.707-.707.353-.354 3.647-3.646z"></path></svg></div>',
									'<video id="my-video" class="video-js" controls preload="auto" width="740" height="400" poster="'+that.find('img').attr('src')+'" data-setup="{}">',
										'<source src="'+that.find('img').attr('src').replace(/\.jpg/gi, '.mp4')+'" type="video/mp4">',
									'</video>',
								'</div>',
							'</div>'
						].join('');
						$('body').append(strHtml);
						self.loadScript((self._str?self._str:window['PC_CTX'])+'components/elements/scene/detailLibs/VideoJS/js/video.min.js', 'scene-VideoShow-JS', function () {
							var myPlayer = videojs('my-video');
							videojs("my-video").ready(function () {
								var myPlayer = this;
								myPlayer.play();
							});
							$('#VideoShow').on('click', '.hd-svg.hd-close', function () {
								myPlayer.pause();
								$('#VideoShow').off('click').hide();
							});
						});
					});
				} else {
					var myPlayer = videojs('my-video');
					myPlayer.src(that.find('img').attr('src').replace(/\.jpg/gi, '.mp4'));
					videojs("my-video").ready(function () {
						$('#VideoShow').show();
						var myPlayer = this;
						myPlayer.play();
					});
					$('#VideoShow').on('click', '.hd-svg.hd-close', function () {
						myPlayer.pause();
						$('#VideoShow').off('click').hide();

					});
				}
			});
	    },
	    bindDetail2Event: function () {
	    	var self = this;

			// 地图调用
			$('body').off('click.mapShow').on('click.mapShow', '.modular.modular-address', function (e) {
				var that = $(this);
				if(!$('#scene-mapShow-JS').length) {
					$('body').append([
						'<div class="map-show" style="display:none;position:fixed;z-index:999;left:0;top:0;right:0;bottom:0;">',
							'<div class="map-close" style="position:absolute;z-index:1;background:rgba(0,0,0,0.2);width:25px;height:25px;left:10px;top:10px;border-radius:50%;cursor:pointer;"><svg width="25" height="25" viewBox="0 0 25 25"><path fill="#fff" d="M11.793 12.5L8.146 8.854 7.793 8.5l.707-.707.354.353 3.646 3.647 3.646-3.647.354-.353.707.707-.353.354-3.647 3.646 3.647 3.646.353.354-.707.707-.354-.353-3.646-3.647-3.646 3.647-.354.353-.707-.707.353-.354 3.647-3.646z"></path></svg></div>',
							'<div class="map-show-content" wqdMapKeywordos="'+that.find('.modular-right').text()+'" style="position:absolute;width:100%;height:100%;"></div>',
						'</div>'
					].join(''));
					self.loadScript((self._str?self._str:window['PC_CTX'])+'components/elements/scene/detailLibs/baiduMap/map.js', 'scene-mapShow-JS', function () {
						$.wqdMapInit.createBDlink();
					});
					$('body').off('click.map-close').on('click.map-close', '.map-show .map-close', function (e) {
						$('.map-show').hide();
					});
				} else {
					$('.map-show .map-show-content').attr('wqdMapKeywordos', that.find('.modular-right').text());
					$.wqdMapInit.createBDlink();
				}
			});
	    	// 视频播放
			$('body').off('click.videoShow').on('click.videoShow', '.modular-media.modular-album', function (e) {
				var that = $(this);
				if(that.find('svg').length) {
					if(!$('.player_scene_all').length) {
						$('body').append([
						'<div class="player_scene_all" style="display:none;position:fixed;z-index:999;left:0;top:0;right:0;bottom:0;background:#000;">',
							'<div class="video-close" style="position:absolute;z-index:1;background:rgba(0,0,0,0.2);width:25px;height:25px;left:10px;top:10px;border-radius:50%;cursor:pointer;"><svg width="25" height="25" viewBox="0 0 25 25"><path fill="#fff" d="M11.793 12.5L8.146 8.854 7.793 8.5l.707-.707.354.353 3.646 3.647 3.646-3.647.354-.353.707.707-.353.354-3.647 3.646 3.647 3.646.353.354-.707.707-.354-.353-3.646-3.647-3.646 3.647-.354.353-.707-.707.353-.354 3.647-3.646z"></path></svg></div>',
							'<video id="player_scene" style="position:absolute;width:100%;height:100%;" src="'+that.find('img').attr('src').replace(/.jpg$/gi, '.mp4')+'" preload="auto" controls="controls" autoplay="autoplay" webkit-playsinline="true" playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>',
						'</div>'
						].join(''));
						
						$('#player_scene')[0].play();
						$('.player_scene_all').show();

						$('.player_scene_all').on('click', '.video-close', function () {
							$('#player_scene')[0].pause();
							$('.player_scene_all').hide();
						});
					} else {
						$('.player_scene_all').show();
						$('#player_scene')[0].src = that.find('img').attr('src').replace(/.jpg$/gi, '.mp4');
						$('#player_scene')[0].play();
					}
				}
			});
	    	// 图片放大
			$('body').off('click.imgBigShow').on('click.imgBigShow', '.modular-media.modular-album', function (e) {
				var that = $(this);
				if(!that.find('svg').length) {
					self.loadScript((self._str?self._str:window['PC_CTX'])+'components/elements/scene/detailLibs/previewImage-mobile/jsDist/previewImage.min.js', 'scene-imgBigShow-JS', function () {
						var data = [], cur = $(that).find('img').eq(0).attr('src');
						$(that).find('img').each(function (i, _) {
							data.push($(_).attr('src'));
							if($(e.target).attr('src') == $(_).attr('src')) {
								cur = $(_).attr('src');
							}
						});
						
						previewImage.start({
							urls: data,
							current: cur
						});
					});
				} 
			});
	    },
	    /* 重置图片大小 -- common */
	    reSetImgHeight: function ($obj) {
	        var self = this;
	        // 重置当前对象样式
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
	    /** 加载js文件
		 * @param {[string]} src [填写名称字符串] 
		 * @param {[string]} id [填写字符串对应id名称] 
		 * @param {[function]} callback [成功后的回调函数]
		 */
		loadScript: function (src, id, callback) {
			var body = document.body || document.getElementsByTagName("body")[0] || document.documentElement,
				script = null, _self = this, url = '';
			url = /^http[s\:\/\/|\:\/\/]/gi.test(src) ? src : src;
			url = url + (/\?/gi.test(url) ? "&" : "?") + "_=" + (new Date()).getTime();
			script = document.createElement("script");
			script.id = id;
			script.async = false;
			script.type = "text/javascript";
			script.charset = "utf-8";
			script.src = url;
			body.appendChild(script);
			if(callback) {
				document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
					if(/loaded|complete/.test(script.readyState)) {
						script.onreadystatechange = null;
						callback();
					}
				}
			}
		},
		/** 加载css文件
		 * @param {[string]} src [填写名称字符串] 
		 * @param {[string]} id [填写字符串对应id名称] 
		 * @param {[function]} callback [成功后的回调函数]
		 */
		loadCSS: function (src, id, callback) {
			var head = document.head || document.getElementsByTagName("head")[0], 
			style = null, _self = this, url = '';
			url = /^http[s\:\/\/|\:\/\/]/gi.test(src) ? src : src;
			url = url + (/\?/gi.test(url) ? "&" : "?") + "_=" + (new Date()).getTime();
			style = document.createElement("link");
			style.id = id;
			style.rel = "stylesheet";
        	style.type = "text/css";
        	style.href = url;
        	head.appendChild(style);
        	if(callback) {
        		callback();	
        	}
		}
    }

    Detail.init();

    return Detail;
};

if(window['DisplayModel']) {
    define(['designerOpen', 'global'], function (_Dopen, _global) {
        return sceneDetail(_Dopen, _global);
    });
} else {
    sceneDetail();
}