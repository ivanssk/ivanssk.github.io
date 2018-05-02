function _lgy_lift_callback_4279418 (_lgy_json) {  var _lgy_use_template  = false;
  var _lgy_template_name = '';
  var _lgy_article_links = {};

  var _lgy_lift_unescape = function (_lgy_str) {
    var _lgy_div = document.createElement("div");
    _lgy_div.innerHTML = _lgy_str;
    return _lgy_div.textContent || _lgy_div.innerText;
  }

  var _lgy_lift_escape = function (_lgy_str) {
    return (_lgy_str || "").replace(/&/g, '&amp;')
                           .replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;')
                           .replace(/"/g, '&quot;')
                           .replace(/'/g, '&#039;');
  }

  var _lgy_lift_substr = function (_lgy_str,_lgy_count) {
    if (_lgy_str && _lgy_count && (_lgy_count < _lgy_str.length)) {
      return _lgy_str.substr(0,_lgy_count) + '...';
    } else {
      return _lgy_str;
    }
  }

  var _lgy_lift_image_property = function (_lgy_value) {
    var _lgy_property = {};
    var _lgy_widget_image_width = parseInt('360');
    var _lgy_widget_image_height = parseInt('270');
    var _lgy_widget_image_ratio = parseFloat(_lgy_widget_image_width/_lgy_widget_image_height);
    var _lgy_real_image_width = parseInt(_lgy_value['image_width']);
    var _lgy_real_image_height = parseInt(_lgy_value['image_height']);
    var _lgy_real_image_ratio = parseFloat(_lgy_real_image_width/_lgy_real_image_height);
    if (_lgy_use_template) {
      _lgy_property['width']  = _lgy_real_image_width;
      _lgy_property['height'] = _lgy_real_image_height;
    } else if ((_lgy_widget_image_ratio >= 1 && _lgy_widget_image_ratio >= _lgy_real_image_ratio && 'crop' == 'pad') || (_lgy_widget_image_ratio >= 1 && _lgy_widget_image_ratio < _lgy_real_image_ratio && 'crop' != 'pad') || (_lgy_widget_image_ratio < 1 && _lgy_real_image_ratio >= _lgy_widget_image_ratio && 'crop' != 'pad') || (_lgy_widget_image_ratio < 1 && _lgy_real_image_ratio < _lgy_widget_image_ratio && 'crop' == 'pad')) {
      _lgy_property['width'] = parseInt(_lgy_real_image_width*_lgy_widget_image_height/_lgy_real_image_height);
      _lgy_property['height'] = parseInt(_lgy_widget_image_height);
      _lgy_property['top'] = 0;
      _lgy_property['left'] = parseInt((_lgy_widget_image_width-_lgy_property['width'])/2);
    } else {
      _lgy_property['width'] = parseInt(_lgy_widget_image_width);
      _lgy_property['height'] = parseInt(_lgy_real_image_height*_lgy_widget_image_width/_lgy_real_image_width);
      _lgy_property['top'] = parseInt((_lgy_widget_image_height-_lgy_property['height'])/2);
      _lgy_property['left'] = 0;
    }
    return _lgy_property;
  }

  var _lgy_lift_construct = function () {
    var _lgy_lift_container = document.getElementById('compass-fit-4279418');
    if (_lgy_json.length == 0) {
      _lgy_lift_container.style.display='none';
        return;
    }

    // custom js(before)
    (function (json){
        
    })(_lgy_json);

    // DFP impression beacon
    var _lgy_diu = '';
    if (typeof(_lgy_diu) !== 'undefined' && _lgy_diu !== "") {
      var _img = new Image();
      _img.src = _lgy_diu;
    }

    // NOTE: modalのセットアップで必要なため、_lgy_htmlをinnerHTMLに入れること
    // 自体はここで行わないといけない
    if (_lgy_template_name !== 'toaster') {
      _lgy_lift_container.innerHTML = _lgy_html;
    }

    var _lgy_style = document.createElement('style');
    _lgy_style.type = "text/css";

    if (_lgy_use_template) {
      /* 初期化、共通処理 */
      /* 20150224 */
      lobj.init();
    }

    if (typeof(lobj) !== 'undefined' && lobj.uaBrowser() === 'ie8') {
      document.getElementsByTagName('head')[0].appendChild(_lgy_style);
    }
    if (_lgy_style.styleSheet) {
      _lgy_style.styleSheet.cssText = _lgy_css;
    } else {
      _lgy_style.appendChild(document.createTextNode(_lgy_css));
    }
    if (typeof(lobj) === 'undefined' || lobj.uaBrowser() !== 'ie8') {
      document.getElementsByTagName('head')[0].appendChild(_lgy_style);
    }

    if (_lgy_use_template) {
      if (_lgy_template_name == 'pattern_1') {
        /* lobj.imgpos(id名, 列の数, 縦幅の比率％, 最大最小値の設定フラグ, 幅の最小値px, 幅の最大値px) */
        lobj.imgpos('compass-fit-4279418', 'compass-fit-widget-content', 5, 66, true, 120, 240);
        lobj.modal(['compass-fit-widget-label-caption']);

      } else if (_lgy_template_name == 'pattern_2') {
        /* lobj.imgpos(id名, 列の数, 縦幅の比率％, 最大最小値の設定フラグ, 幅の最小値px, 幅の最大値px) */
        lobj.imgpos('compass-fit-4279418', 'compass-fit-widget-content', 5, 66, false, 120, 240);

      } else if (_lgy_template_name == 'toaster') {
        lobj.toaster();
        lobj.imgpos('compass-fit-toaster-contents', false, 1, 66, false);
        lobj.modal(['compass-fit-toaster-label-caption']);
      }
    }

    var _lgy_touch;
    if ('ontouchstart' in window) {
      _lgy_touch = 'ontouchstart';
    } else if ('onmousedown' in window) {
      _lgy_touch = 'onmousedown';
    } else {
      _lgy_touch = 'onclick';
    }

    // NOTE: templateがtoasterの場合とそうでない場合で、_lgy_touchでハンドリングするaタグの取得先が変わる
    var _lgy_links;
    if (_lgy_template_name === 'toaster') {
      var toaster_contents = document.getElementById('compass-fit-toaster-contents');
      _lgy_links = toaster_contents.getElementsByTagName('a');
    } else {
      _lgy_links = _lgy_lift_container.getElementsByTagName('a');
    }

    for (var i = _lgy_links.length; i--; ) {
      var _lgy_link = _lgy_links[i];
      var _lgy_article_link = _lgy_article_links[_lgy_link.href];
      if (_lgy_article_link) {
        var _lgy_touch_event;
        _lgy_link.setAttribute('data-click-url',_lgy_article_link.click_url);
        if (_lgy_article_link.click_beacon) {
          _lgy_touch_event = "new Image().src = this.getAttribute('data-click-url');";
        } else {
          _lgy_touch_event = "this.setAttribute('href',this.getAttribute('data-click-url'));";
        }
        _lgy_link.setAttribute(_lgy_touch, _lgy_touch_event);
        if (_lgy_touch === "ontouchstart") {
          _lgy_link.setAttribute("onmousedown", _lgy_touch_event);
        }
      } else {
        _lgy_link.setAttribute('rel', 'nofollow');
      }
    }

    // custom js(after)
    (function (json){
        
    })(_lgy_json);
  }

  var _lgy_lift_ready = function () {
    var _lgy_ua = navigator.userAgent.toLowerCase();
    var _lgy_lift_container = document.getElementById('compass-fit-4279418');
    if(_lgy_lift_container){
      _lgy_lift_construct();
    } else if(document.addEventListener){
      document.addEventListener("DOMContentLoaded", _lgy_lift_construct(), false);
    } else if(/msie/.test(_lgy_ua)){
      try {
        document.documentElement.doScroll("left");
      } catch(error){
        setTimeout(arguments.callee, 0);
        return;
      }
      _lgy_lift_construct();
    } else {
      window.onload = _lgy_lift_construct();
    }
    if (_lgy_template_name != 'toaster') { // area based v-beacon.
      if (visChecker) { visChecker.add('compass-fit-4279418', _lgy_json) }
      if (jstChecker) { jstChecker.add('compass-fit-4279418', _lgy_json) }
    } else {
      if (visChecker) { visChecker.add('logly-lift-toaster-contents', _lgy_json) }
      if (jstChecker) { jstChecker.add('logly-lift-toaster-contents', _lgy_json) }
    }
    if (visChecker) { visChecker.init(); }
    if (jstChecker) { jstChecker.init(); }
  }

  if (_lgy_template_name == 'toaster' && _lgy_json.length > 2 ) {
    _lgy_json = _lgy_json.slice(0, 2);
  }
  var _lgy_widget = _lgy_lift_unescape('&lt;li style=&quot;border-top: 1px solid #ccc;&quot;&gt;  {{ADS}}&lt;/li&gt;');
  var _lgy_ad = _lgy_lift_unescape('&lt;div class=&quot;sidebar-list-img left relative&quot;&gt;  &lt;a href=&quot;{{URL}}&quot; target=&quot;{{TARGET}}&quot;&gt;    &lt;img width=&quot;{{IMAGE_WIDTH}}&quot; height=&quot;{{IMAGE_HEIGHT}}&quot; src=&quot;{{IMAGE_URL}}&quot;&gt;  &lt;/a&gt;&lt;/div&gt;&lt;!--sidebar-list-img--&gt;&lt;div class=&quot;sidebar-list-text left relative&quot;&gt;  &lt;a href=&quot;{{URL}}&quot; target=&quot;{{TARGET}}&quot;&gt;{{TITLE}}&lt;/a&gt;  &lt;div class=&quot;widget-post-info left&quot;&gt;    &lt;span class=&quot;widget-post-cat&quot;&gt;{{ADV}}&lt;/span&gt;    &lt;span class=&quot;widget-post-date&quot;&gt;PR&lt;/span&gt;  &lt;/div&gt;   {{BEACON_IMG_TAG}}  &lt;!--widget-post-info--&gt;&lt;/div&gt;&lt;!--sidebar-list-text--&gt;													');
  var _lgy_article = _lgy_lift_unescape('&lt;div class=&quot;compass-fit-ad compass-fit-article&quot; id=&quot;{{ITEM_ID}}&quot;&gt;  &lt;div class=&quot;compass-fit-ad-inner&quot;&gt;          &lt;div class=&quot;compass-fit-ad-content&quot;&gt;        &lt;div class=&quot;compass-fit-ad-content-inner&quot;&gt;                      &lt;div class=&quot;compass-fit-ad-title&quot;&gt;              &lt;a href={{URL}} target={{TARGET}}&gt;{{TITLE}}&lt;/a&gt;            &lt;/div&gt;                    {{BEACON_IMG_TAG}}        &lt;/div&gt;      &lt;/div&gt;      &lt;/div&gt;&lt;/div&gt;');
  var _lgy_css = _lgy_lift_unescape('#compass-fit-4279418 #compass-fit-widget {width: 100%;}#compass-fit-4279418 #compass-fit-widget-label {border-bottom-style: solid;border-bottom-width: 2px;border-bottom-color: #5C97FF;}#compass-fit-4279418 #compass-fit-widget-label-caption {padding: 5px 10px;background-color: #5C97FF;float: left;}#compass-fit-4279418 #compass-fit-widget-label-caption a {color: #FFFFFF;text-decoration: none;}#compass-fit-4279418 .compass-fit-ad {display: inline-block;zoom: 1;vertical-align:top;width: 100%;margin: 5px 0;padding: 0;}#compass-fit-4279418 .compass-fit-ad-image {vertical-align: top;width: 360px;height: 270px;padding-right: 0;}#compass-fit-4279418 .compass-fit-ad-image-inner {position: relative;overflow: hidden;width: 360px;height: 270px;}#compass-fit-4279418 .compass-fit-ad-image-inner img {position: absolute;max-width: none;max-height: none;border-style:none;}#compass-fit-4279418 .compass-fit-ad-content {word-break: break-all;}#compass-fit-4279418 .compass-fit-ad-disclosure {text-align: left;}#compass-fit-4279418 .compass-fit-ad-disclosure a {color: #999999;}#compass-fit-4279418 .compass-fit-clear {clear: both;}#compass-fit-4279418 .ie-lte9 .compass-fit-ad {display: inline;}#compass-fit-toaster .compass-fit-credit,#compass-fit-4279418 .compass-fit-credit {  clear:both;  padding:0 8px 10px;  text-align:right;}#compass-fit-toaster .compass-fit-credit {  padding-right:0;}#compass-fit-toaster .compass-fit-credit a,#compass-fit-4279418 .compass-fit-credit a {  color: #999;  text-decoration: none;  font-size:13px;}#compass-fit-toaster .compass-fit-credit a .compass-fit-credit-logo,#compass-fit-4279418 .compass-fit-credit a .compass-fit-credit-logo {  display:inline-block;  background: url(&#39;//cdn.logly.co.jp/spritesource-s5c12c753d2.png&#39;) no-repeat 0 -103px;  color:transparent;  margin-left:3px;  width:36px;  height:14px;  vertical-align:middle;  *display:inline;  *zoom:1;}#compass-fit-toaster .compass-fit-credit a:hover .compass-fit-credit-logo,#compass-fit-4279418 .compass-fit-credit a:hover .compass-fit-credit-logo {  background: url(&#39;//cdn.logly.co.jp/spritesource-s5c12c753d2.png&#39;) no-repeat 0 -117px;}@media only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min-device-pixel-ratio: 2),(min-resolution: 2dppx) {  #compass-fit-toaster .compass-fit-credit a .compass-fit-credit-logo,  #compass-fit-4279418 .compass-fit-credit a .compass-fit-credit-logo {    background-image: url(&quot;//cdn.logly.co.jp/logo2x.png&quot;)!important;    background-size: 55px 72px!important;    background-position: 0 -44px!important;  }  #compass-fit-toaster .compass-fit-credit a:hover .compass-fit-credit-logo,  #compass-fit-4279418 .compass-fit-credit a:hover .compass-fit-credit-logo {    background-position: 0 -58px!important;  }}');
  var _lgy_ads = '';
  for (var i = 0, len = _lgy_json.length; i < len; i++) {
    var _lgy_value = _lgy_json[i];
    var _lgy_title = _lgy_lift_escape(_lgy_lift_substr(_lgy_value['title'],'40'));
    var _lgy_lead = _lgy_lift_escape(_lgy_lift_substr(_lgy_value['lead'],'40'));
    var _lgy_category = _lgy_lift_escape(_lgy_value['category']);
    var _lgy_image_property = _lgy_lift_image_property(_lgy_value);
    var _lgy_target = (document.URL.indexOf(_lgy_value['site']) == -1) ? '_blank' : '_top';
    var _lgy_beacon = _lgy_value['beacon_url'] ? '<img src="'+_lgy_lift_escape(_lgy_value['beacon_url'])+'" width="1" height="1" style="position: absolute; width: 1px; height: 1px; top: -32767px; left: -32767px;"/>' : '';
    var _lgy_one_ad = _lgy_value['is_article'] ? _lgy_article : _lgy_ad;
    var _lgy_item_id = "compass-fit-4279418-item-"+(i+1);
    _lgy_one_ad = _lgy_one_ad.replace(/{{ITEM_ID}}/g,_lgy_item_id);
    _lgy_one_ad = _lgy_one_ad.replace(/{{TITLE}}/g,_lgy_title).replace(/{{LEAD}}/g,_lgy_lead).replace(/{{IMAGE_URL}}/g,_lgy_value['image_url']).replace(/{{IMAGE_WIDTH}}/g,_lgy_image_property['width']).replace(/{{IMAGE_HEIGHT}}/g,_lgy_image_property['height']).replace(/{{IMAGE_TOP}}/g,_lgy_image_property['top']).replace(/{{IMAGE_LEFT}}/g,_lgy_image_property['left']).replace(/{{SITE}}/g,_lgy_value['site']).replace(/{{BEACON_IMG_TAG}}/g,_lgy_beacon).replace(/{{I}}/g,i+1).replace(/{{TARGET}}/g,_lgy_target).replace(/{{CATEGORY}}/g,_lgy_category);
    var _lgy_subject = _lgy_value['advertising_subject'] ? _lgy_value['advertising_subject'] : _lgy_value['site'];
    _lgy_one_ad = _lgy_one_ad.replace(/{{ADV}}/g,_lgy_subject);
    if (_lgy_value['is_article']) {
      _lgy_one_ad = _lgy_one_ad.replace(/{{URL}}/g,_lgy_value['ld_url']);
      _lgy_article_links[_lgy_value['ld_url']] = {
        click_url: _lgy_value['url'],
        click_beacon: _lgy_value['is_click_beacon']
      };
    } else {
      _lgy_one_ad = _lgy_one_ad.replace(/{{URL}}/g,_lgy_value['url']);
    }
    if (_lgy_value['published_at']) {
        var _lgy_datetime = _lgy_value['published_at'].split('T');
        var _lgy_ymd      = _lgy_datetime[0].split('-');
        var _lgy_time     = _lgy_datetime[1].split(':');

        var _lgy_yyyy = _lgy_ymd[0];
        var _lgy_mm   = _lgy_ymd[1];
        var _lgy_dd   = _lgy_ymd[2];
        var _lgy_m    = _lgy_mm.replace(/^0*/, '');
        var _lgy_d    = _lgy_dd.replace(/^0*/, '');

        var _lgy_time_hh = _lgy_time[0];
        var _lgy_time_mm = _lgy_time[1];
        var _lgy_time_h  = _lgy_time_hh.replace(/^0/, '');

        _lgy_one_ad = _lgy_one_ad.replace(/{{YYYY}}/g,_lgy_yyyy).replace(/{{MM}}/g,_lgy_mm).replace(/{{DD}}/g,_lgy_dd).replace(/{{M}}/g,_lgy_m).replace(/{{D}}/g,_lgy_d).replace(/{{HH}}/g,_lgy_time_hh).replace(/{{H}}/g,_lgy_time_h).replace(/{{mm}}/g,_lgy_time_mm);
    }
    _lgy_ads += _lgy_one_ad;
  /*if (visChecker) { visChecker.add(_lgy_item_id); } // for item based v-beacon*/
  }
var visChecker = (function () {
    "use strict";

  var _lgy_item_visibilities = {};

  var _computeFrameOffset = function(win, dims ) {
    dims = { top: dims.top || 0, left: dims.left || 0, right: dims.right || 0, bottom: dims.bottom || 0 };
    if (win !== top) {
        var rect = win.frameElement.getBoundingClientRect();
        dims.left += rect.left;
        dims.right += rect.left;
        dims.top += rect.top;
        dims.bottom += rect.top;
        dims = _computeFrameOffset(win.parent, dims ); // recursion
    }
    return dims;
  };

  var _isCrossOriginFrame = function() {
    try {
      return (!window.top.location.hostname);
    } catch (e) {
      return true;
    }
  }

  var _addEvent;
  var _removeEvent;
  var _setupEventHandlers = function() {
    if (window.addEventListener) {
      _addEvent = function (target, name, fn) {
        if (!name) { return false; }
        target.addEventListener(name, fn, false);
      };
      if (window.removeEventListener) {
        _removeEvent = function (target, name, fn) {
          if (!name) { return false; }
          target.removeEventListener(name, fn);
        };
      }
    } else if (window.attachEvent) {
      _addEvent = function (target, name, fn) {
        if (!name) { return false; }
        target.attachEvent("on" + name, fn);
      };
      if (window.detachEvent) {
        _removeEvent = function (target, name, fn) {
          if (!name) { return false; }
          target.detachEvent("on" + name, fn);
        };
      }
    }
  };
  var _isAddedCheckToTop = false;
  var _addCheckToTop = function() {
    _addEvent(top, "scroll", _check);
    _addEvent(top, "resize", _check);
    _isAddedCheckToTop = true;
  };
  var _removeCheckFromTop = function() {
    if (_isAddedCheckToTop) {
      _removeEvent(top, "scroll", _check)
      _removeEvent(top, "resize", _check);
      _removeEvent(window, "beforeunload", _removeCheckFromTop);
      _isAddedCheckToTop = false;
    }
  };

  var _check = function() {
    if (!top) { return; }
    var ww = (top.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth || 0);
    var wh = (top.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight || 0);
    var win_area = ww * wh;
    var is_iframe = window != top;

    for (var item_id in _lgy_item_visibilities) {
      var data = _lgy_item_visibilities[item_id];
      if (data.status == "visible") { continue; }
      // status: invisible -> timer -> timeout -> visible

      var item = data.ref || document.getElementById(item_id);
      if (!item || !item.getBoundingClientRect) { continue; }
      var rect = item.getBoundingClientRect();
      if (is_iframe) { rect = _computeFrameOffset(window, rect); }
      var item_area = (rect.right - rect.left) * (rect.bottom - rect.top);
      item_area = Math.min(item_area, win_area);

      var vis_width = 0, vis_height = 0;
      if (rect.right > 0 && rect.left < ww) { vis_width = Math.min(rect.right, ww) - Math.max(0, rect.left)}
      if (rect.bottom > 0 && rect.top < wh) { vis_height = Math.min(rect.bottom, wh) - Math.max(0, rect.top)}
      var vis_area = vis_width * vis_height;

      if (item_area > 0 && vis_area >= item_area * 0.5) {
        if (data.status == "invisible") {
          data.status = "timer";

          (function (item_id2){
            data.timer = setTimeout(function() {
              var data2 = _lgy_item_visibilities[item_id2];
              data2.status = "timeout";
              _check();
            }, 1000);
          })(item_id);

        } else if (data.status == "timeout") {
          data.status = "visible";
          data.timer = null;
          item.setAttribute("visibility", "visible")
          //console.log("calling beacon for: " + item_id)
          if (data.data) {
            var url = data.data['viewable_beacon_url'];
            if (url) {
              _call(item, url);
            }
            var urls = data.data['viewable_beacon_urls'];
            if (urls) {
              for (var i = 0, len = urls.length; i < len; i++) {
                _call(item, urls[i]);
              }
            }
          }
          _removeCheckFromTop();
        }

      } else if (data.status == "timer") {
        // timer -> invisible
        data.status = "invisible";
        if (data.timer) { clearTimeout(data.timer); }
        data.timer = null;
      }
    }
  };

  var _add = function(item_id, data) {
    if (data && data.constructor === Array) {
      var urls = {};
      for (var i = 0; i < data.length; i ++) {
        var obj = data[i];
        if (obj["viewable_beacon_url"]) {
          urls[obj["viewable_beacon_url"]] = 1;
        }
      }
      data = {"viewable_beacon_urls": []};
      for(var url in urls) { data["viewable_beacon_urls"].push(url) };
    }
    var ref = document.getElementById(item_id);
    _lgy_item_visibilities[item_id] = {"status": "invisible", "timer": null, "data": data, "ref": ref};
  };

  var _call = function(item, url) {
    var dummy = document.createElement('div');
    dummy.innerHTML = '<img src="' + url + '" width="1" height="1" style="position: absolute; width: 1px; height: 1px; top: -32767px; left: -32767px;">';
    item.appendChild(dummy.firstChild);
  };

  var _init = function() {
    _setupEventHandlers();

    if (window != top && _isCrossOriginFrame()) {
      //console.log("[warning] cross origin iframe used. disable viewable impression.");
      return;
    }

    _addCheckToTop();
    _addEvent(window, "beforeunload", _removeCheckFromTop);
    _check();
  };

  return {
    _data: _lgy_item_visibilities,
    init: _init,
    add: _add,
    check: _check
	};
}());
var jstChecker = (function () {
    "use strict";

  var _lgy_item_jstrackers = {};

  var _add = function(item_id, data) {
    if (data && data.constructor === Array) {
      var urls = {};
      for (var i = 0; i < data.length; i ++) {
        var obj = data[i];
        if (obj["jstracker_url"]) {
          urls[obj["jstracker_url"]] = 1;
        }
      }
      data = {"jstracker_urls": []};
      for(var url in urls) { data["jstracker_urls"].push(url) };
    }
    _lgy_item_jstrackers[item_id] = {data: data};
  };

  var _call = function(item, url) {
    var tracker = document.createElement('script');
    tracker.type = "text/javascript";
    tracker.async = true;
    tracker.src = url;
    item.appendChild(tracker);
  };

  var _init = function() {
    for (var item_id in _lgy_item_jstrackers) {
      var data = _lgy_item_jstrackers[item_id];
      var item = document.getElementById(item_id);

      if (data.data) {
        var urls = data.data['jstracker_urls'];
        if (urls) {
          for (var i = 0, len = urls.length; i < len; i++) {
            _call(item, urls[i]);
          }
        }
      }
    }
  };

  return {
    _data: _lgy_item_jstrackers,
    init: _init,
    add: _add
  };
}());

  var _lgy_html = _lgy_widget.replace('{{ADS}}',_lgy_ads);
  _lgy_lift_ready();
}

(function() {
  var _lgy_script = document.createElement("script");
  var _lgy_url =  (window._lgy_lw_imp_url && window._lgy_lw_imp_url != "") ? window._lgy_lw_imp_url : document.URL;
  var _lgy_ref = (window._lgy_lw_imp_ref_url && window._lgy_lw_imp_ref_url != "") ? window._lgy_lw_imp_ref_url : document.referrer;
  var _lgy_dcu = '';
  _lgy_script.type = "text/javascript";
  _lgy_script.charset = "UTF-8";
  _lgy_script.async = true;
  _lgy_script.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift.json?adspot_id=4279418&widget_id=10606&auc_id=&callback=_lgy_lift_callback_4279418&url="+encodeURIComponent(_lgy_url)+"&ref="+encodeURIComponent(_lgy_ref);
  if (typeof(_lgy_dcu) !== 'undefined' && _lgy_dcu !== "") {
    _lgy_script.src+="&dcu="+encodeURIComponent(_lgy_dcu);
  }
  var _lgy_script_0 = document.getElementsByTagName('script')[0];
  _lgy_script_0.parentNode.insertBefore(_lgy_script, _lgy_script_0);
})();


(function() {
  function _lgy_insert_iframe(iframe) {
    document.body.insertBefore(iframe, document.body.firstChild);
  }
  var _lgy_iframe = document.createElement("iframe");
  _lgy_iframe.src = (("https:" == document.location.protocol) ? "https://" : "http://")+"sync.logly.co.jp/sync/sync.html";
  _lgy_iframe.style.display = "none";
  _lgy_iframe.style.border = "none";
  _lgy_iframe.scrolling = "no";
  setTimeout(function() {
    _lgy_insert_iframe(_lgy_iframe);
  }, 500);
})();

