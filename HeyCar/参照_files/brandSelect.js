(function(d,f){function h(n,r,m){m=m||{};var s=m.jsonpCallback||"jsonp"+Math.random().toString(32).slice(2),q=m.jsonp||"callback",p=document.createElement("script");delete (m.jsonpCallback);delete (m.jsonp);for(var o in m){if(m.hasOwnProperty(o)){p.setAttribute(o,m[o])}}d[s]=function(){r&&r(arguments);p.parentNode.removeChild(p)};n.indexOf("?")!==-1?(n+="&"):(n+="?");p.src=n+q+"="+s;document.getElementsByTagName("head")[0].appendChild(p)}[].forEach||(Array.prototype.forEach=function(n,m){for(var p=0,o=this.length;o>p;p++){n.apply(m||null,[this[p],p,this])}return this});var c=(function(){if(typeof addEventListener==="function"){return function(n,m,o){m=[].concat(m);m.forEach(function(p){return n.addEventListener(p,o,false)})}}else{return function(n,m,o){m=[].concat(m);m.forEach(function(p){return n.attachEvent("on"+p,function(){o.call(n)})})}}})();function b(n,m){return"dataset" in n?n.dataset[m]:n.getAttribute("data-"+m)}function k(n,m,o){return"dataset" in n?(n.dataset[m]=o):(n.setAttribute("data-"+m,o))}function j(o){var p=document.createElement("div"),n=[];p.innerHTML=o;var m=p.firstChild;while(m){n.push(m);m=m.nextSibling}p=m=null;return n.length>1?n:n[0]}var a=function(n,o){var m;while(n!==document.body){if(o(n)){m=n;break}n=n.parentNode}return m};var e=function(m,n){if(m.compareDocumentPosition){return(m.compareDocumentPosition(n)&16)!==0}else{return m.contains(n)}};var g=function(n){try{var m=document.createElement('<iframe frameborder=0 scrolling=no style="position:absolute;top:0;left:0;z-index:-1;" width=100% height=999></iframe>');n.insertBefore(m,n.firstChild)}catch(o){}};var i=(function(){var m=document.createElement("input");return{inputEvent:"oninput" in m}})();function l(m){this.el=m.el;this.type=m.type;this.wrap=this.el.parentNode;this.autocompleteIntf=m.autocomplete;this.dirs=m.dirs;this.dirsort=m.dirsort;this.dirname=m.dirname;this.dirCallback=m.dirCallback;this.sortCache={};this.breadCrumb={curPath:"",addr:{}};this.init()}l.prototype={constructor:l,init:function(){this.el.isDefault=true;this.callbackLock=false;this.buildLayout();this.bindEvent()},buildLayout:function(){var m=this.detailList=j('<div class="ksDetailList" style="display:none"></div>');this.closeHandler=j('<a class="ksDetailList-closeBtn" href="javascript:;">X</a>');if(!d.XMLHttpRequest){g(m)}m.show=m.isInit=false;m.appendChild(this.closeHandler);this.wrap.insertBefore(m,this.wrap.firstChild);m=null},bindEvent:function(){var o=this.detailList,n=this.el,m=this;if(m.type=="btn"){c(this.el,"click",function(r){var p=this.parentNode;if(p.className.indexOf("showMoreOptions")!=-1){m.hide(o,true)}else{var q=function(){return this.isDefault};m.showDetailList(this,q)}})}else{c(this.el,"keyup",function(q){var p=function(){return this.value===""};n.isDefault=false;m.showDetailList(this,p)});c(this.el,"focus",function(q){var p=function(){return this.isDefault};m.showDetailList(this,p,function(){this.value=""})});c(this.el,"blur",function(p){if(this.value===""){this.isDefault=true}})}c(o,"click",function(r){r=window.event||r;var s=r.target||r.srcElement,p=a(s,function(t){return b(t,"dir")}),q=b(s,"index");if(b(s,"id")&&p){r.preventDefault?r.preventDefault():(r.returnValue=false);r.stopPropagation?r.stopPropagation():(r.cancelable=true);return m.unfoldFolder({target:s,query:b(s,"id"),curPath:b(p,"dir")})}if(q){m.jumpToIndex(q)}});c(this.closeHandler,"click",function(p){p=window.event||p;p.preventDefault?p.preventDefault():(p.returnValue=false);m.hide(o,true)});c(document,"click",function(p){p=window.event||p;var q=p.target||p.srcElement;if(!e(m.wrap,q)){m.hide(o,true);if(!n.isDefault){n.isDefault=true}}})},buildDetailList:function(){var n=this.detailList,m=this;function o(r){var q=[],p=['<div class="ksDetailList-index">'];r.forEach(function(s){if(s.caption){p.push('<a href="javascript:;" data-index="'+s.title+'">'+s.text+"</a>");if(q.length){q.push("</dl>")}q.push('<dl data-caption="'+s.title+'"><dt>'+s.text+"</dt>");return}q.push('<dd><a href="javascript:;" data-id="'+s.id+'" data-title="'+s.title+'">'+s.text+"</a></dd>")});p.push("</div>");q.push("</dl></div>");q.unshift('<div class="ksDetailList-detail" data-dir="Root/">');return j(p.join("")+q.join(""))}if(this.callbackLock){return}this.callbackLock=true;h(this.dirs[0],function(r){var p=o(r[0][m.dirsort[0]]);m.detailContent=p[1];m.updateCrumb({root:true,curPath:"",controller:m.dirs[0],view:m.detailContent});var q=j('<div class="ksDetailList-wrap"><strong>'+m.dirname[0]+"</strong></div>");p.forEach(function(s){q.appendChild(s)});n.insertBefore(q,n.firstChild);n.isInit=true;m.callbackLock=false})},updateCrumb:(function(){var n=function(s,r){r=r.split("/");r.pop();var q=s,o=r.length;while(o){var p=r.shift();q=q[p];o--}return q};var m=function(s,r,q){var p,t,o;if(r.length>s.length){r=r.replace(s,"");p=r.split("/");p.pop();t=n(q,s);p.forEach(function(u){t=t[u];t.el.parentNode.removeChild(t.el)})}};return function(p,s){var q=this.breadCrumb,r="Root";q.curPath=p.curPath;var o=q.curPath.split("/").length-1;if(!p.root){r="folder"+o}p.prevPath&&m(q.curPath,p.prevPath,q.addr);q.curPath+=r;curDir=n(q.addr,q.curPath);curDir[r]={el:p.view,controller:p.controller};q.curPath+="/"}})(),showDetailList:function(r,q,p){var n=this.autoList,o=this.detailList,m=this;if(!o.isInit){this.buildDetailList()}setTimeout(function(){if(q.call(r)){m.show(o);p&&p.call(r)}else{m.hide(o)}},0)},unfoldFolder:(function(){var m=function(p,q){var o=['<div class="ksDetailList-sort"><dl>'];if(p.length){p.forEach(function(r){if(r.caption){o.push("<dt>"+r.text+"</dt>");return}o.push('<dd><a href="javascript:;" data-id="'+r.id+'" data-title="'+r.title+'">'+r.text+"</a></dd>")})}else{o.push("<dt>������</dt>")}o.push("</dl></div>");return j(o.join(""))};var n=function(p,o,q,r,s){if(p[q]&&p[q][r]){setTimeout(function(){return s(p[q][r])},1)}else{h(o[q]+r,function(t){p[q]=p[q]||{};p[q][r]=t;return s(t)})}};return function(q){var r=this.breadCrumb,t=q.curPath.split("/").length-1,s=this.detailList,o=this.sortCache,p=this;if(this.dirs[t]){if(this.callbackLock){return}this.callbackLock=true;n(o,this.dirs,t,q.query,function(w){var v=j('<div class="ksDetailList-wrap"><strong>'+p.dirname[t]+"</strong></div>");var u=m(w[0][p.dirsort[t]]);p.updateCrumb({controller:p.dirs[t],view:v,curPath:q.curPath,prevPath:r.curPath});k(u,"dir",r.curPath);v.appendChild(u);s.appendChild(v);p.callbackLock=false})}else{this.dirCallback&&this.dirCallback(q.query,q.target);this.hide(s)}}})(),jumpToIndex:(function(){var o=false;var m=function(v,t,q,u){var p=t.getElementsByTagName(q),w;for(var s=0,r=p.length;s<r;s++){if(w=u(p[s])){v[w]=p[s].offsetTop}}};var n={};return function(p){if(!o){o=true;m(n,this.detailList,"dl",function(q){return b(q,"caption")})}this.detailContent.scrollTop=n[p]}})(),show:function(n){n.show=true;n.style.display="block";var m=this.el.parentNode;if(m.className.indexOf("showMoreOptions")==-1){m.className=m.className.replace(/\s*$/," showMoreOptions")}},hide:function(o,p){var m=this.el.parentNode;if(this.detailContent&&o.show){if(p){this.detailContent.scrollTop=0;var n=this.breadCrumb.curPath;this.breadCrumb.curPath="Root/";this.updateCrumb({root:true,curPath:"Root/",controller:this.dirs[0],prevPath:n,view:this.detailContent});this.breadCrumb.curPath="Root/"}if(m.className.indexOf("showMoreOptions")>-1){m.className=m.className.replace(/\s*showMoreOptions\s*/," ")}o.show=false;o.style.display="none"}}};d.BrandSelect=l})(this);