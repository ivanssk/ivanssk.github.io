/**
 * @author Vickyhuang
 */
var Com = {
	init: function() {
		
		$(".ui_bestword").get(0) && $(".ui_bestword li").bind({
			mouseover: function() {
				$(this).addClass("on");
			},
			mouseout: function() {
				$(this).removeClass("on");
			}
		});
		
		$("#icon_menu").off().on({
			click: function() {
				if($("#menu_list").is(":hidden")){
					$("#menu_list").show();
					$("#wrap").addClass("show_menu");
				}else{
					$("#menu_list").hide();
					$("#wrap").removeClass("show_menu");
				}
				$("#mainBannerImg").get(0) && $("#mainBannerImg").height($("#mainBannerImg div.cur img").height());
				$("#hotwordContainer").get(0) && HotwordEffect.fnHotword.load();
			}
		});
		
		$("#icon_search").off().on({
			click: function() {
				if($("#searchForm").is(":hidden")){
					$("#searchForm").show();
					$(this).find(".menu_popup_point").show();
				}else{
					$("#searchForm").hide();
					$(this).find(".menu_popup_point").hide();
				}
			}
		});
	},
	
/**
*@author VickyHuang
*@param {Object} options include: args: 
*@description header滾動效果
*/
	fnHeaderScroll: function(args) {
		var scrollTop = $(document).scrollTop();
		if(scrollTop > 1){
			$("#header").addClass("fixed");
		}else{
			$("#header").removeClass("fixed");
		}
	},
	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description 滾到頂部
*/
	fnGoTop: function(top) {
		$("body, html").animate({
			scrollTop : top || 1
		}, "fast");
	},
	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description 滾到頂部
*/
	fnGoTop: function(top) {
		$("body, html").animate({
			scrollTop : top || 1
		}, "fast");
	}
};


var Index = {
	init: function(args) {
		//Banner圖片 滾動
		BannerEffect.init();
		
		//精彩詞條 滾動
		BestwordEffect.init();
		
		//熱門詞條 效果
		HotwordEffect.init({"arrBgColor": args.arrBgColor});
	}
};


	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description Banner圖片效果（漸隱漸現滾動）
*/
var BannerEffect = {
	
	init: function(args) {
		var $bannerImg = $("#mainBannerImg div"),
			$bannerPoint = $("#mainBannerPoint"),
			$bannerPointSpan = $("#mainBannerPoint span"),
			autoScroll;
			
		BannerEffect.fnShow(0, 0);
		// $bannerImg = $("#mainBannerImg div").eq(0).fadeIn("slow").siblings().hide();
		
		$("#mainBannerImg").height($("#mainBannerImg div.cur img").height());
		
		autoScroll = setInterval(BannerEffect.fnScroll, 5000);
		
		// 鼠標在按鈕移動或點擊按鈕
		$bannerPointSpan.off().on({
			mouseover: function() {
				clearInterval(autoScroll);
			},
			mouseout: function() {
				autoScroll = setInterval(BannerEffect.fnScroll, 5000);
			},
			click: function() {
				clearInterval(autoScroll);
				var cur = $bannerPointSpan.index(this),
				perCur = $bannerPointSpan.index($bannerPoint.find("span.cur"));
				cur != perCur && BannerEffect.fnShow(cur, perCur);
			}
		});
		
		// 鼠標再圖片上移動
		$bannerImg.off().on({
			mouseover: function() {
				clearInterval(autoScroll);
			},
			mouseout: function() {
				autoScroll = setInterval(BannerEffect.fnScroll, 5000);
			}
		});
	},
	
	// Banner圖片滾動 - 顯示效果
	fnShow: function(cur, perCur) {
		$("#mainBannerImg div").eq(perCur).removeClass("cur").hide().end()
			.eq(cur).addClass("cur").fadeIn("slow");
		$("#mainBannerPoint span").eq(perCur).removeClass("cur").end()
			.eq(cur).addClass("cur");
	},
	
    // Banner圖片滾動 - 自動切换
    fnScroll: function() {
    	var $bannerImg = $("#mainBannerImg div"),
			$bannerImgLen = $bannerImg.length,
			$bannerPoint = $("#mainBannerPoint"),
			$bannerPointSpan = $("#mainBannerPoint span"),
        	perCur = $bannerPointSpan.index($bannerPoint.find("span.cur")),
			cur = (perCur + 1) % $bannerImgLen;
			
		BannerEffect.fnShow(cur, perCur);
    }

};


	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description 精彩詞條效果（左右滾動）
