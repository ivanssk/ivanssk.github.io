if (self.CavalryLogger) { CavalryLogger.start_js(["Cjcdq"]); }

__d("AccessibleLayer",["fbt","DOM","Event","Focus"],(function(a,b,c,d,e,f,g){__p&&__p();function a(a){"use strict";this._layer=a,this._listener=null}a.prototype.enable=function(){"use strict";this._afterShowSubscription=this._layer.subscribe("aftershow",this._onAfterShow.bind(this)),this._afterHideSubscription=this._layer.subscribe("hide",this._onAfterHide.bind(this))};a.prototype.disable=function(){"use strict";this._listener&&this._listener.remove(),this._afterShowSubscription.unsubscribe(),this._listener=this._afterShowSubscription=null};a.prototype._closeListener=function(event){"use strict";var a=this._layer.getCausalElement();a&&(a.tabIndex==-1?(a.tabIndex=0,b("Focus").setWithoutOutline(a)):b("Focus").set(a));this._layer.hide()};a.prototype._setupCloseButton=function(){"use strict";var a=this._layer.getContentRoot(),c=b("DOM").scry(a,".layer_close_elem")[0];c||(c=b("DOM").create("a",{className:"accessible_elem layer_close_elem",href:"#",role:"button"},[g._("\u5173\u95ed\u5f39\u51fa\u6846\u5e76\u8fd4\u56de")]),b("DOM").appendContent(a,c));this._listener=b("Event").listen(c,"click",this._closeListener.bind(this))};a.prototype._onAfterShow=function(){"use strict";this._listener||this._setupCloseButton()};a.prototype._onAfterHide=function(){"use strict";this._listener&&this._listener.remove(),this._listener=null};e.exports=a}),null);
__d("ContextualDialogARIA",["DOM","getOrCreateDOMID"],(function(a,b,c,d,e,f){__p&&__p();function a(a){"use strict";this._layer=a}a.prototype.enable=function(){"use strict";this._subscription=this._layer.subscribe("beforeshow",this._addAriaAttribute.bind(this))};a.prototype.disable=function(){"use strict";this._subscription.unsubscribe(),this._subscription=null};a.prototype._addAriaAttribute=function(){"use strict";var a=this._layer.getCausalElement();if(!a)return;var c=b("DOM").scry(this._layer.getRoot(),".accessible_elem");c.length&&a.setAttribute("aria-describedby",b("getOrCreateDOMID")(c[0]))};e.exports=a}),null);
__d("LayerMouseHooks",["Arbiter","ContextualThing","Event","Layer"],(function(a,b,c,d,e,f){__p&&__p();var g=new(b("Arbiter"))();function a(a){"use strict";this._layer=a,this._subscriptions=[],this._currentlyActive=!1}a.prototype.enable=function(){"use strict";this._subscriptions=[g.subscribe("mouseenter",this._handleActive.bind(this)),g.subscribe("mouseleave",this._handleInactive.bind(this)),this._layer.subscribe("hide",function(){this._currentlyActive=!1}.bind(this))]};a.prototype.disable=function(){"use strict";while(this._subscriptions.length)this._subscriptions.pop().unsubscribe();this._subscriptions=[];this._currentlyActive=!1};a.prototype._handleActive=function(a,b){"use strict";!this._currentlyActive&&this._isNodeWithinStack(b)&&(this._layer.inform("mouseenter",b),this._currentlyActive=!0)};a.prototype._handleInactive=function(a,b){"use strict";this._currentlyActive&&((!b||!this._isNodeWithinStack(b))&&(this._layer.inform("mouseleave",b),this._currentlyActive=!1))};a.prototype._isNodeWithinStack=function(a){"use strict";return b("ContextualThing").containsIncludingLayers(this._layer.getContentRoot(),a)};b("Layer").subscribe("show",function(a,c){var d=c.getContentRoot(),e=[b("Event").listen(d,"mouseenter",function(){g.inform("mouseenter",d)}),b("Event").listen(d,"mouseleave",function(a){g.inform("mouseleave",a.getRelatedTarget())})],f=c.subscribe("hide",function(){while(e.length)e.pop().remove();f.unsubscribe();e=f=null})});e.exports=a}),null);
__d("AbstractContextualDialogArrowBehavior",["cx","CSS","DOM","Locale","Style","Vector","abstractMethod"],(function(a,b,c,d,e,f,g){__p&&__p();var h={bottom:"_53ik",top:"_53il",right:"_53im",left:"_53in"},i={above:"bottom",below:"top",left:"right",right:"left"};function j(a){"use strict";this.__layer=this._layer=a}j.prototype.enable=function(){"use strict";this._subscription=this._layer.subscribe(["adjust","reposition"],this._handle.bind(this))};j.prototype.disable=function(){"use strict";this._subscription.unsubscribe(),this._subscription=null};j.prototype.__getArrow=function(){"use strict";return b("abstractMethod")("AbstractContextualDialogArrowBehavior","__getArrow")};j.prototype._handle=function(a,b){"use strict";a==="adjust"?this._repositionArrow(b):this._repositionRoot(b)};j.prototype._repositionRoot=function(a){"use strict";__p&&__p();var c=a.getAlignment();if(c=="center")return;var d=this._layer.getRoot(),e=this._layer.getContext();a=a.isVertical();var f=this._layer.getArrowDimensions(),g=f.offset;f=f.length;e=b("Vector").getElementDimensions(e);e=a?e.x:e.y;if(e>=f+g*2)return;f=f/2+g;g=e/2;e=parseInt(f-g,10);if(a){f=null;c=="left"?f=b("Locale").isRTL()?"right":"left":f=b("Locale").isRTL()?"left":"right";g=parseInt(b("Style").get(d,f),10);b("Style").set(d,f,g-e+"px")}else{a=parseInt(b("Style").get(d,"top"),10);b("Style").set(d,"top",a-e+"px")}};j.prototype._repositionArrow=function(a){"use strict";__p&&__p();var c=this._layer.getContentRoot(),d=a.getPosition(),e=i[d];for(var f in h)b("CSS").conditionClass(c,h[f],e===f);if(d=="none")return;this._arrow||(this._arrow=this.__getArrow());b("DOM").contains(c,this._arrow)||b("DOM").appendContent(c,this._arrow);b("Style").set(this._arrow,"top","");b("Style").set(this._arrow,"left","");b("Style").set(this._arrow,"right","");b("Style").set(this._arrow,"margin","");e=j.getOffsetPercent(a);d=j.getOffset(a,e,this._layer);c=j.getOffsetSide(a);b("Style").set(this._arrow,c,e+"%");b("Style").set(this._arrow,"margin-"+c,d+"px")};j.getOffsetPercent=function(a){"use strict";var b=a.getAlignment();a=a.getPosition();if(a=="above"||a=="below")if(b=="center")return 50;else if(b=="right")return 100;return 0};j.getOffsetSide=function(a){"use strict";a=a.isVertical();return a?b("Locale").isRTL()?"right":"left":"top"};j.getOffset=function(a,b,c){"use strict";c=c.getArrowDimensions();var d=c.offset;c=c.length;a=a.getAlignment();d=a=="center"?0:d;d+=c*b/100;a!="left"&&(d*=-1);return d};e.exports=j}),null);
__d("ContextualDialogArrow",["cx","CSS","AbstractContextualDialogArrowBehavior","JSXDOM"],(function(a,b,c,d,e,f,g){__p&&__p();var h,i;h=babelHelpers.inherits(a,b("AbstractContextualDialogArrowBehavior"));i=h&&h.prototype;a.prototype.__getArrow=function(){"use strict";return b("JSXDOM").i({className:"_53io"})};a.prototype.enable=function(){"use strict";i.enable.call(this);var a=this.__layer.getContentRoot();b("CSS").addClass(a,"_5v-0")};a.prototype.disable=function(){"use strict";i.disable.call(this);var a=this.__layer.getContentRoot();b("CSS").removeClass(a,"_5v-0")};function a(){"use strict";h.apply(this,arguments)}e.exports=a}),null);
__d("ContextualDialogDefaultTheme",["cx"],(function(a,b,c,d,e,f,g){a={wrapperClassName:"_53ip",arrowDimensions:{offset:15,length:16}};e.exports=a}),null);
__d("ContextualDialogFitInViewport_PUSHSAFE",["Style","Vector"],(function(a,b,c,d,e,f){__p&&__p();var g=50,h=10;function a(a){"use strict";this._layer=a,this._contentHeight=null,this._contextY=null}a.prototype.enable=function(){"use strict";var a=this._layer.getArrowDimensions();this._arrowOffset=a.offset;a=a.length;this._arrowBuffer=this._arrowOffset+a;this._subscription=this._layer.subscribe(["reposition"],function(a,b){if(!this._layer.isFixed()||b.isVertical())return;this._adjustPosition()}.bind(this))};a.prototype.disable=function(){"use strict";this._subscription.unsubscribe(),this._subscription=null};a.prototype._getContentHeight=function(){"use strict";return b("Vector").getElementDimensions(this._layer._contentWrapper).y};a.prototype._getContextY=function(){"use strict";return b("Vector").getElementPosition(this._layer.getContext(),"viewport").y};a.prototype._adjustPosition=function(){"use strict";var a=this._getContextY(),c=this._getContentHeight();if(a===this._contextY&&c===this._contentHeight)return;this._contextY=a;this._contentHeight=c;var d=b("Vector").getViewportDimensions().y;d=Math.min(Math.max(0,a+c+h-d),Math.max(0,a-g),c-this._arrowOffset-this._arrowBuffer);b("Style").set(this._layer.getContent(),"top",-d+"px")};e.exports=a}),null);
__d("AbstractContextualDialogKeepInViewportBehavior",["ContextualLayerDimensions","Event","Style","Vector","abstractMethod","throttle"],(function(a,b,c,d,e,f){__p&&__p();function a(a){"use strict";this._layer=a,this._listeners=[],this._subscription=null,this._minimumTop=null}a.prototype.enable=function(){"use strict";__p&&__p();var a=this._layer.getArrowDimensions();this._arrowOffset=a.offset;a=a.length;this._arrowBuffer=this._arrowOffset+a;this._subscription=this._layer.subscribe(["show","hide","reposition"],function(a,b){if(this._layer.isFixed())return;a=="reposition"?(this._calculateMinimumTop(b),this._adjustForScroll()):a=="show"?(this._attachScroll(),this._adjustForScroll()):this._detachScroll()}.bind(this));this._layer.isShown()&&this._attachScroll()};a.prototype.disable=function(){"use strict";this._layer.isShown()&&this._detachScroll(),this._subscription.unsubscribe(),this._subscription=null};a.prototype.__adjustForScroll=function(a,c){"use strict";return b("abstractMethod")("AbstractContextualDialogArrowBehavior","__adjustForScroll")};a.prototype._attachScroll=function(){"use strict";var a=b("throttle")(this._adjustForScroll.bind(this)),c=this._layer.getContextScrollParent()||window;this._listeners=[b("Event").listen(c,"scroll",a),b("Event").listen(window,"resize",a)]};a.prototype._detachScroll=function(){"use strict";while(this._listeners.length)this._listeners.pop().remove();this._listeners=[]};a.prototype._getContentHeight=function(){"use strict";return!this._layer._contentWrapper?0:b("Vector").getElementDimensions(this._layer._contentWrapper).y};a.prototype._getContextY=function(){"use strict";return b("Vector").getElementPosition(this._layer.getContext()).y};a.prototype._calculateMinimumTop=function(a){"use strict";if(a.isVertical())return;this._minimumTop=this._getContextY()-(this._getContentHeight()-this._arrowBuffer)+a.getOffsetY()};a.prototype._adjustForScroll=function(){"use strict";__p&&__p();var a=this._layer.getOrientation(),c=this._layer.getContent();if(a.isVertical()||!c)return;a=b("ContextualLayerDimensions").getViewportRect(this._layer);c=a.b-this._minimumTop;if(c<0)return;a=this._getContentHeight();var d=a-(this._arrowBuffer+this._arrowOffset);d=Math.max(0,Math.min(d,d-(c-a)));this.__adjustForScroll(this._layer,d)};e.exports=a}),null);
__d("ContextualDialogKeepInViewport",["AbstractContextualDialogKeepInViewportBehavior","Style"],(function(a,b,c,d,e,f){__p&&__p();var g;g=babelHelpers.inherits(a,b("AbstractContextualDialogKeepInViewportBehavior"));g&&g.prototype;a.prototype.__adjustForScroll=function(a,c){"use strict";a=a.getContent();b("Style").set(a,"top",-c+"px")};function a(){"use strict";g.apply(this,arguments)}e.exports=a}),null);
__d("ContextualDialog",["csx","cx","invariant","ContextualDialogARIA","AccessibleLayer","ContextualDialogArrow","ContextualDialogDefaultTheme","ContextualDialogKeepInViewport","ContextualDialogFitInViewport_PUSHSAFE","ContextualLayer","CSS","DOM","Event","JSXDOM","LayerButtons","LayerFormHooks","LayerRefocusOnHide","LayerHideOnTransition","LayerMouseHooks","Style","removeFromArray","shield"],(function(a,b,c,d,e,f,g,h,i){__p&&__p();var j,k=0,l=300;c=babelHelpers.inherits(a,b("ContextualLayer"));j=c&&c.prototype;function a(a,b){"use strict";j.constructor.call(this,a,b),this._footer=null}a.prototype._configure=function(a,c){"use strict";Object.assign(a,a.theme||b("ContextualDialogDefaultTheme"));var d=a.arrowBehavior||b("ContextualDialogArrow");a.addedBehaviors=a.addedBehaviors||[];a.addedBehaviors.push(d);j._configure.call(this,a,c);this._footer=b("DOM").scry(c,"div._572u")[0];this._footer&&(this._footer.children.length===1&&this._footer.children[0].nodeName==="DIV"&&this._footer.children[0].children.length===0?this._footer.parentNode.removeChild(this._footer):b("CSS").addClass(this.getContentRoot(),"_kc"));a.hoverContext&&this._registerHoverHandlers(a.hoverContext,a.hoverShowDelay,a.hoverHideDelay)};a.prototype._registerHoverHandlers=function(a,c,d){"use strict";__p&&__p();c==null&&(c=k);d==null&&(d=l);var e,f,g=function(event){clearTimeout(f),e=setTimeout(b("shield")(this.show,this),c)}.bind(this),h=function(event){if(this._isHoverLocked())return;clearTimeout(e);f=setTimeout(this.hide.bind(this),d)}.bind(this),i=b("Event").listen(a,"mouseenter",g),j=b("Event").listen(a,"mouseleave",h),m=this.subscribe("mouseenter",g),n=this.subscribe("mouseleave",h);this.subscribe("destroy",function(){clearTimeout(f),i.remove(),j.remove(),m.unsubscribe(),n.unsubscribe()})};a.prototype._getDefaultBehaviors=function(){"use strict";var a=j._getDefaultBehaviors.call(this);b("removeFromArray")(a,b("LayerHideOnTransition"));return a.concat([b("AccessibleLayer"),b("LayerRefocusOnHide"),b("ContextualDialogKeepInViewport"),b("ContextualDialogFitInViewport_PUSHSAFE"),b("LayerButtons"),b("LayerFormHooks"),b("LayerMouseHooks"),b("ContextualDialogARIA")])};a.prototype._buildWrapper=function(a,c){"use strict";__p&&__p();this._innerWrapper=b("JSXDOM").div(null,c);var d=j._buildWrapper.call(this,a,this._innerWrapper);if(a.wrapperClassName){var e=a.wrapperClassName.split(/\s+/);for(var e=e,f=Array.isArray(e),g=0,e=f?e:e[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var h;if(f){if(g>=e.length)break;h=e[g++]}else{g=e.next();if(g.done)break;h=g.value}h=h;b("CSS").addClass(d,h)}}this.replaceEntireLayerContents(c);this.getContent()===c||i(0);this.setWidth(a.width);return d};a.prototype.getContentRoot=function(){"use strict";!this._innerWrapper&&i(0);return this._innerWrapper};a.prototype.setContent=function(a){"use strict";i(0)};a.prototype.replaceEntireLayerContents=function(a){"use strict";this._content=null,b("DOM").empty(this.getContentRoot()),this.setInnerContent(a)};a.prototype.setInnerContent=function(a){"use strict";b("CSS").addClass(a,"_53ij"),this.getContent()?b("DOM").replace(this.getContent(),a):b("DOM").appendContent(this.getContentRoot(),a),this._content=a,this.isShown()&&this.updatePosition()};a.prototype.setWidth=function(a){"use strict";b("Style").set(this.getContentRoot(),"width",a?Math.floor(a)+"px":"");return this};a.prototype.getFooter=function(){"use strict";return this._footer};a.prototype.lockHover=function(){"use strict";this._hoverLocked=!0;return this};a.prototype.unlockHover=function(){"use strict";this._hoverLocked=!1;return this};a.prototype._isHoverLocked=function(){"use strict";return!!this._hoverLocked};a.setContext=function(a,b){"use strict";a.setContext(b)};e.exports=a}),null);
__d("ContextualDialogXUITheme",["cx"],(function(a,b,c,d,e,f,g){a={wrapperClassName:"_53ii",arrowDimensions:{offset:12,length:16}};e.exports=a}),null);