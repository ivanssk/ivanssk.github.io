(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



(lib._1_copy1 = function() {
	this.initialize(img._1_copy1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._1_copy2 = function() {
	this.initialize(img._1_copy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._2_copy = function() {
	this.initialize(img._2_copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._3_copy = function() {
	this.initialize(img._3_copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._3_copy_1 = function() {
	this.initialize(img._3_copy_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._5_copy1 = function() {
	this.initialize(img._5_copy1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._5_copy2 = function() {
	this.initialize(img._5_copy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._5_copy3 = function() {
	this.initialize(img._5_copy3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._5_logo = function() {
	this.initialize(img._5_logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib._5_title = function() {
	this.initialize(img._5_title);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.cta = function() {
	this.initialize(img.cta);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.divider = function() {
	this.initialize(img.divider);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.logo = function() {
	this.initialize(img.logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.round1 = function() {
	this.initialize(img.round1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,322,322);


(lib.round2 = function() {
	this.initialize(img.round2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,322,322);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.round2();
	this.instance.parent = this;
	this.instance.setTransform(-161,-161);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-161,-161,322,322);


(lib.round1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.round1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.round1_1, new cjs.Rectangle(0,0,322,322), null);


(lib.logo_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.logo();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.logo_1, new cjs.Rectangle(0,0,300,250), null);


(lib.divider_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.divider();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.divider_1, new cjs.Rectangle(0,0,300,250), null);


(lib.bg_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.bg();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.bg_1, new cjs.Rectangle(0,0,300,250), null);


(lib._5title = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._5_title();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5title, new cjs.Rectangle(0,0,300,250), null);


(lib._5logo = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._5_logo();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5logo, new cjs.Rectangle(0,0,300,250), null);


(lib._5cta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.cta();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5cta, new cjs.Rectangle(0,0,300,250), null);


(lib._5copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._5_copy3();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5copy3, new cjs.Rectangle(0,0,300,250), null);


(lib._5copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._5_copy2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5copy2, new cjs.Rectangle(0,0,300,250), null);


(lib._5copy1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._5_copy1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5copy1, new cjs.Rectangle(0,0,300,250), null);


(lib._5copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib._3_copy_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._5copy, new cjs.Rectangle(0,0,300,250), null);


(lib._3copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._3_copy();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._3copy, new cjs.Rectangle(0,0,300,250), null);


(lib._2copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._2_copy();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._2copy, new cjs.Rectangle(0,0,300,250), null);


(lib._1copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1_copy2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._1copy2, new cjs.Rectangle(0,0,300,250), null);


(lib._1copy1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1_copy1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._1copy1, new cjs.Rectangle(0,0,300,250), null);


(lib.imgholder1 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_5 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(5).call(this.frame_5).wait(1));

	// round
	this.instance = new lib.round1_1();
	this.instance.parent = this;
	this.instance.setTransform(151,155.2,1,1,0,0,0,161,161);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-5.8,322,322);


(lib.image2holder = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._3copy();
	this.instance.parent = this;
	this.instance.setTransform(150,125,1,1,0,0,0,150,125);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.image2holder, new cjs.Rectangle(0,0,300,250), null);


(lib._3guy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

	// round
	this.instance = new lib.Tween1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(151,186);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,0,322,347);


// stage content:
(lib.index = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		canvas.addEventListener("click", ft_clickThroughHandler.bind(this));
		
		// set click handler for click through functionality
		function ft_clickThroughHandler(){
			// Flashtalking api clickTag method - required for tracking click through and passing destination url
			// Reference documentation: http://www.flashtalking.net/helpSystem/EN/HTML5/jsDocs/classes/FT.html#method_clickTag
			myFT.clickTag(1);	
			
			// you can insert additional code to be executed in your creative file on click through below
		}
	}
	this.frame_361 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(361).call(this.frame_361).wait(7));

	// 5_cta.png
	this.instance = new lib._5cta();
	this.instance.parent = this;
	this.instance.setTransform(150,125,1,1,0,0,0,150,125);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(342).to({_off:false},0).to({alpha:1},19,cjs.Ease.quadOut).wait(7));

	// 5_logo.png
	this.instance_1 = new lib._5logo();
	this.instance_1.parent = this;
	this.instance_1.setTransform(150,125,0.95,0.95,0,0,0,150,125);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(313).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},14,cjs.Ease.quadOut).to({_off:true},35).wait(6));

	// 5_title.png
	this.instance_2 = new lib._5title();
	this.instance_2.parent = this;
	this.instance_2.setTransform(150,115,1,1,0,0,0,150,125);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(322).to({_off:false},0).to({y:125,alpha:1},14,cjs.Ease.quadOut).to({_off:true},26).wait(6));

	// 5_copy.png
	this.instance_3 = new lib._5copy();
	this.instance_3.parent = this;
	this.instance_3.setTransform(150,138,1,1,0,0,0,150,125);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(332).to({_off:false},0).to({y:135,alpha:1},14,cjs.Ease.quadOut).to({_off:true},16).wait(6));

	// 5_copy3.png
	this.instance_4 = new lib._5copy3();
	this.instance_4.parent = this;
	this.instance_4.setTransform(151,115,1,1,0,0,0,150,125);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(263).to({_off:false},0).to({y:125,alpha:1},16,cjs.Ease.quadOut).wait(29).to({alpha:0},4).to({_off:true},1).wait(55));

	// 5_copy2.png
	this.instance_5 = new lib._5copy2();
	this.instance_5.parent = this;
	this.instance_5.setTransform(151,115,1,1,0,0,0,150,125);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(258).to({_off:false},0).to({y:125,alpha:1},16,cjs.Ease.quadOut).wait(34).to({alpha:0},4).to({_off:true},1).wait(55));

	// 5_copy1.png
	this.instance_6 = new lib._5copy1();
	this.instance_6.parent = this;
	this.instance_6.setTransform(151,115,1,1,0,0,0,150,125);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(253).to({_off:false},0).to({y:125,alpha:1},16,cjs.Ease.quadOut).wait(39).to({alpha:0},4).to({_off:true},1).wait(55));

	// 3_guy.jpg
	this.instance_7 = new lib._3guy();
	this.instance_7.parent = this;
	this.instance_7.setTransform(151.1,25,1.44,1.44,0,0,0,150.1,125);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(179).to({_off:false},0).wait(1).to({regX:151,regY:186,scaleX:1.43,scaleY:1.43,x:152.4,y:112.6},0).wait(1).to({scaleX:1.41,scaleY:1.41,y:112.3},0).wait(1).to({scaleX:1.4,scaleY:1.4,y:112},0).wait(1).to({scaleX:1.39,scaleY:1.39,y:111.6},0).wait(1).to({scaleX:1.37,scaleY:1.37,y:111.3},0).wait(1).to({scaleX:1.35,scaleY:1.35,x:152.3,y:110.9},0).wait(1).to({scaleX:1.34,scaleY:1.34,y:110.5},0).wait(1).to({scaleX:1.32,scaleY:1.32,y:110.1},0).wait(1).to({scaleX:1.29,scaleY:1.29,y:109.6},0).wait(1).to({scaleX:1.27,scaleY:1.27,y:109},0).wait(1).to({scaleX:1.24,scaleY:1.24,x:152.2,y:108.4},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:107.6},0).wait(1).to({scaleX:1.17,scaleY:1.17,y:106.7},0).wait(1).to({scaleX:1.13,scaleY:1.13,x:152.1,y:105.8},0).wait(1).to({scaleX:1.08,scaleY:1.08,y:104.7},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:152,y:103.5},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:151.9,y:102.2},0).wait(1).to({scaleX:0.91,scaleY:0.91,y:100.8},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:151.8,y:99.3},0).wait(1).to({scaleX:0.78,scaleY:0.78,x:151.7,y:97.8},0).wait(1).to({scaleX:0.71,scaleY:0.71,y:96.3},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:151.6,y:94.7},0).wait(1).to({scaleX:0.57,scaleY:0.57,x:151.5,y:93.1},0).wait(1).to({regX:150,regY:125,scaleX:0.5,scaleY:0.5,x:151,y:61},0).wait(1).to({regX:151,regY:186,x:151.5,y:91.5},0).wait(44).to({regX:150,regY:125,x:151,y:61},0).wait(1).to({regX:151,regY:186,x:151.5,y:91.5,alpha:0.729},0).wait(1).to({alpha:0.495},0).wait(1).to({alpha:0.296},0).wait(1).to({alpha:0.132},0).wait(1).to({regX:150,regY:125,x:151,y:61,alpha:0},0).to({_off:true},1).wait(114));

	// 3_copy.jpg
	this.instance_8 = new lib.image2holder();
	this.instance_8.parent = this;
	this.instance_8.setTransform(151,125,1,1,0,0,0,150,125);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(199).to({_off:false},0).to({alpha:1},4).wait(45).to({alpha:0},5).to({_off:true},1).wait(114));

	// 2_guy.jpg
	this.instance_9 = new lib.imgholder1();
	this.instance_9.parent = this;
	this.instance_9.setTransform(151.1,125,1.44,1.44,0,0,0,150.1,125);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(104).to({_off:false},0).wait(1).to({regX:151,regY:155.2,scaleX:1.43,scaleY:1.43,x:152.4,y:167.5},0).wait(1).to({scaleX:1.41,scaleY:1.41,y:166.4},0).wait(1).to({scaleX:1.4,scaleY:1.4,y:165.3},0).wait(1).to({scaleX:1.39,scaleY:1.39,y:164.1},0).wait(1).to({scaleX:1.37,scaleY:1.37,y:162.8},0).wait(1).to({scaleX:1.35,scaleY:1.35,x:152.3,y:161.5},0).wait(1).to({scaleX:1.34,scaleY:1.34,y:160},0).wait(1).to({scaleX:1.32,scaleY:1.32,y:158.3},0).wait(1).to({scaleX:1.29,scaleY:1.29,y:156.5},0).wait(1).to({scaleX:1.27,scaleY:1.27,y:154.4},0).wait(1).to({scaleX:1.24,scaleY:1.24,x:152.2,y:152.1},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:149.4},0).wait(1).to({scaleX:1.17,scaleY:1.17,y:146.3},0).wait(1).to({scaleX:1.13,scaleY:1.13,x:152.1,y:142.8},0).wait(1).to({scaleX:1.08,scaleY:1.08,y:138.8},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:152,y:134.4},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:151.9,y:129.7},0).wait(1).to({scaleX:0.91,scaleY:0.91,y:124.6},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:151.8,y:119.4},0).wait(1).to({scaleX:0.78,scaleY:0.78,x:151.7,y:113.9},0).wait(1).to({scaleX:0.71,scaleY:0.71,y:108.3},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:151.6,y:102.6},0).wait(1).to({scaleX:0.57,scaleY:0.57,x:151.5,y:96.9},0).wait(1).to({regX:150,regY:124.9,scaleX:0.5,scaleY:0.5,x:151,y:76},0).wait(1).to({regX:151,regY:155.2,x:151.5,y:91.2},0).wait(44).to({regX:150,regY:124.9,x:151,y:76},0).wait(1).to({regX:151,regY:155.2,x:151.5,y:91.2,alpha:0.729},0).wait(1).to({alpha:0.495},0).wait(1).to({alpha:0.296},0).wait(1).to({alpha:0.132},0).wait(1).to({regX:150,regY:124.9,x:151,y:76,alpha:0},0).to({_off:true},1).wait(189));

	// 2_copy.jpg
	this.instance_10 = new lib._2copy();
	this.instance_10.parent = this;
	this.instance_10.setTransform(151,125,1,1,0,0,0,150,125);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(124).to({_off:false},0).to({alpha:1},4).wait(45).to({alpha:0},5).to({_off:true},1).wait(189));

	// 1_copy2.png
	this.instance_11 = new lib._1copy2();
	this.instance_11.parent = this;
	this.instance_11.setTransform(151,115,1,1,0,0,0,150,125);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(49).to({_off:false},0).to({y:125,alpha:1},17,cjs.Ease.quadOut).wait(33).to({alpha:0},4).to({_off:true},259).wait(6));

	// 1_copy1.png
	this.instance_12 = new lib._1copy1();
	this.instance_12.parent = this;
	this.instance_12.setTransform(151,115,1,1,0,0,0,150,125);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(42).to({_off:false},0).to({y:125,alpha:1},17,cjs.Ease.quadOut).wait(40).to({alpha:0},4).to({_off:true},259).wait(6));

	// divider.png
	this.instance_13 = new lib.divider_1();
	this.instance_13.parent = this;
	this.instance_13.setTransform(151,125,1,1,0,0,0,150,125);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(42).to({_off:false},0).to({alpha:1},3).wait(54).to({alpha:0},4).to({_off:true},1).wait(150).to({_off:false,y:150},0).to({alpha:1},5).wait(49).to({alpha:0},4).to({y:106},10).to({alpha:1},5).to({_off:true},35).wait(6));

	// logo.png
	this.instance_14 = new lib.logo_1();
	this.instance_14.parent = this;
	this.instance_14.setTransform(151.1,125,0.95,0.95,0,0,0,150.1,125);
	this.instance_14.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({regX:150,scaleX:1,scaleY:1,x:150,alpha:1},13,cjs.Ease.quadOut).wait(23).to({alpha:0},4).to({_off:true},1).wait(327));

	// bg.jpg
	this.instance_15 = new lib.bg_1();
	this.instance_15.parent = this;
	this.instance_15.setTransform(150,125,1,1,0,0,0,150,125);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({_off:true},362).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(150,125,300,250);
// library properties:
lib.properties = {
	id: '1950E9D845B043AB8BB96BF2DAFCE2CB',
	width: 300,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_1_copy1.png", id:"_1_copy1"},
		{src:"images/_1_copy2.png", id:"_1_copy2"},
		{src:"images/_2_copy.png", id:"_2_copy"},
		{src:"images/_3_copy.png", id:"_3_copy"},
		{src:"images/_3_copy_1.png", id:"_3_copy_1"},
		{src:"images/_5_copy1.png", id:"_5_copy1"},
		{src:"images/_5_copy2.png", id:"_5_copy2"},
		{src:"images/_5_copy3.png", id:"_5_copy3"},
		{src:"images/_5_logo.png", id:"_5_logo"},
		{src:"images/_5_title.png", id:"_5_title"},
		{src:"images/bg.jpg", id:"bg"},
		{src:"images/cta.png", id:"cta"},
		{src:"images/divider.png", id:"divider"},
		{src:"images/logo.png", id:"logo"},
		{src:"images/round1.png", id:"round1"},
		{src:"images/round2.png", id:"round2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['1950E9D845B043AB8BB96BF2DAFCE2CB'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;