*/
var BestwordEffect = {
	reset: function(){
		clearInterval(this.autoScroll);
		$("ul", "#bestwordContainer").css({
            "margin-left": -$("li", "#bestwordContainer").eq(0).outerWidth(true) + "px"
        });
		this.autoScroll = setInterval(BestwordEffect.fnScroll, 5000);
	},
	init: function() {
		var $bestword = $("#bestwordContainer"),
			$bestwordLen = $bestword.find("li").length,
			$bestwordLiWidth = $bestword.find("li").eq(0).outerWidth(true),
    		$bestwordUl = $bestword.find("ul"),
			c = 1,
			maxCounts = $bestwordUl.find("li").size() - 0;
			
		$bestword.find("ul").css("width", $bestwordLiWidth * $bestwordLen + "px");
		BestwordEffect.fnLastHtml(true);
		
		this.autoScroll = setInterval(BestwordEffect.fnScroll, 5000);
		
		// 鼠標移動或點擊下一頁按鈕
		$("#bestwordNavNext").off().on({
			mouseover: function() {
				clearInterval(this.autoScroll);
			},
			mouseout: function() {
				this.autoScroll = setInterval(BestwordEffect.fnScroll, 5000);
			},
			click: function() {
				clearInterval(this.autoScroll);
				BestwordEffect.fnScroll();
			}
		});
		
		// 鼠標移動或點擊上一頁按鈕
		$("#bestwordNavPrev").off().on({
			mouseover: function() {
				clearInterval(this.autoScroll);
			},
			mouseout: function() {
				this.autoScroll = setInterval(BestwordEffect.fnScroll, 5000);
			},
			click: function() {
				clearInterval(this.autoScroll);
				BestwordEffect.fnScroll({"prev": true});
			}
		});
		
		// 鼠標移到bestwordContainer效果
		$("#bestwordContainer").off().on({
			mouseover: function() {
				clearInterval(this.autoScroll);
			},
			mouseout: function() {
				this.autoScroll = setInterval(BestwordEffect.fnScroll, 5000);
			}
		});
	},
	
    // 精彩詞條滾動 - 自動切换
    fnScroll: function(args) {
    	var $bestword = $("#bestwordContainer"),
    		$bestwordUl = $bestword.find("ul"),
			$bestwordLiWidth = $bestword.find("li").eq(0).outerWidth(true),
			fAnimate = args && args.prev ? "+=" : "-=",
			sAnimate = args && args.prev ? "-=" : "+=",
			c = 1;
		$bestwordUl.stop(true, true).animate({
            left: fAnimate + $bestwordLiWidth
        }, 500, function() {
            $bestwordUl.stop(true, true).animate({
                left: sAnimate + $bestwordLiWidth
            }, 0);
            if(args && args.prev){
            	BestwordEffect.fnLastHtml();
            }else{
            	$bestwordUl.find("li:lt(" + c + ")").clone().appendTo($bestwordUl);
            	$bestwordUl.find("li:lt(" + c + ")").remove();
            }
        });
    },
	
    // 精彩詞條滾動 - 最後一個元素顯示
    fnLastHtml: function(init) {
    	var $bestword = $("#bestwordContainer"),
    		$bestwordUl = $bestword.find("ul"),
			maxCounts = $bestwordUl.find("li").size() - 0,
			$bestwordLiWidth = $bestword.find("li").eq(0).outerWidth(true),
			c = 1, html = "";
			
        $bestwordUl.find("li:gt(" + (maxCounts - c - 1) + ")").each(function() {
            html += "<li>" + $(this).html() + "</li>";
        });
        $bestwordUl.html(html + $bestwordUl.html());
        
        init && $bestwordUl.css({
            "margin-left": -$bestwordLiWidth + "px"
        });
        
        $bestwordUl.find("li:gt(" + (maxCounts - 1) + ")").remove();
    }
    
};



	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description 熱門詞條佈局
