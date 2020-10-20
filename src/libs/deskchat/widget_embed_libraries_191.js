var widget_embed_libraries_191_version="1.0";
(function(window,document,$,undefined){var W=$(window),D=$(document),F=$.fancybox=function(){F.open.apply(this,arguments)},IE=navigator.userAgent.match(/msie/),didUpdate=null,isTouch=document.createTouch!==undefined,isQuery=function(obj){return obj&&obj.hasOwnProperty&&obj instanceof $},isString=function(str){return str&&$.type(str)==="string"},isPercentage=function(str){return isString(str)&&str.indexOf("%")>0},isScrollable=function(el){return el&&!(el.style.overflow&&el.style.overflow==="hidden")&&
(el.clientWidth&&el.scrollWidth>el.clientWidth||el.clientHeight&&el.scrollHeight>el.clientHeight)},getScalar=function(orig,dim){var value=parseInt(orig,10)||0;if(dim&&isPercentage(orig))value=F.getViewport()[dim]/100*value;return Math.ceil(value)},getValue=function(value,dim){return getScalar(value,dim)+"px"};$.extend(F,{version:"2.1.4",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:true,autoHeight:false,autoWidth:false,autoResize:true,
autoCenter:!isTouch,fitToView:true,aspectRatio:false,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:true,closeBtn:true,closeClick:false,nextClick:false,mouseWheel:true,autoPlay:false,playSpeed:3E3,preload:3,modal:false,loop:true,ajax:{dataType:"html",headers:{"X-fancyBox":true}},iframe:{scrolling:"auto",preload:true},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},
close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:true,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(IE?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:true,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:true,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:true,title:true},onCancel:$.noop,beforeLoad:$.noop,afterLoad:$.noop,beforeShow:$.noop,afterShow:$.noop,beforeChange:$.noop,beforeClose:$.noop,afterClose:$.noop},group:{},opts:{},previous:null,coming:null,current:null,
isActive:false,isOpen:false,isOpened:false,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:false},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(group,opts){if(!group)return;if(!$.isPlainObject(opts))opts={};if(false===F.close(true))return;if(!$.isArray(group))group=isQuery(group)?$(group).get():[group];$.each(group,function(i,element){var obj={},href,title,content,type,rez,hrefParts,selector;if($.type(element)==="object"){if(element.nodeType)element=$(element);
if(isQuery(element)){obj={href:element.data("fancybox-href")||element.attr("href"),title:element.data("fancybox-title")||element.attr("title"),isDom:true,element:element};if($.metadata)$.extend(true,obj,element.metadata())}else obj=element}href=opts.href||obj.href||(isString(element)?element:null);title=opts.title!==undefined?opts.title:obj.title||"";content=opts.content||obj.content;type=content?"html":opts.type||obj.type;if(!type&&obj.isDom){type=element.data("fancybox-type");if(!type){rez=element.prop("class").match(/fancybox\.(\w+)/);
type=rez?rez[1]:null}}if(isString(href)){if(!type)if(F.isImage(href))type="image";else if(F.isSWF(href))type="swf";else if(href.charAt(0)==="#")type="inline";else if(isString(element)){type="html";content=element}if(type==="ajax"){hrefParts=href.split(/\s+/,2);href=hrefParts.shift();selector=hrefParts.shift()}}if(!content)if(type==="inline")if(href)content=$(isString(href)?href.replace(/.*(?=#[^\s]+$)/,""):href);else{if(obj.isDom)content=element}else if(type==="html")content=href;else if(!type&&!href&&
obj.isDom){type="inline";content=element}$.extend(obj,{href:href,type:type,content:content,title:title,selector:selector});group[i]=obj});F.opts=$.extend(true,{},F.defaults,opts);if(opts.keys!==undefined)F.opts.keys=opts.keys?$.extend({},F.defaults.keys,opts.keys):false;F.group=group;return F._start(F.opts.index)},cancel:function(){var coming=F.coming;if(!coming||false===F.trigger("onCancel"))return;F.hideLoading();if(F.ajaxLoad)F.ajaxLoad.abort();F.ajaxLoad=null;if(F.imgPreload)F.imgPreload.onload=
F.imgPreload.onerror=null;if(coming.wrap)coming.wrap.stop(true,true).trigger("onReset").remove();F.coming=null;if(!F.current)F._afterZoomOut(coming)},close:function(event){F.cancel();if(false===F.trigger("beforeClose"))return;F.unbindEvents();if(!F.isActive)return;if(!F.isOpen||event===true){$(".fancybox-wrap").stop(true).trigger("onReset").remove();F._afterZoomOut()}else{F.isOpen=F.isOpened=false;F.isClosing=true;$(".fancybox-item, .fancybox-nav").remove();F.wrap.stop(true,true).removeClass("fancybox-opened");
F.transitions[F.current.closeMethod]()}},play:function(action){var clear=function(){clearTimeout(F.player.timer)},set=function(){clear();if(F.current&&F.player.isActive)F.player.timer=setTimeout(F.next,F.current.playSpeed)},stop=function(){clear();$("body").unbind(".player");F.player.isActive=false;F.trigger("onPlayEnd")},start=function(){if(F.current&&(F.current.loop||F.current.index<F.group.length-1)){F.player.isActive=true;$("body").bind({"afterShow.player onUpdate.player":set,"onCancel.player beforeClose.player":stop,
"beforeLoad.player":clear});set();F.trigger("onPlayStart")}};if(action===true||!F.player.isActive&&action!==false)start();else stop()},next:function(direction){var current=F.current;if(current){if(!isString(direction))direction=current.direction.next;F.jumpto(current.index+1,direction,"next")}},prev:function(direction){var current=F.current;if(current){if(!isString(direction))direction=current.direction.prev;F.jumpto(current.index-1,direction,"prev")}},jumpto:function(index,direction,router){var current=
F.current;if(!current)return;index=getScalar(index);F.direction=direction||current.direction[index>=current.index?"next":"prev"];F.router=router||"jumpto";if(current.loop){if(index<0)index=current.group.length+index%current.group.length;index=index%current.group.length}if(current.group[index]!==undefined){F.cancel();F._start(index)}},reposition:function(e,onlyAbsolute){var current=F.current,wrap=current?current.wrap:null,pos;if(wrap){pos=F._getPosition(onlyAbsolute);if(e&&e.type==="scroll"){delete pos.position;
wrap.stop(true,true).animate(pos,200)}else{wrap.css(pos);current.pos=$.extend({},current.dim,pos)}}},update:function(e){var type=e&&e.type,anyway=!type||type==="orientationchange";if(anyway){clearTimeout(didUpdate);didUpdate=null}if(!F.isOpen||didUpdate)return;didUpdate=setTimeout(function(){var current=F.current;if(!current||F.isClosing)return;F.wrap.removeClass("fancybox-tmp");if(anyway||type==="load"||type==="resize"&&current.autoResize)F._setDimension();if(!(type==="scroll"&&current.canShrink))F.reposition(e);
F.trigger("onUpdate");didUpdate=null},anyway&&!isTouch?0:300)},toggle:function(action){if(F.isOpen){F.current.fitToView=$.type(action)==="boolean"?action:!F.current.fitToView;if(isTouch){F.wrap.removeAttr("style").addClass("fancybox-tmp");F.trigger("onUpdate")}F.update()}},hideLoading:function(){D.unbind(".loading");$("#fancybox-loading").remove()},showLoading:function(){var el,viewport;F.hideLoading();el=$('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo("body");D.bind("keydown.loading",
function(e){if((e.which||e.keyCode)===27){e.preventDefault();F.cancel()}});if(!F.defaults.fixed){viewport=F.getViewport();el.css({position:"absolute",top:viewport.h*0.5+viewport.y,left:viewport.w*0.5+viewport.x})}},getViewport:function(){var locked=F.current&&F.current.locked||false,rez={x:W.scrollLeft(),y:W.scrollTop()};if(locked){rez.w=locked[0].clientWidth;rez.h=locked[0].clientHeight}else{rez.w=isTouch&&window.innerWidth?window.innerWidth:W.width();rez.h=isTouch&&window.innerHeight?window.innerHeight:
W.height()}return rez},unbindEvents:function(){if(F.wrap&&isQuery(F.wrap))F.wrap.unbind(".fb");D.unbind(".fb");W.unbind(".fb")},bindEvents:function(){var current=F.current,keys;if(!current)return;W.bind("orientationchange.fb"+(isTouch?"":" resize.fb")+(current.autoCenter&&!current.locked?" scroll.fb":""),F.update);keys=current.keys;if(keys)D.bind("keydown.fb",function(e){var code=e.which||e.keyCode,target=e.target||e.srcElement;if(code===27&&F.coming)return false;if(!e.ctrlKey&&!e.altKey&&!e.shiftKey&&
!e.metaKey&&!(target&&(target.type||$(target).is("[contenteditable]"))))$.each(keys,function(i,val){if(current.group.length>1&&val[code]!==undefined){F[i](val[code]);e.preventDefault();return false}if($.inArray(code,val)>-1){F[i]();e.preventDefault();return false}})});if($.fn.mousewheel&&current.mouseWheel)F.wrap.bind("mousewheel.fb",function(e,delta,deltaX,deltaY){var target=e.target||null,parent=$(target),canScroll=false;while(parent.length){if(canScroll||parent.is(".fancybox-skin")||parent.is(".fancybox-wrap"))break;
canScroll=isScrollable(parent[0]);parent=$(parent).parent()}if(delta!==0&&!canScroll)if(F.group.length>1&&!current.canShrink){if(deltaY>0||deltaX>0)F.prev(deltaY>0?"down":"left");else if(deltaY<0||deltaX<0)F.next(deltaY<0?"up":"right");e.preventDefault()}})},trigger:function(event,o){var ret,obj=o||F.coming||F.current;if(!obj)return;if($.isFunction(obj[event]))ret=obj[event].apply(obj,Array.prototype.slice.call(arguments,1));if(ret===false)return false;if(obj.helpers)$.each(obj.helpers,function(helper,
opts){if(opts&&F.helpers[helper]&&$.isFunction(F.helpers[helper][event])){opts=$.extend(true,{},F.helpers[helper].defaults,opts);F.helpers[helper][event](opts,obj)}});$.event.trigger(event+".fb")},isImage:function(str){return isString(str)&&str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)},isSWF:function(str){return isString(str)&&str.match(/\.(swf)((\?|#).*)?$/i)},_start:function(index){var coming={},obj,href,type,margin,padding;index=getScalar(index);obj=F.group[index]||
null;if(!obj)return false;coming=$.extend(true,{},F.opts,obj);margin=coming.margin;padding=coming.padding;if($.type(margin)==="number")coming.margin=[margin,margin,margin,margin];if($.type(padding)==="number")coming.padding=[padding,padding,padding,padding];if(coming.modal)$.extend(true,coming,{closeBtn:false,closeClick:false,nextClick:false,arrows:false,mouseWheel:false,keys:null,helpers:{overlay:{closeClick:false}}});if(coming.autoSize)coming.autoWidth=coming.autoHeight=true;if(coming.width==="auto")coming.autoWidth=
true;if(coming.height==="auto")coming.autoHeight=true;coming.group=F.group;coming.index=index;F.coming=coming;if(false===F.trigger("beforeLoad")){F.coming=null;return}type=coming.type;href=coming.href;if(!type){F.coming=null;if(F.current&&F.router&&F.router!=="jumpto"){F.current.index=index;return F[F.router](F.direction)}return false}F.isActive=true;if(type==="image"||type==="swf"){coming.autoHeight=coming.autoWidth=false;coming.scrolling="visible"}if(type==="image")coming.aspectRatio=true;if(type===
"iframe"&&isTouch)coming.scrolling="scroll";coming.wrap=$(coming.tpl.wrap).addClass("fancybox-"+(isTouch?"mobile":"desktop")+" fancybox-type-"+type+" fancybox-tmp "+coming.wrapCSS).appendTo(coming.parent||"body");$.extend(coming,{skin:$(".fancybox-skin",coming.wrap),outer:$(".fancybox-outer",coming.wrap),inner:$(".fancybox-inner",coming.wrap)});$.each(["Top","Right","Bottom","Left"],function(i,v){coming.skin.css("padding"+v,getValue(coming.padding[i]))});F.trigger("onReady");if(type==="inline"||type===
"html"){if(!coming.content||!coming.content.length)return F._error("content")}else if(!href)return F._error("href");if(type==="image")F._loadImage();else if(type==="ajax")F._loadAjax();else if(type==="iframe")F._loadIframe();else F._afterLoad()},_error:function(type){$.extend(F.coming,{type:"html",autoWidth:true,autoHeight:true,minWidth:0,minHeight:0,scrolling:"no",hasError:type,content:F.coming.tpl.error});F._afterLoad()},_loadImage:function(){var img=F.imgPreload=new Image;img.onload=function(){this.onload=
this.onerror=null;F.coming.width=this.width;F.coming.height=this.height;F._afterLoad()};img.onerror=function(){this.onload=this.onerror=null;F._error("image")};img.src=F.coming.href;if(img.complete!==true)F.showLoading()},_loadAjax:function(){var coming=F.coming;F.showLoading();F.ajaxLoad=$.ajax($.extend({},coming.ajax,{url:coming.href,error:function(jqXHR,textStatus){if(F.coming&&textStatus!=="abort")F._error("ajax",jqXHR);else F.hideLoading()},success:function(data,textStatus){if(textStatus==="success"){coming.content=
data;F._afterLoad()}}}))},_loadIframe:function(){var coming=F.coming,iframe=$(coming.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",isTouch?"auto":coming.iframe.scrolling).attr("src",coming.href);$(coming.wrap).bind("onReset",function(){try{$(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}});if(coming.iframe.preload){F.showLoading();iframe.one("load",function(){$(this).data("ready",1);if(!isTouch)$(this).bind("load.fb",F.update);$(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
F._afterLoad()})}coming.content=iframe.appendTo(coming.inner);if(!coming.iframe.preload)F._afterLoad()},_preloadImages:function(){var group=F.group,current=F.current,len=group.length,cnt=current.preload?Math.min(current.preload,len-1):0,item,i;for(i=1;i<=cnt;i+=1){item=group[(current.index+i)%len];if(item.type==="image"&&item.href)(new Image).src=item.href}},_afterLoad:function(){var coming=F.coming,previous=F.current,placeholder="fancybox-placeholder",current,content,type,scrolling,href,embed;F.hideLoading();
if(!coming||F.isActive===false)return;if(false===F.trigger("afterLoad",coming,previous)){coming.wrap.stop(true).trigger("onReset").remove();F.coming=null;return}if(previous){F.trigger("beforeChange",previous);previous.wrap.stop(true).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()}F.unbindEvents();current=coming;content=coming.content;type=coming.type;scrolling=coming.scrolling;$.extend(F,{wrap:current.wrap,skin:current.skin,outer:current.outer,inner:current.inner,current:current,
previous:previous});href=current.href;switch(type){case "inline":case "ajax":case "html":if(current.selector)content=$("<div>").html(content).find(current.selector);else if(isQuery(content)){if(!content.data(placeholder))content.data(placeholder,$('<div class="'+placeholder+'"></div>').insertAfter(content).hide());content=content.show().detach();current.wrap.bind("onReset",function(){if($(this).find(content).length)content.hide().replaceAll(content.data(placeholder)).data(placeholder,false)})}break;
case "image":content=current.tpl.image.replace("{href}",href);break;case "swf":content='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+href+'"></param>';embed="";$.each(current.swf,function(name,val){content+='<param name="'+name+'" value="'+val+'"></param>';embed+=" "+name+'="'+val+'"'});content+='<embed src="'+href+'" type="application/x-shockwave-flash" width="100%" height="100%"'+embed+"></embed></object>";
break}if(!(isQuery(content)&&content.parent().is(current.inner)))current.inner.append(content);F.trigger("beforeShow");current.inner.css("overflow",scrolling==="yes"?"scroll":scrolling==="no"?"hidden":scrolling);F._setDimension();F.reposition();F.isOpen=false;F.coming=null;F.bindEvents();if(!F.isOpened)$(".fancybox-wrap").not(current.wrap).stop(true).trigger("onReset").remove();else if(previous.prevMethod)F.transitions[previous.prevMethod]();F.transitions[F.isOpened?current.nextMethod:current.openMethod]();
F._preloadImages()},_setDimension:function(){var viewport=F.getViewport(),steps=0,canShrink=false,canExpand=false,wrap=F.wrap,skin=F.skin,inner=F.inner,current=F.current,width=current.width,height=current.height,minWidth=current.minWidth,minHeight=current.minHeight,maxWidth=current.maxWidth,maxHeight=current.maxHeight,scrolling=current.scrolling,scrollOut=current.scrollOutside?current.scrollbarWidth:0,margin=current.margin,wMargin=getScalar(margin[1]+margin[3]),hMargin=getScalar(margin[0]+margin[2]),
wPadding,hPadding,wSpace,hSpace,origWidth,origHeight,origMaxWidth,origMaxHeight,ratio,width_,height_,maxWidth_,maxHeight_,iframe,body;wrap.add(skin).add(inner).width("auto").height("auto").removeClass("fancybox-tmp");wPadding=getScalar(skin.outerWidth(true)-skin.width());hPadding=getScalar(skin.outerHeight(true)-skin.height());wSpace=wMargin+wPadding;hSpace=hMargin+hPadding;origWidth=isPercentage(width)?(viewport.w-wSpace)*getScalar(width)/100:width;origHeight=isPercentage(height)?(viewport.h-hSpace)*
getScalar(height)/100:height;if(current.type==="iframe"){iframe=current.content;if(current.autoHeight&&iframe.data("ready")===1)try{if(iframe[0].contentWindow.document.location){inner.width(origWidth).height(9999);body=iframe.contents().find("body");if(scrollOut)body.css("overflow-x","hidden");origHeight=body.height()}}catch(e){}}else if(current.autoWidth||current.autoHeight){inner.addClass("fancybox-tmp");if(!current.autoWidth)inner.width(origWidth);if(!current.autoHeight)inner.height(origHeight);
if(current.autoWidth)origWidth=inner.width();if(current.autoHeight)origHeight=inner.height();inner.removeClass("fancybox-tmp")}width=getScalar(origWidth);height=getScalar(origHeight);ratio=origWidth/origHeight;minWidth=getScalar(isPercentage(minWidth)?getScalar(minWidth,"w")-wSpace:minWidth);maxWidth=getScalar(isPercentage(maxWidth)?getScalar(maxWidth,"w")-wSpace:maxWidth);minHeight=getScalar(isPercentage(minHeight)?getScalar(minHeight,"h")-hSpace:minHeight);maxHeight=getScalar(isPercentage(maxHeight)?
getScalar(maxHeight,"h")-hSpace:maxHeight);origMaxWidth=maxWidth;origMaxHeight=maxHeight;if(current.fitToView){maxWidth=Math.min(viewport.w-wSpace,maxWidth);maxHeight=Math.min(viewport.h-hSpace,maxHeight)}maxWidth_=viewport.w-wMargin;maxHeight_=viewport.h-hMargin;if(current.aspectRatio){if(width>maxWidth){width=maxWidth;height=getScalar(width/ratio)}if(height>maxHeight){height=maxHeight;width=getScalar(height*ratio)}if(width<minWidth){width=minWidth;height=getScalar(width/ratio)}if(height<minHeight){height=
minHeight;width=getScalar(height*ratio)}}else{width=Math.max(minWidth,Math.min(width,maxWidth));if(current.autoHeight&&current.type!=="iframe"){inner.width(width);height=inner.height()}height=Math.max(minHeight,Math.min(height,maxHeight))}if(current.fitToView){inner.width(width).height(height);wrap.width(width+wPadding);width_=wrap.width();height_=wrap.height();if(current.aspectRatio)while((width_>maxWidth_||height_>maxHeight_)&&width>minWidth&&height>minHeight){if(steps++>19)break;height=Math.max(minHeight,
Math.min(maxHeight,height-10));width=getScalar(height*ratio);if(width<minWidth){width=minWidth;height=getScalar(width/ratio)}if(width>maxWidth){width=maxWidth;height=getScalar(width/ratio)}inner.width(width).height(height);wrap.width(width+wPadding);width_=wrap.width();height_=wrap.height()}else{width=Math.max(minWidth,Math.min(width,width-(width_-maxWidth_)));height=Math.max(minHeight,Math.min(height,height-(height_-maxHeight_)))}}if(scrollOut&&scrolling==="auto"&&height<origHeight&&width+wPadding+
scrollOut<maxWidth_)width+=scrollOut;inner.width(width).height(height);wrap.width(width+wPadding);width_=wrap.width();height_=wrap.height();canShrink=(width_>maxWidth_||height_>maxHeight_)&&width>minWidth&&height>minHeight;canExpand=current.aspectRatio?width<origMaxWidth&&height<origMaxHeight&&width<origWidth&&height<origHeight:(width<origMaxWidth||height<origMaxHeight)&&(width<origWidth||height<origHeight);$.extend(current,{dim:{width:getValue(width_),height:getValue(height_)},origWidth:origWidth,
origHeight:origHeight,canShrink:canShrink,canExpand:canExpand,wPadding:wPadding,hPadding:hPadding,wrapSpace:height_-skin.outerHeight(true),skinSpace:skin.height()-height});if(!iframe&&current.autoHeight&&height>minHeight&&height<maxHeight&&!canExpand)inner.height("auto")},_getPosition:function(onlyAbsolute){var current=F.current,viewport=F.getViewport(),margin=current.margin,width=F.wrap.width()+margin[1]+margin[3],height=F.wrap.height()+margin[0]+margin[2],rez={position:"absolute",top:margin[0],
left:margin[3]};if(current.autoCenter&&current.fixed&&!onlyAbsolute&&height<=viewport.h&&width<=viewport.w)rez.position="fixed";else if(!current.locked){rez.top+=viewport.y;rez.left+=viewport.x}rez.top=getValue(Math.max(rez.top,rez.top+(viewport.h-height)*current.topRatio));rez.left=getValue(Math.max(rez.left,rez.left+(viewport.w-width)*current.leftRatio));return rez},_afterZoomIn:function(){var current=F.current;if(!current)return;F.isOpen=F.isOpened=true;F.wrap.css("overflow","visible").addClass("fancybox-opened");
F.update();if(current.closeClick||current.nextClick&&F.group.length>1)F.inner.css("cursor","pointer").bind("click.fb",function(e){if(!$(e.target).is("a")&&!$(e.target).parent().is("a")){e.preventDefault();F[current.closeClick?"close":"next"]()}});if(current.closeBtn)$(current.tpl.closeBtn).appendTo(F.skin).bind("click.fb",function(e){e.preventDefault();F.close()});if(current.arrows&&F.group.length>1){if(current.loop||current.index>0)$(current.tpl.prev).appendTo(F.outer).bind("click.fb",F.prev);if(current.loop||
current.index<F.group.length-1)$(current.tpl.next).appendTo(F.outer).bind("click.fb",F.next)}F.trigger("afterShow");if(!current.loop&&current.index===current.group.length-1)F.play(false);else if(F.opts.autoPlay&&!F.player.isActive){F.opts.autoPlay=false;F.play()}},_afterZoomOut:function(obj){obj=obj||F.current;$(".fancybox-wrap").trigger("onReset").remove();$.extend(F,{group:{},opts:{},router:false,current:null,isActive:false,isOpened:false,isOpen:false,isClosing:false,wrap:null,skin:null,outer:null,
inner:null});F.trigger("afterClose",obj)}});F.transitions={getOrigPosition:function(){var current=F.current,element=current.element,orig=current.orig,pos={},width=50,height=50,hPadding=current.hPadding,wPadding=current.wPadding,viewport=F.getViewport();if(!orig&&current.isDom&&element.is(":visible")){orig=element.find("img:first");if(!orig.length)orig=element}if(isQuery(orig)){pos=orig.offset();if(orig.is("img")){width=orig.outerWidth();height=orig.outerHeight()}}else{pos.top=viewport.y+(viewport.h-
height)*current.topRatio;pos.left=viewport.x+(viewport.w-width)*current.leftRatio}if(F.wrap.css("position")==="fixed"||current.locked){pos.top-=viewport.y;pos.left-=viewport.x}pos={top:getValue(pos.top-hPadding*current.topRatio),left:getValue(pos.left-wPadding*current.leftRatio),width:getValue(width+wPadding),height:getValue(height+hPadding)};return pos},step:function(now,fx){var ratio,padding,value,prop=fx.prop,current=F.current,wrapSpace=current.wrapSpace,skinSpace=current.skinSpace;if(prop==="width"||
prop==="height"){ratio=fx.end===fx.start?1:(now-fx.start)/(fx.end-fx.start);if(F.isClosing)ratio=1-ratio;padding=prop==="width"?current.wPadding:current.hPadding;value=now-padding;F.skin[prop](getScalar(prop==="width"?value:value-wrapSpace*ratio));F.inner[prop](getScalar(prop==="width"?value:value-wrapSpace*ratio-skinSpace*ratio))}},zoomIn:function(){var current=F.current,startPos=current.pos,effect=current.openEffect,elastic=effect==="elastic",endPos=$.extend({opacity:1},startPos);delete endPos.position;
if(elastic){startPos=this.getOrigPosition();if(current.openOpacity)startPos.opacity=0.1}else if(effect==="fade")startPos.opacity=0.1;F.wrap.css(startPos).animate(endPos,{duration:effect==="none"?0:current.openSpeed,easing:current.openEasing,step:elastic?this.step:null,complete:F._afterZoomIn})},zoomOut:function(){var current=F.current,effect=current.closeEffect,elastic=effect==="elastic",endPos={opacity:0.1};if(elastic){endPos=this.getOrigPosition();if(current.closeOpacity)endPos.opacity=0.1}F.wrap.animate(endPos,
{duration:effect==="none"?0:current.closeSpeed,easing:current.closeEasing,step:elastic?this.step:null,complete:F._afterZoomOut})},changeIn:function(){var current=F.current,effect=current.nextEffect,startPos=current.pos,endPos={opacity:1},direction=F.direction,distance=200,field;startPos.opacity=0.1;if(effect==="elastic"){field=direction==="down"||direction==="up"?"top":"left";if(direction==="down"||direction==="right"){startPos[field]=getValue(getScalar(startPos[field])-distance);endPos[field]="+="+
distance+"px"}else{startPos[field]=getValue(getScalar(startPos[field])+distance);endPos[field]="-="+distance+"px"}}if(effect==="none")F._afterZoomIn();else F.wrap.css(startPos).animate(endPos,{duration:current.nextSpeed,easing:current.nextEasing,complete:F._afterZoomIn})},changeOut:function(){var previous=F.previous,effect=previous.prevEffect,endPos={opacity:0.1},direction=F.direction,distance=200;if(effect==="elastic")endPos[direction==="down"||direction==="up"?"top":"left"]=(direction==="up"||direction===
"left"?"-":"+")+"="+distance+"px";previous.wrap.animate(endPos,{duration:effect==="none"?0:previous.prevSpeed,easing:previous.prevEasing,complete:function(){$(this).trigger("onReset").remove()}})}};F.helpers.overlay={defaults:{closeClick:true,speedOut:200,showEarly:true,css:{},locked:!isTouch,fixed:true},overlay:null,fixed:false,create:function(opts){opts=$.extend({},this.defaults,opts);if(this.overlay)this.close();this.overlay=$('<div class="fancybox-overlay"></div>').appendTo("body");this.fixed=
false;if(opts.fixed&&F.defaults.fixed){this.overlay.addClass("fancybox-overlay-fixed");this.fixed=true}},open:function(opts){var that=this;opts=$.extend({},this.defaults,opts);if(this.overlay)this.overlay.unbind(".overlay").width("auto").height("auto");else this.create(opts);if(!this.fixed){W.bind("resize.overlay",$.proxy(this.update,this));this.update()}if(opts.closeClick)this.overlay.bind("click.overlay",function(e){if($(e.target).hasClass("fancybox-overlay"))if(F.isActive)F.close();else that.close()});
this.overlay.css(opts.css).show()},close:function(){$(".fancybox-overlay").remove();W.unbind("resize.overlay");this.overlay=null;if(this.margin!==false){$("body").css("margin-right",this.margin);this.margin=false}if(this.el)this.el.removeClass("fancybox-lock")},update:function(){var width="100%",offsetWidth;this.overlay.width(width).height("100%");if(IE){offsetWidth=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(D.width()>offsetWidth)width=D.width()}else if(D.width()>
W.width())width=D.width();this.overlay.width(width).height(D.height())},onReady:function(opts,obj){$(".fancybox-overlay").stop(true,true);if(!this.overlay){this.margin=D.height()>W.height()||$("body").css("overflow-y")==="scroll"?$("body").css("margin-right"):false;this.el=document.all&&!document.querySelector?$("html"):$("body");this.create(opts)}if(opts.locked&&this.fixed){obj.locked=this.overlay.append(obj.wrap);obj.fixed=false}if(opts.showEarly===true)this.beforeShow.apply(this,arguments)},beforeShow:function(opts,
obj){if(obj.locked){this.el.addClass("fancybox-lock");if(this.margin!==false)$("body").css("margin-right",getScalar(this.margin)+obj.scrollbarWidth)}this.open(opts)},onUpdate:function(){if(!this.fixed)this.update()},afterClose:function(opts){if(this.overlay&&!F.isActive)this.overlay.fadeOut(opts.speedOut,$.proxy(this.close,this))}};F.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(opts){var current=F.current,text=current.title,type=opts.type,title,target;if($.isFunction(text))text=
text.call(current.element,current);if(!isString(text)||$.trim(text)==="")return;title=$('<div class="fancybox-title fancybox-title-'+type+'-wrap">'+text+"</div>");switch(type){case "inside":target=F.skin;break;case "outside":target=F.wrap;break;case "over":target=F.inner;break;default:target=F.skin;title.appendTo("body");if(IE)title.width(title.width());title.wrapInner('<span class="child"></span>');F.current.margin[2]+=Math.abs(getScalar(title.css("margin-bottom")));break}title[opts.position==="top"?
"prependTo":"appendTo"](target)}};$.fn.fancybox=function(options){var index,that=$(this),selector=this.selector||"",run=function(e){var what=$(this).blur(),idx=index,relType,relVal;if(!(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&!what.is(".fancybox-wrap")){relType=options.groupAttr||"data-fancybox-group";relVal=what.attr(relType);if(!relVal){relType="rel";relVal=what.get(0)[relType]}if(relVal&&relVal!==""&&relVal!=="nofollow"){what=selector.length?$(selector):that;what=what.filter("["+relType+'="'+
relVal+'"]');idx=what.index(this)}options.index=idx;if(F.open(what,options)!==false)e.preventDefault()}};options=options||{};index=options.index||0;if(!selector||options.live===false)that.unbind("click.fb-start").bind("click.fb-start",run);else D.undelegate(selector,"click.fb-start").delegate(selector+":not('.fancybox-item, .fancybox-nav')","click.fb-start",run);this.filter("[data-fancybox-start=1]").trigger("click");return this};D.ready(function(){if($.scrollbarWidth===undefined)$.scrollbarWidth=
function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),child=parent.children(),width=child.innerWidth()-child.height(99).innerWidth();parent.remove();return width};if($.support.fixedPosition===undefined)$.support.fixedPosition=function(){var elem=$('<div style="position:fixed;top:20px;"></div>').appendTo("body"),fixed=elem[0].offsetTop===20||elem[0].offsetTop===15;elem.remove();return fixed}();$.extend(F.defaults,{scrollbarWidth:$.scrollbarWidth(),
fixed:$.support.fixedPosition,parent:$("body")})})})(window,document,jQuery);(function($){$.fn.fancybox=function(options){return this.click(function(e){e.preventDefault();options=options||{};if(!$.fancybox)return;if(!options.autoSize)options.autoSize=false;if(!options.closeClick)options.closeClick=false;$.fancybox.open($(this),options)})}})(jQuery);DESK=window.DESK||{};
(function(){if(DESK&&DESK.Widget)return;DESK.Widget=function(opts){this.init(opts)};ASSISTLY=window.ASSISTLY||{};ASSISTLY.Widget=DESK.Widget;(function(){DESK.Widget.ID_COUNTER=0;DESK.Widget.prototype=function(){var new_chat_path="/customer/widget/chats/new";var new_email_path="/customer/widget/emails/new";var chat_sprite_path="http://assets0.assistly.com/images/customer/widget/chat/launch_chat_sprite.png";var email_sprite_path="http://assets0.assistly.com/images/customer/widget/email/launch_email_sprite.png";
var chat_sprite_path_ssl="https://d3j15y3zsn7b4t.cloudfront.net/images/customer/widget/chat/launch_chat_sprite.png";var email_sprite_path_ssl="https://d3j15y3zsn7b4t.cloudfront.net/images/customer/widget/email/launch_email_sprite.png";var agent_check_path="/customer/agent_online_check";return{init:function(opts){this._widgetNumber=++ASSISTLY.Widget.ID_COUNTER;this._setWidgetType(opts.type);var locale_code=((opts.fields||{}).customer||{}).locale_code;if(locale_code)if(this._isChatWidget)new_chat_path=
new_chat_path.replace(/customer/,"customer/"+locale_code);else if(this._isEmailWidget)new_email_path=new_email_path.replace(/customer/,"customer/"+locale_code);this._secure=opts.secure||window.location.protocol=="https:";this._site=opts.site;this._port=opts.port||80;if(opts.port)this._base_url=(this._secure?"https://":"http://")+this._site+(this._secure?"":":"+this._port);else this._base_url=(this._secure?"https://":"http://")+this._site;this._widgetPopupWidth=opts.popupWidth||458;this._widgetPopupHeight=
opts.popupHeight||550;this._siteAgentCount=-1;this._siteAgentRoutingCount=-1;this._widgetDisplayMode=opts.displayMode||0;this._offerAlways=false;this._offerRoutingAgentsAvailable=true;this._offerAgentsOnline=false;this._offerEmailIfChatUnavailable=false;this._widgetID=opts.id||"assistly-widget-"+this._widgetNumber;if(!opts.id)document.write('<span class="assistly-widget" id="'+this._widgetID+'"></span>');this.widgetDOM=document.getElementById(this._widgetID);this.setFeatures(opts.features);if(opts.fields){this._ticketFields=
opts.fields.ticket;this._interactionFields=opts.fields.interaction;this._customerFields=opts.fields.customer;this._emailFields=opts.fields.email;this._chatFields=opts.fields.chat}else{this._ticketFields=[];this._interactionFields=[];this._customerFields=[];this._emailFields=[];this._chatFields=[]}return this},_setWidgetType:function(type){this._isEmailWidget=false;this._isChat=false;this._type=type;switch(type){case "email":this._isEmailWidget=true;break;case "chat":this._isChatWidget=true;break;
default:this._isEmailWidget=true}return this},setFeatures:function(features){if(features){if(!(typeof features.offerAlways==="undefined"))this._offerAlways=features.offerAlways;if(!(typeof features.offerRoutingAgentsAvailable==="undefined"))this._offerRoutingAgentsAvailable=features.offerRoutingAgentsAvailable;if(!(typeof features.offerAgentsOnline==="undefined"))this._offerAgentsOnline=features.offerAgentsOnline;if(!(typeof features.offerEmailIfChatUnavailable==="undefined"))this._offerEmailIfChatUnavailable=
features.offerEmailIfChatUnavailable}return this},setSiteAgentCount:function(data){this._siteAgentCount=data.online_agents;this._siteAgentRoutingCount=data.routing_agents;this.render()},_buildBaseButton:function(){var result="";var sprite_path="";var action_path="";var show_disabled=false;var ticket_params="";var interaction_params="";var customer_params="";var email_params="";var chat_params="";var params="";if(this._ticketFields)for(param in this._ticketFields)ticket_params+="ticket["+escape(param)+
"]="+escape(this._ticketFields[param])+"&";if(this._interactionFields)for(param in this._interactionFields)interaction_params+="interaction["+escape(param)+"]="+escape(this._interactionFields[param])+"&";if(this._customerFields)for(param in this._customerFields)customer_params+="customer["+escape(param)+"]="+escape(this._customerFields[param])+"&";if(this._emailFields)for(param in this._emailFields)email_params+="email["+escape(param)+"]="+escape(this._emailFields[param])+"&";if(this._chatFields)for(param in this._chatFields)chat_params+=
"chat["+escape(param)+"]="+escape(this._chatFields[param])+"&";params=ticket_params+interaction_params+email_params+chat_params+customer_params;if(this._isChatWidget){sprite_path=this._secure?chat_sprite_path_ssl:chat_sprite_path;action_path=new_chat_path;if(!this._offerAlways){if(this._offerRoutingAgentsAvailable&&this._siteAgentRoutingCount<1)show_disabled=true;if(this._offerAgentsOnline&&this._siteAgentCount<1)show_disabled=true}if(!this._offerAlways&&!this._offerRoutingAgentsAvailable&&!this._offerAgentsOnline)show_disabled=
true;if(show_disabled&&this._offerEmailIfChatUnavailable){this._isChatWidget=false;this._isEmailWidget=true}}if(this._isEmailWidget){sprite_path=this._secure?email_sprite_path_ssl:email_sprite_path;action_path=new_email_path}action_path+="?"+params;if(!show_disabled){if(this._widgetDisplayMode==0)result='              <a class="a-desk-widget a-desk-widget-'+this._type+'"               style="text-decoration:none;width:65px;display:inline-block;min-height:22px;background: url('+
sprite_path+') no-repeat scroll 0 0px transparent;"               onmouseover="this.style.backgroundPosition=\'0 -20px\'"               onmouseout="this.style.backgroundPosition=\'0 0px\'"               onclick="window.open(\''+this._base_url+action_path+"', 'assistly_chat','resizable=1, status=0, toolbar=0,width="+this._widgetPopupWidth+",height="+this._widgetPopupHeight+"')\">&nbsp;</a>";if(this._widgetDisplayMode==1)result='              <a href="'+this._base_url+action_path+'"               class="a-desk-widget a-desk-widget-'+
this._type+'"               style="text-decoration:none;width:65px;min-height:22px;background: url('+sprite_path+') no-repeat scroll 0 0px transparent;"               onmouseover="this.style.backgroundPosition=\'0 -20px\'"               onmouseout="this.style.backgroundPosition=\'0 0px\'"               >&nbsp;</a>'}else result='            <span style="width:65px;display:inline-block;min-height:22px;background: url('+sprite_path+') no-repeat scroll 0 -40px transparent;">&nbsp;</span>';
return result},_renderChatWidget:function(){if(this._siteAgentCount<0){var that=this;url=this._base_url+agent_check_path;jQuery.getJSON(url+"?callback=?",function(data){if(data)that.setSiteAgentCount(data)})}else this.widgetDOM.innerHTML=this._buildBaseButton();return this},_renderEmailWidget:function(){this.widgetDOM.innerHTML=this._buildBaseButton();return this},render:function(){if(this._isChatWidget)this._renderChatWidget();if(this._isEmailWidget)this._renderEmailWidget();if(this._widgetDisplayMode==
1)jQuery("#"+this._widgetID+" a").each(function(){$(this).fancybox({"width":this._widgetPopupWidth,"height":this._widgetPopupHeight,"type":"iframe","hideOnOverlayClick":false,"centerOnScroll":true})});return this}}}()})()})();
(function($){$.autolink=function(html,target){target=target||"_blank";html=html||"";var re_proto=/\b([\w+.:-]+:\/\/)|mailto:/i,re=new RegExp("(\\b(?:([\\w+.:-]+:)//|www.|mailto:)(([\\w.\\-+]+(:\\w+)?@)?[-\\w]+(?:\\.[-\\w]+)*(?::\\d+)?(?:/(?:[~\\w\\+@%=\\(\\)-]|(?:[,.;:#'][^\\s$]))*)*(?:\\?[\\w\\+@%&-=.;:/-\\[\\]]+)?(?:\\#[\\w\\-]*)?)([[^$.*+?=!:|\\/()[]{}]]|<|$|))","g");return html.replace(re,function(str){var href=str,a_target=target;if(!re_proto.test(str))href="http://"+href;else if(/mailto:/i.test(str))a_target=
"_self";return $("<a/>",{target:a_target,href:href}).html(str).outerHTML()})};$.fn.highlight=function(text,o){var safe_text=text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");return this.each(function(){var replace=o||'<span class="highlight">$1</span>';$(this).html($(this).html().replace(new RegExp("("+safe_text+'(?![\\w\\s?&.\\/;#~%"=-]*>))',"ig"),replace))})};$.fn.autolink_old=function(target){target=target||"_self";return this.each(function(){var re=/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
$(this).html($(this).html().replace(re,'<a target="'+target+'" href="$1">$1</a> '))})};$.fn.mailto=function(){return this.each(function(){var re=/(([a-z0-9*._+]){1,}\@(([a-z0-9]+[-]?){1,}[a-z0-9]+\.){1,}([a-z]{2,4}|museum)(?![\w\s?&.\/;#~%"=-]*>))/g;$(this).html($(this).html().replace(re,'<a href="mailto:$1">$1</a>'))})};$.fn.autolink=function(target){return this.each(function(){var $this=$(this),html=$.autolink($this.html(),target);$this.html(html)})}})(jQuery);
