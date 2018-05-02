var adYPATag=$('.ad-ypa-block'), adYPAUnitIndex=0, adYPALoopCount=0, adYPALoopLimit=3, adYPAUnit=[{'adTagNum':0,'adCount':0,'adMax':3,'adNum':3}],adYPAUnitOption={
    'data-site': 'majisaydigi',
    'data-css-desktop': 'https://www.saydigi.com/ysm/ypa.css',
    'data-css-mobile': 'https://www.saydigi.com/ysm/ypa.css',
    'data-thumbnailsize-desktop': 'false',
    'data-thumbnailsize-mobile': 'false'
},getUnitKeyword = function() {
    var loopStatus = false;
    var loopCount =1;
    var keywordNum = 0;
    do{
        var keywordNum = Math.floor(Math.random() * adYPAUnitKeyword.length);
        loopCount++;
        if (adYPAUnitKeyword[keywordNum] == 'undefined') loopStatus = true;
        if (loopCount>3) loopStatus = false;
    }while(loopStatus);
    if (adYPAUnitKeyword[keywordNum] == 'undefined') keywordNum = 0;
    return decodeURIComponent(adYPAUnitKeyword[keywordNum]);
},adYPAUnitIdRemove = function() {
    for(i=1;i<4;i++) {
        checkUnitId = 'ypaAdWrapper-redpage_'+i;
        if (typeof $('#'+checkUnitId) != 'undefined'){$('#'+checkUnitId).attr('id', ('used_'+i));}
        if (typeof $('#'+checkUnitId+'-iframe') != 'undefined'){$('#'+checkUnitId+'-iframe').attr('id', ('used_'+i+'Iframe'));}
    }
},adYPACallBack = function() {
    if (typeof adYPAUnit[adYPAUnitIndex]['adNum'] == 'undefined') return;
    adYPAUnitIdRemove();
    var adYPATagNum = adYPAUnit[adYPAUnitIndex]['adTagNum'];
    adYPAKeyword = getUnitKeyword();
    var adUnitNum = adYPAUnit[adYPAUnitIndex]['adNum'];
    var adYPAUnitId = 'ypaAdWrapper-redpage_'+adUnitNum;
    var setOption = $.extend(true, {}, adYPAUnitOption, {'id':adYPAUnitId,'data-keyword': adYPAKeyword});
    if (typeof adYPATag.eq(adYPATagNum) != 'undefined') {
        adYPATag.eq(adYPATagNum).append($('<div></div>', setOption));
        $.getScript("https://ssl.sitemaji.com/ypa/redpage.js");
    }
},adYPAUnitKeyword=["3C","iphone","htc","samsung","ios","android","app","4G","ADSL","UV","autocad","\u5149\u7e96","\u514d\u8cbb\u5b78\u96fb\u8166","\u4f11\u9592\u8cfc\u7269","\u51b7\u6c23","\u540d\u724c\u624b\u9336","\u597d\u73a9\u904a\u6232","\u5bb6\u96fb","\u5bec\u983b","\u5bec\u983b\u8cbb\u7387","\u5e73\u677f","\u624b\u6a5f","\u6700\u65b0\u7dda\u4e0a\u904a\u6232","\u6c7d\u8eca","\u6d17\u81c9\u6a5f","\u6d17\u984f","\u7121\u7dda\u4e0a\u7db2","\u76f8\u6a5f","\u7b46\u96fb","\u7db2\u8def\u6e2c\u901f","\u7db2\u9801\u904a\u6232","\u7dda\u4e0a\u904a\u6232","\u884c\u52d5\u4e0a\u7db2","\u8cfc\u7269\u7db2","\u8dd1\u6b65\u6a5f","\u904a\u6232","\u904a\u6232\u5340","3C\u914d\u4ef6","\u96fb\u8166","\u96fb\u8996","uv\u5370\u5237\u6a5f\u68b0","\u5149\u5b78\u5100\u5668","\u5496\u5561\u6a5f","\u58a8\u6c34\u5323","\u5b89\u5168\u5668\u6750","\u5b89\u5168\u76e3\u63a7\u7cfb\u7d71","\u5b89\u5168\u8a2d\u5099","\u6578\u4f4d\u76e3\u63a7\u7cfb\u7d71","\u6578\u4f4d\u76e3\u8996\u7cfb\u7d71","\u6a5f\u5668\u8a2d\u5099","\u6aa2\u6e2c","\u6aa2\u6e2c\u5100","\u6c7d\u8eca\u51b7\u6c23\u7dad\u4fee","\u6e2c\u8a66\u5100","\u7a7a\u8abf\u7cfb\u7d71","\u7a7a\u8abf\u8a2d\u5099","\u96e2\u5fc3\u5e6b\u6d66"];
$(window).on('message', function(e) {
    if (e.originalEvent.origin.indexOf('ysm.yahoo.com') != -1) {
        var resStr = e.originalEvent.data.replace('ypa', '');
        var resJSON = $.parseJSON(resStr);
        if (typeof resJSON.cb != 'undefined') {
            if (typeof resJSON.aC != 'undefined') {
                if (resJSON.aC >0) {
                    adYPAUnit[adYPAUnitIndex]['adCount'] = parseInt(adYPAUnit[adYPAUnitIndex]['adCount'])+parseInt(resJSON.aC);
                    var mathNum = adYPAUnit[adYPAUnitIndex]['adMax']-adYPAUnit[adYPAUnitIndex]['adCount'];
                    if (mathNum<1){
                        adYPATag.eq(adYPAUnit[adYPAUnitIndex]['adTagNum']).removeClass('ad-ypa-block');
                        adYPAUnitIndex++;
                    }else{
                        adYPAUnit[adYPAUnitIndex]['adNum'] = mathNum;
                    }
                } else if (resJSON.aC==0) {
                    var removeTag = '#ypaAdWrapper-redpage_'+adYPAUnit[adYPAUnitIndex]['adNum'];
                    $(removeTag).remove();
                }
            }
            if (typeof adYPAUnit[adYPAUnitIndex] != 'undefined' && typeof adYPAUnit[adYPAUnitIndex]['adNum'] != 'undefined' && adYPALoopCount<adYPALoopLimit) {
                adYPALoopCount++;
                adYPACallBack();
            }
        }
    }
});
$(document).ready(function(){adYPACallBack();});