*/
var HotwordEffect = {
	init: function(args) {
		
		HotwordEffect.fnHotword.imgSize();
		HotwordEffect.fnHotword.load();
		
		HotwordEffect.fnHotwordBg(args);

		$("#hotwordContainer .hotword_block").off().on({
			mouseover : function() {
				!$(this).hasClass("noimg") && $(this).addClass("on");
			},
			mouseout : function() {
				!$(this).hasClass("noimg") && $(this).removeClass("on");
			}
		});
	},
	
	// 熱門詞條佈局 （格子布局）
	fnHotword: {
		imgSize: function(){
			var boxes = $("#hotwordContainer .hotword_block"),
				boxesLen = boxes.length,
				i = 0;
			while(i < boxesLen){
				var box = boxes.eq(i);
				if(box.find("img")){
					box.find("img").attr({
						"oW": box.find("img").outerWidth(true),
						"oH": box.find("img").outerHeight(true)
					});
				}
				i++;
			}
		},
		load: function () {
			this.size = [];   // 格子,[1,2]表示1X2的大格子
			this.obj = {};
			this.oArray = [];
			this.box = $("#hotwordContainer .hotword_block");
			this.boxBig = $("#hotwordContainer .big_box");
			this.offset = {
				width: this.box.eq(0).width() + 10,
				height: this.box.eq(0).height() + 10,
				y: -1,
				x: 0
			};
			var outerWidth = $("#hotwordContainer").outerWidth(true);
			this.row = Math.floor(outerWidth / this.offset.width);   // 每行标准格数
			
			// HotwordEffect.fnHotword.fnIfr();
			HotwordEffect.fnHotword.init();
		},
    	init: function () {
			var boxLen = this.box.length,
				boxBigLen = this.boxBig.length,
				i = 0, nx, ny;
			$("#hotwordContainer").width(this.row * this.offset.width);
			while(i < boxLen){
				if(boxBigLen > 0){
					var temBox = this.box.eq(i)[0];
					nx = Math.ceil(temBox.offsetWidth / this.offset.width);
					nx = (nx > this.row) ? this.row : nx; //大小超出限制
					ny = Math.ceil(temBox.offsetHeight / this.offset.height);
					this.size.push([nx, ny]);
				}else{
					this.size.push(1);
					// this.box.eq(i).css({
						// "width": this.offset.width - 10,
						// "height": this.offset.height - 10
					// });
					// !this.box.eq(i).hasClass("noimg") && this.box.eq(i).find(".hotword_block_des").css({
						// "width": this.offset.width - 10,
						// "height": this.offset.height - 10,
						// "line-height": this.offset.height - 10 - 3 + "px"
					// });
				}
				i++;
			}
			this.fnSort();
		},
		
		fnIfr: function () {
			var ifr = this.boxBig,
				ifrLen = ifr.length;
			if (ifr.length == 0){
				return false;
			}
			var i = 0;
			while (i < ifrLen) {
				// theifr = $("img", ifr.eq(i))[0];
				// nx = Math.ceil(theifr.offsetWidth / this.offset.width);   // bigBox横向占的块数
				// ny = Math.ceil(theifr.offsetHeight / this.offset.height);
				var theifr = $("img", ifr.eq(i)),
					nx = Math.ceil(theifr.attr("oW") / this.offset.width),   // bigBox横向占的块数
					ny = Math.ceil(theifr.attr("oH") / this.offset.height);
				
				if(nx > this.row){
					ifr.eq(i).css({
						"width": (nx > this.row) ? this.row * this.offset.width - 10 : nx * this.offset.width - 10,
					});
				}
				ifr.eq(i).css({
					"width": (nx > this.row) ? this.row * this.offset.width - 10 : nx * this.offset.width - 10,
					"height": ny * this.offset.height - 10
				});
				!this.box.eq(i).hasClass("noimg") && ifr.eq(i).find(".hotword_block_des").css({
					"width": (nx > this.row) ? this.row * this.offset.width - 10 : nx * this.offset.width - 10,
					"height": ny * this.offset.height - 10 + "px"
				});
				theifr.get(0) && theifr.css({
					"max-width": (nx > this.row) ? this.row * this.offset.width - 10 : nx * this.offset.width - 10,
					"max-height": ny * this.offset.height - 10
				});
				i++;
			}
		},
		
		fnSort: function () {
			var y = 0, x = 0, 
				temp = {
					x : Infinity,
					y : Infinity
				}, 
				flag = Infinity, name;
			for (var i = 0, sizeLen = this.size.length; i < sizeLen; i++) {
				if (flag == 0) {
					x = temp.x;
					y = temp.y;
				}
				flag--;
				if (x > this.row - 1) {   //换行
					x = 0;
					y++;
				}
				name = x + '_' + y;   //对象属性名（反映占领的格子）
				if (this.fnHasName(name)) {   //判断属性名是否存在
					i--;
					x++;
					if (flag < Infinity)
						flag = flag + 1;
					continue;
				}
				if (!this.size[i].length) {   //普通格子
					this.obj[name] = [x, y];   //项值（反映坐标值）
					x++;
				} else {//大格子
					if (this.fnOver(x, y, i)) {
						if (temp.y > y) {
							temp.y = y;
							temp.x = x;
						}
						if(temp.y < Infinity){
							flag = 1;
						};
						i--;
						x++;
						continue;
					}
					this.obj[name] = [x, y];
					this.fnApply(x, y, i);
					x += this.size[i][0];
				}
				if (flag == -1) {
					flag = Infinity;
					temp.y = Infinity;
					temp.x = Infinity;
				}
				var h = this.size[i][1] - 1 || 0;
				this.offset.y = (this.offset.y > y + h) ? this.offset.y : y + h;
			}
			for (var i in this.obj) {
				if (this.obj[i] === 0 || !this.obj.hasOwnProperty(i))
					continue;
				this.oArray.push(this.obj[i]);
			}
			this.fnPut(); 
		},
		
		//  判断属性名是否存在
		fnHasName: function(name) {
			return name in this.obj;
		},
		
		//  判断是否会重叠
		fnOver: function(x, y, n) {
			var name;
			if (x + this.size[n][0] > this.row){
				return true; //超出显示范围
			}
			for (var k = 1; k < this.size[n][1]; k++) {
				name = x + '_' + (y - 0 + k);
				if (this.fnHasName(name)) {
					return true;
				} //左侧一列有无重叠
			}
			for ( k = 1; k < this.size[n][0]; k++) {
				name = (x - 0 + k) + '_' + y;
				if (this.fnHasName(name)) {
					return true;
				} //上侧一行有无重叠
			}
			return false;
		},
		
		// 大格子中多占的位置
		fnApply: function(x, y, n) {
			var posX = x,    //大格子左上角位置
				posY = y;
			for (var t = 0; t < this.size[n][0]; t++) {
				for (var k = 0; k < this.size[n][1]; k++) {
					name = (posX + t) + '_' + (posY + k);
					if (t == 0 && k == 0) {
						continue;
					}
					this.obj[name] = 0;   //多占的格子无坐标值
				}
			}
		},
		
		fnPut: function() {
			var x, y;
			for (var i = 0; i < this.oArray.length; i++) {
				x = this.offset.width * this.oArray[i][0];
				y = this.offset.height * this.oArray[i][1];
				this.box.eq(i).css({
					"position": "absolute",
					"left": x,
					"top": y
				});
			}
			$("#hotwordContainer").height(this.offset.height * (this.offset.y + 1));
		}
    },
	
    // 熱門詞條佈局 - 隨機動態顏色
    fnHotwordBg: function (args) {
		var $hotwordContainer = $("#hotwordContainer"), 
			$hotwordBlock = $("#hotwordContainer .hotword_block"), 
			$hotwordBlockLen = $hotwordBlock.length, 
			arrBgColor = args.arrBgColor, 
			arrBgColorLen = arrBgColor.length;

		for (var i = 0; i < $hotwordBlockLen; i++) {
			var colorNum = Math.floor(Math.random() * arrBgColorLen);
			$hotwordBlock.eq(i).hasClass("noimg") && $hotwordBlock.eq(i).css("background-color", arrBgColor[colorNum]);
		}
	}
};



	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description 詳細頁導航條
