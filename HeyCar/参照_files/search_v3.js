function addListener(el,ev,fun){
 	if(el.attachEvent){
		el.attachEvent("on"+ev,fun);
	}else if(el.addEventListener){
		el.addEventListener(ev,fun,false);
	}
}
var KSSearchSuggest={
	inputEl:null,//输入框
	app:null,//页面
	serverUrl:'',//服务器地址,外部系统调用请用http://ks.pconline.com.cn
	useJs:false,
	floatFrame:null,//漂浮的层
	promptUl:null,//提示列表
	isShowing:false,//当前正在显示提示
	close:true,//当前是否应该显示
	userClose:false,//用户是否关闭了提示
	currentApp:null,//当前的app
	currentXHQ:null,//当前的xmlHttpRequest
	previousXHQ:null,//前一次请求
	currentValue:null,//当前的xmlHttpRequest对应的值
	currentIndex:-1,//当前获取到hover的那条提示
	
	iframeFrame:null,//iframe层
	
	play:function(){
		if(!this.userClose){
			this.close=false;
			var value=this.inputEl.value;
			if(/^(\s*$|请输入)/.test(value)){
				this.hide();
				return;
			}
			if(this.currentValue!=value||this.currentApp!=this.app){
				this.currentValue=value;
				this.currentApp=this.app;
				var f=this.useJs?this.sendJsRequest:this.sendAjaxRequest;
				f.call(this,value,this.app,this.check);
			}else{
				this.check();
			}
		}
	},
	
	stop:function(){
		this.close=true;
		this.hide();
	},
	
	slide:function(obj,time){
		if (time<10){ 
			var currentclip=(time/10*parseInt(obj.offsetHeight))+"px"
			obj.style.clip= "rect(0 auto "+currentclip+" 0)" ;
			setTimeout(function(){KSSearchSuggest.slide(obj,time+1)}, 10)
		}
		else{ 
			obj.style.clip="rect(0 auto auto 0)"
		}
	},
	
	setMenuPosition:function() {
		var obj=this.inputEl;
		var left_offset = obj.offsetLeft;
		var top_offset = obj.offsetTop;
		while((obj = obj.offsetParent) != null) {
			left_offset += obj.offsetLeft;
			top_offset += obj.offsetTop;
		}
		obj=this.floatFrame;
		while((obj = obj.offsetParent) != null) {
			left_offset -= obj.offsetLeft;
			top_offset -= obj.offsetTop;
		}
		this.floatFrame.style.left  = left_offset + 'px';
		this.floatFrame.style.top   = (top_offset + this.inputEl.offsetHeight) + 'px';
		//this.floatFrame.style.width = 450 + 'px';
		this.floatFrame.style.width = this.inputEl.offsetWidth + 'px';
	},
	
	check:function(){
		if(this.promptUl.childNodes.length!=0){
			this.show();
			this.iframeFrame.style.height   = (this.promptUl.offsetHeight) + 'px';
		}else{
			this.hide();
		}
	},
	
	show:function(){
		if((!this.userClose)&&(!this.close)&&!this.isShowing){
			this.isShowing=true;
			this.setMenuPosition();
			this.slide(this.floatFrame,0);
			this.floatFrame.style.display="block";
			this.floatFrame.style.visibility="visible";
		}
	},
	
	hide:function(){
		if(!this.isShowing) return;
		this.isShowing=false;
		this.floatFrame.style.display="none";
	},
	
	hover:function(index,select){
		var el;
		var nodeList = this.getByClassName('ajaxsearch-item',this.promptUl);
		if(typeof index == 'object'){
			el=index;
			for(var i=0;i<nodeList.length;i++){
				if(nodeList[i]==el){
					index=i;
					break;
				}
			}
		}else{
			if(index>-1&&index<nodeList.length){
		    el=nodeList[index];
		  }
		}
		if(index==this.currentIndex||!this.isShowing) return;
		if(el){
		   var el=nodeList[index];
		   if(select){
		   	if( this.getByClassName('resulttitle',nodeList[index])[0] ) this.inputEl.value= this.getByClassName('resulttitle',nodeList[index])[0].innerHTML;
		   	}
			 el.className +=" hover";
			 if(this.currentIndex!=-1){
			 	  try{
						var el=nodeList[this.currentIndex];
						// --edit
						// if(el) el.className="ajaxsearch-item";
						if(el) el.className = el.className.replace(' hover','')
					}catch(e){}
			 }
			 this.currentIndex=index;
		}
	},
	
	addInput2Listen:function(inputElement,app,serverUrl,useJs){
		if(typeof inputElement == 'object'){
			var inputEl =  inputElement;
		}else{
			var inputEl =  document.getElementById(inputElement);
		}
		this.init(inputEl,app);
		addListener(inputEl,"focus",function(){
			KSSearchSuggest.init(inputEl,app,serverUrl,useJs);
		});
	},
	
	init:function(inputElement,app,serverUrl,useJs){
		var self = this;
		this.app=app||'zh';
		// this.serverUrl=serverUrl||'';
		this.serverUrl=location.protocol+'//ks.pcauto.com.cn/'; // test
		this.useJs=!!useJs;
		
		if(!this.floatFrame){
			var floatFrame=this.floatFrame = document.createElement("DIV");
			floatFrame.className = "ajaxsearch";
			floatFrame.style.display="none";
			floatFrame.style.position="absolute";
			//floatFrame.style.border ="1px solid red";
		  document.body.insertBefore(floatFrame,document.body.firstChild);
		  
		  var promptUl=this.promptUl = document.createElement("UL");
		  floatFrame.appendChild(promptUl);
		  
		  var closeDiv = document.createElement("DIV");
		  closeDiv.className="close";
		  floatFrame.appendChild(closeDiv);
		  var closeSpan = document.createElement("span");
		  closeSpan.innerHTML="关闭";
		  closeDiv.appendChild(closeSpan);
		  closeSpan.onclick=function(){KSSearchSuggest.hide();};//KSSearchSuggest.userClose=true;KSSearchSuggest.stop();return false;};
		  
		  var iframeFrame = this.iframeFrame = document.createElement("IFRAME");
		  iframeFrame.setAttribute('width', '265');
		  iframeFrame.setAttribute('frameborder', '0', 0);
		  iframeFrame.setAttribute('scrolling', 'no');
		  iframeFrame.style.cssText='position:absolute;top:0;left:0;z-index:-1;';
		  iframeFrame.src="";
		  floatFrame.appendChild(iframeFrame);
		  
		  floatFrame.onclick = function(event) {
					var event = event || window.event;
					if (event.stopPropagation) {
						event.stopPropagation();
					} else {
						event.cancelBubble = true;
					}
				}

		  //var frame0 = document.createElement("frame");
		  //frame0.frameBorder = "0";
		  //floatFrame.appendChild(frame0);
		}
	  
	  if(typeof inputElement == 'object'){
			var inputEl =  inputElement;
		}else{
			var inputEl =  document.getElementById(inputElement);
		}
		if(inputEl!=this.inputEl){
			this.inputEl=inputEl;
			inputEl.onclick = function(event) {

				self.inputEl = this;

				if (KSSearchSuggest.inputEl != this) return true;
				KSSearchSuggest.play();

				var event = event || window.event;
				if (event.stopPropagation) {
					event.stopPropagation();
				} else {
					event.cancelBubble = true;
				}

			};
		  inputEl.onkeyup=function(e){
		  	if(KSSearchSuggest.inputEl!=this)
		  	  return true;
		  	var key = window.event ? window.event.keyCode : e.which; 
		  	if(key == 13) {// enter
		  		KSSearchSuggest.stop();
		  		return true;
		  	}else if(key == 38) {// ↑
		  		KSSearchSuggest.hover(KSSearchSuggest.currentIndex-1,true);
		  	}else if(key == 40) { // ↓
		  		KSSearchSuggest.hover(KSSearchSuggest.currentIndex+1,true);
		  	}else if(key == 27) { // Esc
		  		KSSearchSuggest.userClose=true;
		  		KSSearchSuggest.stop();
		  	}else{
			  	KSSearchSuggest.play();
			  }
		  	return false;
		  };
		  inputEl.onblur=function(){
			  if(typeof(onblurAction)!="undefined"){
				  onblurAction();
				  }
			
		  	if(KSSearchSuggest.inputEl!=this)
		  	  return true;
		  	//setTimeout(function(){KSSearchSuggest.stop()}, 200);
		  	return false;
		  };
		  addListener(document.body, "click", function() {
					KSSearchSuggest.stop();
				});

		  addListener(window,"scroll",function(){
					self.hide();
				});

				addListener(window,"resize",function(){
					self.hide();
				});

		}
	},
	cancelRequest:function(){
		this.previousXHQ.abort();
	},
	sendAjaxRequest:function(value, app, callback) {
		this.previousXHQ = this.currentXHQ;
		if(this.previousXHQ){
			this.previousXHQ.onreadystatechange=function(){};
			setTimeout("KSSearchSuggest.cancelRequest()",0);//后台处理
		}
		var url=encodeURI( encodeURI(	this.serverUrl+"searchSuggest2.shtml?q="+value+"&app="+(app||"zh") ) );//test
		var xmlHttpRequest;
		if (window.ActiveXObject) {
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xmlHttpRequest = new XMLHttpRequest();
		} else {
			return;
		}
		this.currentXHQ=xmlHttpRequest;
		xmlHttpRequest.open("GET", url, true);
		var f=function(){
			if (xmlHttpRequest.readyState == 4) {
				if (xmlHttpRequest.status == 200) {
					var responseText = xmlHttpRequest.responseText;
					responseText = eval("("+responseText+")");
					KSSearchSuggest.requestCallback(responseText,callback);
				}
			}
		};
		var isFirefox=navigator&&navigator.userAgent&&navigator.userAgent.indexOf("Firefox")>0;
		//if(!isFirefox){
		xmlHttpRequest.onreadystatechange =f;
		//}
		xmlHttpRequest.send(null);
		//if(isFirefox){  //firefox
        //f();
		//}
	},
	
	sendJsRequest:function(value, app, callback) {	
		// var uri=encodeURI( encodeURI(	this.serverUrl+"searchSuggest2.jsp?q="+value+"&app="+(app||"zh")+"&jsCallBack=KSSearchSuggestJsCallBack" ) );
		var uri=encodeURI( encodeURI(	this.serverUrl+"searchSuggest2.shtml?q="+value+"&app="+(app||"zh")+"&jsCallBack=KSSearchSuggestJsCallBack" ) );//test
		var scriptElement=document.createElement('script');
	  document.body.insertBefore(scriptElement,document.body.firstChild);
	  window.KSSearchSuggestJsCallBack=function(app,v,data){
	  	if(KSSearchSuggest.currentApp==app&&KSSearchSuggest.currentValue==v){
	  		KSSearchSuggest.requestCallback(data,callback);
	  	}
	  }
    setTimeout(function(){
    	scriptElement.src=uri;
    }, 1);
	},
	
	// 20140811 添加参数ks, 判断数据类型跳转页面
	go2Search:function(kw,or,ks){
		// or: true跳到快搜 false跳到报价
		this.inputEl.value=kw;
		var f=this.inputEl;
		// 20140811 快搜首页跳转到快问 strat
		if(f.parentNode.parentNode.getAttribute('action') == '//k.pcauto.com.cn/sr/' && ks == 'ks'){
			setTimeout(function(){
				document.location.href = "//k.pcauto.com.cn/sr/" + kw;
			}, 0)
		}
		//快搜首页跳转到快问 end
		if(or){
			while(f){
				if(f.tagName == 'FORM'){
					//处理报价库页面action绑定
					if(f.getAttribute('action').indexOf('//ks.pcauto.com.cn/auto_composite.jsp') != -1){
						f.setAttribute('action', '//ks.pcauto.com.cn/');
					}
					f.submit();
				}
				f = f.parentNode;
			}
		}
		KSSearchSuggest.stop();
		
	},
	
  requestCallback:function(responseText,callback) {
			try {
				var resultLen = responseText.length;				
				if(resultLen <= 0){
					this.promptUl.innerHTML="";
				}else{						
					var html = "";	
					var oSer = true;		
					for(var i = 0; i < resultLen; i++){
						var thisData = responseText[i];
						var liId = i;
						liId = liId > 0 ? 1 : 0;									
						if(thisData.isSerialGroup){	
							var state = parseInt(thisData.state);	
							if(oSer){
								// -- edit
								html += "<li style='text-align:left;font-size: 14px;color: #777;'><i class='ajaxsearch-ico'></i>点击直达车系频道</li>";
								oSer = false;
							}
							// -- edit
							html += "<li data-type='price' class='ajaxsearch-item ajaxsearch-item_price' id='ac_li_"+liId+"' onmousemove='KSSearchSuggest.hover(this)' onclick='KSSearchSuggest.go2Search(this.firstChild.firstChild.innerHTML,false)'><a style='display:block;color:#777;text-decoration:none' target='_blank' href='//price.pcauto.com.cn/sg"+thisData.sid+"/#ad=4551'><i id='ac_item_4' class='resulttitle'>"+thisData.keyword+"</i>";						
							if(state == 3){//在售
								if(thisData.price != "" && thisData.price != "暂无报价"){
									html += "<em class='resultPri'>"+thisData.price+"</em></a></li>";
								}else{									
									html += "<em class='resultNoPri'>"+thisData.price+"</em></a></li>";
								}	
							}else{
								html += "<em class='resultNoPri'>"+thisData.price+"</em></a></li>";	
							}
						}else{
							html += "<li data-type='ks' class='ajaxsearch-item' id='ac_li_"+liId+"' onmousemove='KSSearchSuggest.hover(this)' onclick='KSSearchSuggest.go2Search(this.firstChild.innerHTML,true,this.getAttribute(\"data-type\"))'><i id='ac_item_4' class='resulttitle'>"+thisData.keyword+"</i></li>";
						}							
					}
					this.promptUl.innerHTML = html;
				}
				if(callback) callback.call(this);
				this.currentIndex=-1;
			} catch(exception) {}
	},
	getByClassName:function(className,parent){
		var elem = [],
			node = parent != undefined&&parent.nodeType==1?parent.getElementsByTagName('*'):document.getElementsByTagName('*'),
			p = new RegExp("(^|\\s)"+className+"(\\s|$)");
		for(var n=0,i=node.length;n<i;n++){
			if(p.test(node[n].className)){
				elem.push(node[n]);
			}
		}
		return elem;
	}
}