/**
##����˵��
#new cityPop(object,function);
#object Ϊ�����Ӧ��ID�б�
#function Ϊ�ص����� , �����������лص����� , ��ִ�лص�
**/

function cityPop(){
	this.init.apply(this,arguments);	
}
cityPop.prototype = {
	addClass: function(o, cn) {
		var re = new RegExp("(\\s*|^)" + cn + "\\b", "g");
		o.className += o.className ? (re.test(o.className) ? "" : " " + cn) : cn;
	},
	removeClass: function(o, cn) {
		var re = new RegExp("(\\s*|^)" + cn + "\\b", "g");
		var sName = o.className;
		o.className = sName.replace(re, "");
	},
	getClass:function(oParent,sClass) {
		var aEle=oParent.getElementsByTagName('*');
			aResult=[];		 
		 for(var i=0;i<aEle.length;i++){
			 if(aEle[i].className==sClass){
			  aResult.push(aEle[i]);
			 }
		 }
		 return aResult;
	},
	getById:function(id){
		return (typeof (id) == 'object') ? id : document.getElementById(id);
	},
	inArray:function(needle,array,bool){    
	    if(typeof needle=="string"||typeof needle=="number"){    
	        var len=array.length;    
	        for(var i=0;i<len;i++){    
	            if(needle===array[i]){    
	                if(bool){    
	                    return i;    
	                }    
	                return true;    
	            }    
	        }    
	        return false;    
	    }    
	},	
	isContains:function (p,c){
		if(p.contains){
			return p.contains(c);
		}else{
			return (p.compareDocumentPosition(c) === 16);
		}
	},
	stopPropagation:function(evt){
		evt = evt || window.event;	
		evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
	},
	init:function(config,fc){		
		var config = config || {},
			_this = this;
		_this.objId = {	
			"btnTrigger" : config.openBtn,//�򿪵���ťID	
			"cityBox" : config.cityBox,//����ID
			"searchInp" : config.searchInp,//������ID
			"searchResult" : config.searchResult,//���������ID
			"hotsCity" : config.hotsCity,//���ų���ID
			"tipNo" : config.tipNo,//�޽����ʾID
			"tipGo" : config.tipGo,//ֱ����ʾID
			"resultList" : config.resultList,//���������ID
			"closeBtn" : config.closeBtn,//�رհ�ťID
			"letArea" : config.letArea,//��ĸ�б�ID
			"cityArea" : config.cityArea//�����б�ID	
		};

		_this.html();

		_this.btnTrigger = _this.getById(config.openBtn);//�򿪵���ť
		_this.cityBox = _this.getById(config.cityBox);//����
		_this.searchInp = _this.getById(config.searchInp);//������
		_this.searchResult =  _this.getById(config.searchResult);//���������
		_this.hotsCity = _this.getById(config.hotsCity);//���ų���
		_this.tipNo =  _this.getById(config.tipNo);//�޽����ʾ
		_this.tipGo =  _this.getById(config.tipGo);//ֱ����ʾ
		_this.resultList =  _this.getById(config.resultList);//��������б��
		_this.closeBtn = _this.getById(config.closeBtn);//�رհ�ť
		_this.letArea = _this.getById(config.letArea);//��ĸ�б�		
		_this.cityArea = _this.getById(config.cityArea);//�����б�

		_this.search();//����
		_this.anchor();	//ê��
		_this.on(_this.btnTrigger,"click",function(e){//�������
			if(_this.cityBox.style.display == "none" || _this.cityBox.style.display == ""){
				_this.show();				
			}else{
				_this.hide();				
			}
			_this.stopPropagation(e);		
		});
		_this.on(_this.cityBox,"click",function(e){//��ֹð��			
			if(typeof(fc) === 'function'){
	        	var callback = fc;
	        	callback(e);
	        }
	        _this.eventFunction(e, _this.cityBox);	
			_this.stopPropagation(e);
		});	
		_this.on(document, "click", function(e) {//���ҳ�浯��ر�
           _this.hide(); 
        });	        
	},
	on:function(ele, type, fn) {
		if(document.addEventListener) {
			ele.addEventListener(type, fn, false);
		} else {
			ele.attachEvent('on'+type, fn);
		}
	},
	show:function(){
		var _this = this;
		_this.cityBox.style.display = "block";
		_this.addClass(_this.btnTrigger,'active');
	},
	hide:function(){
		var _this = this;
		_this.cityBox.style.display = "none";
		_this.removeClass(_this.btnTrigger,'active');
	},
	html:function(){
		var _this = this,
			letterTemp = [],
			proTemp = [],		
			layerHtml = "",
			zxCityHtml = "",
			firstCharHtml = "",
			cityLetHtml = '',
			hotCityHtml = '<span>���ų��У�</span><a target="_blank" href="javascript:void(0)" data-code="440100" data-mid="1">����</a><a target="_blank" href="javascript:void(0)" data-code="110000" data-mid="2">����</a><a target="_blank" href="javascript:void(0)" data-code="440300" data-mid="4">����</a><a target="_blank" href="javascript:void(0)" data-code="420100" data-mid="76">�人</a><a target="_blank" href="javascript:void(0)" data-code="510100" data-mid="87">�ɶ�</a><a target="_blank" href="javascript:void(0)" data-code="310000" data-mid="3">�Ϻ�</a><a target="_blank" href="javascript:void(0)" data-code="120000" data-mid="257">���</a><a target="_blank" href="javascript:void(0)" data-code="330100" data-mid="217">����</a><a target="_blank" href="javascript:void(0)" data-code="370200" data-mid="317">�ൺ</a><a target="_blank" href="javascript:void(0)" data-code="500000" data-mid="77">����</a>';
		for(var i = 0; i < areaData.length; i++){
			var proRecord = areaData[i],
				proFirstLetter = proRecord.proFirstLetter,
				province = proRecord.pro,
				citys = proRecord.citys,
				citysLen = citys.length;
				//zxFlag = proRecord.citys[0].zx,
				repeatLet = _this.inArray(proFirstLetter,letterTemp),
				repeatPro = _this.inArray(province,proTemp);
				letterTemp.push(proFirstLetter);
				proTemp.push(province);

			 for(var j = 0; j < citysLen; j++){
			 	var curCity = citys[j],
			 		cityName = curCity.name,
			 		mid = curCity.cityId,
			 		code = curCity.cityCode;				
			 	if(province == "ֱϽ��"){//ֱϽ����
			 		zxCityHtml += '<a target="_blank" href="javascript:void(0)" data-code="'+ code +'" data-mid="'+mid+'">'+cityName+'</a>';
			 	}
			}

			if(proFirstLetter && province!="ֱϽ��"){//ʡ������ĸ
				if(!repeatLet){
					firstCharHtml += '<a class="b-sArealetter" href="javascript:void(0)" data="anchor">'+proFirstLetter+'</a>';	
					cityLetHtml +=	'</dl>';									
				}	
			}
			if(province && !repeatPro && province!="ֱϽ��"){//ʡ��		
				if( !repeatLet){//ʡ������ĸ����ͬ
				//alert('��ĸ����ͬ:'+province)
					cityLetHtml += '<dl class="b-cityLet">'
									+'<dt class="b-pCity">'
						                +'<span class="b-province">'+province+'��</span>'
						                +'<span class="b-letter">'+proFirstLetter+'</span>'			
						            	+'</dt>'
						            	+'<dd class="b-citys">';	            	
				}else{//ʡ������ĸ��ͬ
				//alert('��ĸ��ͬ:'+province)
					cityLetHtml += '<dt class="b-pCity">'
						                +'<span class="b-province">'+province+'��</span>'
						            	+'</dt>'
						            	+'<dd class="b-citys">';
				}
				for(var j = 0; j < citysLen; j++){
					var curCity = citys[j];
					cityLetHtml += '<a target="_blank" href="javascript:void(0)" data-code="'+ curCity.cityCode +'" data-mid="'+curCity.cityId+'">'+curCity.name+'</a>';
				}
				cityLetHtml +=	'</dd>';
			}			
		}

		layerHtml+='<em class="b-arrow"></em>';
		layerHtml+='    <div class="b-sArea">';

		layerHtml+='        <div class="b-citys" id="'+_this.objId.hotsCity+'">'+hotCityHtml+'</div>';
		layerHtml+='        <div class="b-citys b-nearCitys" id=""></div>';
		layerHtml+='        <div class="b-sClose" id="'+_this.objId.closeBtn+'"></div>';
		layerHtml+='    </div>';
		layerHtml+='    <div class="b-letArea" id="'+_this.objId.letArea+'">'+firstCharHtml;

		layerHtml+='        <div class="b-input">';
		layerHtml+='            <input value="�����������" type="text" id="'+_this.objId.searchInp+'" />';
		
		layerHtml+='                <div class="b-slist" id="'+_this.objId.resultList+'"></div>';
		
		//layerHtml+='            <div class="cityresult" id="'+_this.objId.searchResult+'">';
		layerHtml+='                <div class="b-ntextdicon" id="'+_this.objId.tipNo+'">�Բ����Ҳ��������������</div>';
		//layerHtml+='                <div class="zdicon" id="'+_this.objId.tipGo+'">���ֱ��</div>';
		
		//layerHtml+='            </div>';
		layerHtml+='        </div>';

		layerHtml+='    </div>';

		layerHtml+='    <div class="b-cityArea" id="'+_this.objId.cityArea+'">';
		layerHtml+='    	<div class="b-zCity">';
		layerHtml+='            <div class="b-province">ֱϽ�У�</div>';
		layerHtml+='            <div class="b-citys">'+zxCityHtml+'</div>';				
		layerHtml+='        </div>';
		layerHtml+=			cityLetHtml;
		layerHtml+='    </div>';

		var cityBox = _this.getById(_this.objId.cityBox);
		cityBox.innerHTML = layerHtml;
	},
	eventFunction: function(e,obj) {
		var _this = this;
        e = e || window.event;
        var target =  e.srcElement ||  e.target;
        if (!_this.isContains(obj, target) || target.id == _this.objId.closeBtn || target.getAttribute("data-mid") || target.parentNode.getAttribute("data-mid")) {	
        	 
		    _this.hide();
            _this.searchInp.className = "";
            _this.searchInp.value = "�����������";
			_this.resultList.className="b-slist dd";	
			_this.tipNo.className="b-slist dd";

        }
    },    
	search:function(){
		var _this = this;			
		_this.searchInp.onfocus = function(){
			if(this.value == "�����������"){
				this.className = "on";
				this.value="";
				_this.resultList.className="b-slist dd";
				
				_this.resultList.style.display = 'none';
			}
		};
		_this.searchInp.onblur = function(){
			if(this.value == ""){
				this.className = "";
				this.value="�����������";
				_this.resultList.className="b-slist dd";
				_this.tipNo.className = "b-ntextdicon dd";
				_this.resultList.innerHTML ="";	
			}
			setTimeout(function() {
                _this.resultList.className = 'b-slist dd';
				_this.tipNo.className = "b-ntextdicon dd";
            }, 500)
		};
		_this.searchInp.onkeyup = function(e){	
			_this.tipNo.className = "b-ntextdicon";
			_this.resultList.className="b-slist";
				e = e || window.event;
            if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) return;
			var count = 0,
				val = _this.searchInp.value,				
				resultHtml = "<div class='b-zdicon'>���ֱ��</div>";
			if(val){
				for(var i = 0; i < areaData.length; i++){
					var record = areaData[i].citys;
					for(j = 0; j < record.length; j++){
						var curCity = record[j],
							cityName = record[j].name,
							pinyin = record[j].pinyin,
							code = record[j].cityCode;
							
							if(cityName.indexOf(val) == 0 || pinyin.indexOf(val) == 0){									
								if(count >= 10){
									break;
								}
								resultHtml += '<a href="javascript:void(0)" target="_blank" data-code="'+code+'" data-mid="'+curCity.cityId+'" data="search"><span data-code="'+code+'" data-mid="'+curCity.cityId+'">'+cityName+'</span>'+pinyin+'</a>';
								count++;
							}
					}				
				}
			}	

			if(count > 0){
				_this.resultList.innerHTML = resultHtml;				
				_this.tipNo.style.display = "none";
				//_this.tipGo.style.display = "block";
				_this.resultList.style.display = "block";
				//_this.searchResult.style.display = "block";				
			}else{
				//_this.searchResult.style.display = "block";
				_this.tipNo.style.display = "block";
				//_this.tipGo.style.display = "none";
				_this.resultList.style.display = "none";
			}			
		}
	},
	anchor:function(){
		var _this = this,
			cityArea = _this.cityArea,
			letArea = _this.letArea,
			letters = letArea.getElementsByTagName("a"),
			cityLet = _this.getClass(cityArea,"b-cityLet");
		for (var i = 0; i < letters.length; i++) {
				(function (j) {
					_this.on(letters[j], 'click', function () {
					cityArea.scrollTop = cityLet[j].offsetTop;
				})
			})(i);
		}
	}

}