*/
var Detail = {
	init: function(args) {
		Detail.init();
	},
	
	init: function() {
		var $slide = $("#sideCatalog_catalog"),
			$slideInner = $("#sideCatalog_catalog dl"),
			$slideDown = $("#sideCatalog_down"),
			$slideUp = $("#sideCatalog_up");
			
		// 點擊向下的按鈕
		$slideDown.off().on({
			click: function() {
				var $slideOutHeight = $slide.height(),
					$slideInnerHeight = $slideInner.height(),
					enableTop = $slideInner.height() - $slide.height(),
					step = 50;
				if ($(this).hasClass("ui_sidecatalog_down_enable")) {
					if ((enableTop - Math.abs( parseInt( $slideInner.css('top') ) ) ) > step) {
						$slideInner.stop().animate({
							"top" : "-=" + step
						}, "fast");
						$slideUp.removeClass("ui_sidecatalog_up_disable").addClass("ui_sidecatalog_up_enable");
					} else {
						$slideInner.stop().animate({
							"top" : -enableTop
						}, "fast");
						$(this).removeClass("ui_sidecatalog_down_enable").addClass("ui_sidecatalog_down_disable");
					}
				} else {
					return false;
				}
			}
		});
		
		// 點擊向上的按鈕
		$slideUp.off().on({
			click: function() {
				var $slideOutHeight = $slide.height(),
					$slideInnerHeight = $slideInner.height(),
					enableTop = $slideInner.height() - $slide.height(),
					step = 50;
				if ($(this).hasClass("ui_sidecatalog_up_enable")) {
					if (Math.abs(parseInt($slideInner.css("top"))) > step) {
						$slideInner.stop().animate({
							"top" : "+=" + step
						}, "fast");
						$slideDown.removeClass("ui_sidecatalog_down_disable").addClass("ui_sidecatalog_down_enable");
					} else {
						$slideInner.stop().animate({
							"top" : "0"
						}, "fast");
						$(this).removeClass("ui_sidecatalog_up_enable").addClass("ui_sidecatalog_up_disable");
					}
				} else {
					return false;
				}
			}
		});
		
		// 點擊導航的各個目錄
		$slideInner.delegate("dd", "click", Detail.fnCatalogClick);
		
		// 點擊目錄的各個目錄
		$("#detail_catalog a").off().on("click", Detail.fnCatalogClick);
		
		//显示隐藏目录
		$("#sideCatalogBtn").bind("click", function(e) {
			if($(this).hasClass("ui_sidecatalog_btn_disable")){
				$("#sideCatalog").css("visibility","visible");
				
				$(this).removeClass("ui_sidecatalog_btn_disable");
			}else{
				$("#sideCatalog").css("visibility","hidden");
				$(this).addClass("ui_sidecatalog_btn_disable");
			}
		});
		
		//滚到顶部
		$("#sideToolbar_up").off().on("click", Com.fnGoTop);
	},
	
	fnCatalogClick: function() {
		var $this = $(this),
			index = $this.index();
		
		Detail.fnScrollSlide($this, index);
		
		var dd = $this.hasClass("btn_sidecatalog") ? $this.find("a") : $this,
			ddId = dd.stop().attr("href").substring(1),
			windowTop = $("div[name='" + ddId + "']").offset().top;
			
		Com.fnGoTop(windowTop - 45);
		
		$(this).addClass("heightlight").siblings("dd").removeClass("heightlight");
	},
	
	// 导航滾動
	fnScrollSlide: function(that, index) {
		var $slide = $("#sideCatalog_catalog"),
			$slideInner = $("#sideCatalog_catalog dl"),
			$slideDown = $("#sideCatalog_down"),
			$slideUp = $("#sideCatalog_up");
		
		if (index < 5) {
			$slideInner.stop().animate({
				"top" : "0"
			}, "fast");
			$slideDown.removeClass("ui_sidecatalog_down_disable").addClass("ui_sidecatalog_down_enable");
			$slideUp.removeClass("ui_sidecatalog_up_enable").addClass("ui_sidecatalog_up_disable");
		} else if (index > 11) {
			$slideInner.stop().animate({
				"top" : -enableTop
			}, "fast");
			$slideDown.removeClass("ui_sidecatalog_down_enable").addClass("ui_sidecatalog_down_disable");
			$slideUp.removeClass("ui_sidecatalog_up_disable").addClass("ui_sidecatalog_up_enable");
		} else {
			var slideOutHeight = $slide.height();
			var dlTop = parseInt($slideInner.css("top")) + slideOutHeight / 2 - (that.offset().top - $(document).scrollTop());
			$slideInner.stop().animate({
				"top" : dlTop
			}, "fast");
			$slideDown.removeClass("ui_sidecatalog_down_disable").addClass("ui_sidecatalog_down_enable");
			$slideUp.removeClass("ui_sidecatalog_up_disable").addClass("ui_sidecatalog_up_enable");
		}
	},
	
	fnShowSideToolbar: function() {
		if($(document).scrollTop() >= ($(".detail_info").eq(0).offset().top - 44) && $(document).width() > 870){
			$("#sideToolbar").show();
		} else {
			$("#sideToolbar").hide();
		}
	},
	
	fnScroll: function() {
		var len = $(".detail_info").length;
		for (var i = len - 1; i >= 0; i--) {
			if ($(document).scrollTop() >= ($(".detail_info").eq(i).offset().top - $(".detail_info").eq(i).height() - 44)) {
				var index = i;
				$("#sideCatalog_catalog dl dd").eq(index).addClass("heightlight").siblings("dd").removeClass("heightlight");
				Detail.fnScrollSlide($("#sideCatalog_catalog dl dd").eq(index), index);
				return false;
			} else {
				$("#sideCatalog_catalog dl dd").eq(0).addClass("heightlight").siblings("dd").removeClass("heightlight");
			}
		}
	}
};


	
/**
*@author VickyHuang
*@param {Object} options include: 
*@description 會員中心
*/
var Members = {
	
	init: function(args) {
		// 鼠標移動效果
		var notOnLi = $("#member_sidebar .member_sidebar_block li").not(".on");
		notOnLi.off().on({
			mouseover: function() {
				$(this).addClass("on");
			},
			mouseout: function() {
				$(this).removeClass("on");
			}
		});
	}

};
