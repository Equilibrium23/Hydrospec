/* --------------------------------------------------
 * © Copyright 2019 - Bolo by Designesia
 * --------------------------------------------------*/
(function($) {	
	'use strict';
	
	/* --------------------------------------------------
	 * template options (customable)
	 * --------------------------------------------------*/
	
	var de_boxed_style = 0; // 1 - on, 0 - off
	var de_header_style = 2; // 1 - solid, 2 - transparent
	var de_header_color = 1; // 1 - dark, - 2 light
	var de_header_color_scroll = 2; // 1 - dark, - 2 light
	var de_menu_separator = 0; // 1 - dotted, 2 - border, 3 - circle, 4 - square, 5 - plus, 6 - strip, 7 - heart, 0 - none
	var	smoothscroll = 0;
	
	/* --------------------------------------------------
	 * predefined vars
	 * --------------------------------------------------*/
	var mobile_menu_show = 0;
	var v_count = '0';
	var mb;
	var instances = [];
	var $window = $(window);
	var pf_open = 0;
	var header_height_init = "70px";

	/* --------------------------------------------------
	 * header | style
	 * --------------------------------------------------*/
	function header_styles() {
		if (de_header_style == 2) {
			$('header').addClass('transparent')
		}
		if (de_menu_separator == 2) {
			$('#mainmenu').addClass('line-separator');
		} else if (de_menu_separator == 3) {
			$('#mainmenu').addClass('circle-separator');
		} else if (de_menu_separator == 4) {
			$('#mainmenu').addClass('square-separator');
		} else if (de_menu_separator == 5) {
			$('#mainmenu').addClass('plus-separator');
		} else if (de_menu_separator == 6) {
			$('#mainmenu').addClass('strip-separator');
		} else if (de_menu_separator == 7) {
			$('#mainmenu').addClass('heart-separator');
		} else if (de_menu_separator == 0) {
			$('#mainmenu').addClass('no-separator');
		}
		if (de_header_color == 2) {
			$('header').addClass('header-light');
		}
		if (de_header_color_scroll == 2) {
			if(!$('header').hasClass('scroll-dark')){
				$('header').addClass('scroll-light');
			}
		}
		if (de_boxed_style == 1) {
			$('body').addClass('boxed');
		}
	}
	/* --------------------------------------------------
	 * header | sticky
	 * --------------------------------------------------*/
	function header_sticky() {
		jQuery("header").addClass("clone", 1000, "easeOutBounce");
		var $document = $(document);
		var vscroll = 0;
		if ($document.scrollTop() >= 50 && vscroll == 0) {
			jQuery("header.autoshow").removeClass("scrollOff");
			jQuery("header.autoshow").addClass("scrollOn");
			jQuery("header.autoshow").css("height", "auto");
			vscroll = 1;
		} else {
			jQuery("header.autoshow").removeClass("scrollOn");
			jQuery("header.autoshow").addClass("scrollOff");
			vscroll = 0;
		}
	}
	/* --------------------------------------------------
	 * plugin | magnificPopup
	 * --------------------------------------------------*/
	function load_magnificPopup() {
		jQuery('.simple-ajax-popup-align-top').magnificPopup({
			type: 'ajax',
			alignTop: true,
			overflowY: 'scroll'
		});
		jQuery('.simple-ajax-popup').magnificPopup({
			type: 'ajax',
			mainClass: 'mfp-fade',
			removalDelay: 160,
		});
		// zoom gallery
		jQuery('.zoom-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title');
					//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('img');
				}
			}
		});
		// popup youtube, video, gmaps
		jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
		// image popup
		$('.image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			
			image: {
				verticalFit: true
			}
		});
		$('.image-popup-vertical-fit').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'mfp-img-mobile',
			image: {
				verticalFit: true
			}
		});
		$('.image-popup-fit-width').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			image: {
				verticalFit: false
			}
		});
		$('.image-popup-no-margins').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300 // don't foget to change the duration also in CSS
			}
		});
		$('.image-popup-gallery').magnificPopup({
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title');
					//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			gallery: {
				enabled: true
			}
		});
		$('.images-group').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
				delegate: 'a', // the selector for gallery item
				type: 'image',
				gallery: {
				  enabled:true
				}
			});
		});
		
		$('.images-popup').magnificPopup({
		  delegate: 'a', // child items selector, by clicking on it popup will open
		  type: 'image'
		  // other options
		});
	}
	/* --------------------------------------------------
	 * plugin | enquire.js
	 * --------------------------------------------------*/
	function init_resize() {
		enquire.register("screen and (min-width: 993px)", {
			match: function() {
				jQuery('#mainmenu').show();
				mobile_menu_show = 1;
			},
			unmatch: function() {
				jQuery('#mainmenu').hide();
				mobile_menu_show = 0;
				jQuery("#menu-btn").show();
			}
		});
		enquire.register("screen and (max-width: 993px)", {
			match: function() {
				$('header').addClass("header-mobile");
			},
			unmatch: function() {
				$('header').removeClass("header-mobile");
				$('header').css("height",header_height_init)
			}
		});
		init();
		init_de();
		video_autosize();
		var $container = jQuery('#gallery');
		$container.isotope({
			itemSelector: '.item',
			filter: '*'
		});
		jQuery('#gallery').isotope('reLayout');
		$('header').removeClass('smaller');
		$('header').removeClass('logo-smaller');
		$('header').removeClass('clone');
		
		var mx = window.matchMedia("(max-width: 992px)");
			if (mx.matches) {
				jQuery('.owl-slide-wrapper').find("img").css("height",$(window).innerHeight());
				jQuery('.owl-slide-wrapper').find("img").css("width","auto");
			}else{
				jQuery('.owl-slide-wrapper').find("img").css("width","100%");
				jQuery('.owl-slide-wrapper').find("img").css("height","auto");
			}
	};
	/* --------------------------------------------------
	 * plugin | owl carousel
	 * --------------------------------------------------*/
	function load_owl() {
		
		jQuery("#ss-carousel").owlCarousel({
            center: true,
			items:4,
			loop:true,
			margin:100,
			responsive:{
				1000:{
					items:4
				},
				600:{
					items:3
				},
				0:{
					items:2
				}
			}
         });
		 
		 jQuery("#project-carousel").owlCarousel({
            center: true,
			items:2,
			loop:true,
			margin:100,
			responsive:{
				1000:{
					items:2
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
         });
		
		jQuery("#blog-carousel").owlCarousel({
            center: false,
			items:3,
			loop:true,
			margin:30,
			responsive:{
				1000:{
					items:3
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
         });

		jQuery(".text-slider").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			mouseDrag: false,
			touchDrag: false,
			autoPlay: 2500,
			transitionStyle: "goDown"
		});
		jQuery(".blog-slide").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			autoPlay: false
		});
		jQuery(".project-slide").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			autoPlay: false,
			mouseDrag: false,
			touchDrag: true,
			transitionStyle: "fade"
		});
		jQuery(".testimonial-list").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: true,
			autoPlay: true,
			mouseDrag: false,
			mouseDrag: false,
			touchDrag: true,
			transitionStyle: "fade"
		});
		
		jQuery("#custom-owl-slider").owlCarousel({
			items:1,
			autoplay:true,
			autoplayTimeout:4000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			loop:true,
			margin:0,
         });
		
		jQuery(".owl-sponsors").owlCarousel({
            center: false,
			items:5,
			loop:true,
			margin:30,
			responsive:{
				1000:{
					items:5
				},
				600:{
					items:3
				},
				0:{
					items:2
				}
			}
         });
		 
		 
		 jQuery("#owl-logo-4").owlCarousel({
            center: false,
			items:4,
			loop:true,
			dots: false,
			margin:10,
			autoplay:true,
			autoplayTimeout:2000,
			responsive:{
				1000:{
					items:4
				},
				600:{
					items:3
				},
				0:{
					items:3
				}
			}
         });

		
		// Custom Navigation owlCarousel
		$(".next").on("click", function() {
			$(this).parent().parent().find('.blog-slide').trigger('owl.next');
		});
		$(".prev").on("click", function() {
			$(this).parent().parent().find('.blog-slide').trigger('owl.prev');
		});
		
		jQuery('.owl-custom-nav').each(function() {
			var owl = $('.owl-custom-nav').next();
			var ow = parseInt(owl.css("height"), 10);
			$(this).css("margin-top", (ow / 2) - 25);
			owl.owlCarousel();
			// Custom Navigation Events
			$(".btn-next").on("click", function() {
				owl.trigger('owl.next');
			});
			$(".btn-prev").on("click", function() {
				owl.trigger('owl.prev');
			});
		});
		
		
		// custom navigation for slider
			var ows = $('#custom-owl-slider');
			var arr = $('.owl-slider-nav');
			var doc_height = $(window).innerHeight();
			arr.css("top", (doc_height / 2) - 25);
			ows.owlCarousel();
			// Custom Navigation Events
			arr.find(".next").on("click", function() {
				ows.trigger('next.owl.carousel');
			});
			arr.find(".prev").on("click", function() {
				ows.trigger('prev.owl.carousel');
			});
			
			jQuery(".owl-slide-wrapper").on("mouseenter", function() {
				arr.find(".next").css("right","40px");
				arr.find(".prev").css("left","40px");
			}).on("mouseleave", function() {
				arr.find(".next").css("right","-50px");
				arr.find(".prev").css("left","-50px");
			})
	}
	
	
	/* --------------------------------------------------
	 * back to top
	 * --------------------------------------------------*/
	var scrollTrigger = 500; // px
	var t = 0;
	function backToTop() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > scrollTrigger) {
			$('#back-to-top').addClass('show');
			$('#back-to-top').removeClass('hide');
			t = 1;
		}
		
		if (scrollTop < scrollTrigger && t==1) {
			$('#back-to-top').addClass('hide');
		}
		
		$('#back-to-top').on('click', function(e) {
			e.preventDefault();
			$('html,body').stop(true).animate({
				scrollTop: 0
			}, 700);
		});
	};
	/* --------------------------------------------------
	 * plugin | scroll to
	 * --------------------------------------------------*/
	/*!
	 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
	 * Scroll smooth to any element in your DOM.
	 *
	 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
	 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
	 * 2013/02/17
	 **/
	$.scrollTo = $.fn.scrollTo = function(x, y, options){
		var space = 69;
		
		$(function(){
			var mx = window.matchMedia("(max-width: 992px)");
			if (mx.matches) {
				space = 0;
			}
		});
		
		if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

		options = $.extend({}, {
			gap: {
				x: 0,
				y: 0
			},
			animation: {
				easing: 'easeInOutExpo',
				duration: 600,
				complete: $.noop,
				step: $.noop
			}
		}, options);

		return this.each(function(){
			var elem = $(this);
			elem.stop().animate({
				scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
				scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - space // *edited
			}, options.animation);
		});
	};
	/* --------------------------------------------------
	 * counting number
	 * --------------------------------------------------*/
	function de_counter() {
		jQuery('.timer').each(function() {
			var imagePos = jQuery(this).offset().top;
			var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow + jQuery(window).height() && v_count == '0') {
				jQuery(function($) {
					// start all the timers
					jQuery('.timer').each(count);

					function count(options) {
						v_count = '1';
						var $this = jQuery(this);
						options = $.extend({}, options || {}, $this.data('countToOptions') || {});
						$this.countTo(options);
					}
				});
			}
		});
	}
	/* --------------------------------------------------
	 * progress bar
	 * --------------------------------------------------*/
	function de_progress() {
		jQuery('.de-progress').each(function() {
			var pos_y = jQuery(this).offset().top;
			var value = jQuery(this).find(".progress-bar").attr('data-value');
			var topOfWindow = jQuery(window).scrollTop();
			if (pos_y < topOfWindow + 500) {
				jQuery(this).find(".progress-bar").css({
					'width': value
				}, "slow");
			}
		});
	}
	/* --------------------------------------------------
	 * progress bar
	 * --------------------------------------------------*/

	function text_rotate(){
    var quotes = $(".text-rotate-wrap .text-item");
    var quoteIndex = -1;
    
    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(1)
            .delay(1500)
            .fadeOut(1, showNextQuote);
    }
    
    showNextQuote();
    
	};
	/* --------------------------------------------------
	 * custom background
	 * --------------------------------------------------*/
	function custom_bg() {
		$("div,section").css('background-color', function() {
			return jQuery(this).data('bgcolor');
		});
		$("div,section").css('background-image', function() {
			return jQuery(this).data('bgimage');
		});
		$("div,section").css('background-size', function() {
			return 'cover';
		});
	}
	/* --------------------------------------------------
	 * custom elements
	 * --------------------------------------------------*/
	function custom_elements() {
		// --------------------------------------------------
		// tabs
		// --------------------------------------------------
		jQuery('.de_tab').find('.de_tab_content > div').hide();
		jQuery('.de_tab').find('.de_tab_content > div:first').show();
		jQuery('li').find('.v-border').fadeTo(150, 0);
		jQuery('li.active').find('.v-border').fadeTo(150, 1);
		jQuery('.de_nav li').on("click", function() {
			jQuery(this).parent().find('li').removeClass("active");
			jQuery(this).addClass("active");
			jQuery(this).parent().parent().find('.v-border').fadeTo(150, 0);
			jQuery(this).parent().parent().find('.de_tab_content > div').hide();
			var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
			jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
			jQuery(this).find('.v-border').fadeTo(150, 1);
		});
		// request quote function
		var rq_step = 1;
		jQuery('#request_form .btn-right').on("click", function() {
			var rq_name = $('#rq_name').val();
			var rq_email = $('#rq_email').val();
			var rq_phone = $('#rq_phone').val();
			if (rq_step == 1) {
				if (rq_name.length == 0) {
					$('#rq_name').addClass("error_input");
				} else {
					$('#rq_name').removeClass("error_input");
				}
				if (rq_email.length == 0) {
					$('#rq_email').addClass("error_input");
				} else {
					$('#rq_email').removeClass("error_input");
				}
				if (rq_phone.length == 0) {
					$('#rq_phone').addClass("error_input");
				} else {
					$('#rq_phone').removeClass("error_input");
				}
			}
			if (rq_name.length != 0 && rq_email.length != 0 && rq_phone.length != 0) {
				jQuery("#rq_step_1").hide();
				jQuery("#rq_step_2").fadeIn();
			}
		});
		// --------------------------------------------------
		// tabs
		// --------------------------------------------------
		jQuery('.de_review').find('.de_tab_content > div').hide();
		jQuery('.de_review').find('.de_tab_content > div:first').show();
		//jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
		jQuery('.de_review').find('.de_nav li:first').fadeTo(150, 1);
		jQuery('.de_nav li').on("click", function() {
			jQuery(this).parent().find('li').removeClass("active");
			//jQuery(this).parent().find('li').fadeTo(150,.5);
			jQuery(this).addClass("active");
			jQuery(this).fadeTo(150, 1);
			jQuery(this).parent().parent().find('.de_tab_content > div').hide();
			var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
			jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').show(); //uses whatever index the link has to open the corresponding box 
		});
		// --------------------------------------------------
		// toggle
		// --------------------------------------------------
		jQuery(".toggle-list h2").addClass("acc_active");
		jQuery(".toggle-list h2").toggle(function() {
			jQuery(this).addClass("acc_noactive");
			jQuery(this).next(".ac-content").slideToggle(200);
		}, function() {
			jQuery(this).removeClass("acc_noactive").addClass("acc_active");
			jQuery(this).next(".ac-content").slideToggle(200);
		})
	}
	/* --------------------------------------------------
	 * video autosize
	 * --------------------------------------------------*/
	function video_autosize() {
		jQuery('.de-video-container').each(function() {
			var height_1 = jQuery(this).css("height");
			var height_2 = jQuery(this).find(".de-video-content").css("height");
			var newheight = (height_1.substring(0, height_1.length - 2) - height_2.substring(0, height_2.length - 2)) / 2;
			jQuery(this).find('.de-video-overlay').css("height", height_1);
			jQuery(this).find(".de-video-content").animate({
				'margin-top': newheight
			}, 'fast');
		});
	}
	/* --------------------------------------------------
	 * center x and y
	 * --------------------------------------------------*/
	function center_xy() {
		jQuery('.center-xy').each(function() {
			jQuery(this).parent().find("img").on('load', function() {
				var w = parseInt(jQuery(this).parent().find(".center-xy").css("width"), 10);
				var h = parseInt(jQuery(this).parent().find(".center-xy").css("height"), 10);
				var pic_w = jQuery(this).css("width");
				var pic_h = jQuery(this).css("height");
				jQuery(this).parent().find(".center-xy").css("left", parseInt(pic_w, 10) / 2 - w / 2);
				jQuery(this).parent().find(".center-xy").css("top", parseInt(pic_h, 10) / 2 - h / 2);
				jQuery(this).parent().find(".bg-overlay").css("width", pic_w);
				jQuery(this).parent().find(".bg-overlay").css("height", pic_h);
			}).each(function() {
				if (this.complete) $(this).load();
			});
		});
	}
	/* --------------------------------------------------
	 * add arrow for mobile menu
	 * --------------------------------------------------*/
	function menu_arrow() {
		// mainmenu create span
		jQuery('#mainmenu li a').each(function() {
			if ($(this).next("ul").length > 0) {
				$("<span></span>").insertAfter($(this));
			}
		});
		// mainmenu arrow click
		jQuery("#mainmenu > li > span").on("click", function() {
			$('header').css("height", "auto");
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					$(this).addClass("active");
					$(this).parent().find("ul:first").css("height", "auto");
					var curHeight = $(this).parent().find("ul:first").height();
					$(this).parent().find("ul:first").css("height", "0");
					$(this).parent().find("ul:first").animate({
						'height': curHeight
					}, 400, 'easeInOutQuint');
					break;
				case 2:
					$(this).removeClass("active");
					$(this).parent().find("ul:first").animate({
						'height': "0"
					}, 400, 'easeInOutQuint');
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});
		jQuery("#mainmenu > li > ul > li > span").on("click", function() {
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					$(this).addClass("active");
					$(this).parent().find("ul:first").css("height", "auto");
					$(this).parent().parent().parent().find("ul:first").css("height", "auto");
					var curHeight = $(this).parent().find("ul:first").height();
					$(this).parent().find("ul:first").css("height", "0");
					$(this).parent().find("ul:first").animate({
						'height': curHeight
					}, 400, 'easeInOutQuint');
					break;
				case 2:
					$(this).removeClass("active");
					$(this).parent().find("ul:first").animate({
						'height': "0"
					}, 400, 'easeInOutQuint');
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});
	}
	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	function sequence(){
		var sq = jQuery(".sequence > .sq-item .picframe");
		var count = sq.length;
		sq.addClass("slideInUp");
		for (var i = 0; i <= count; i++) {
		  var sqx = jQuery(".sequence > .sq-item:eq("+i+") .picframe");
		  sqx.attr('data-wow-delay',(i/8)+'s');
		}		
	}
	
	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	function sequence_pf(){
		var sq = jQuery(".sequence_pf > .sq-item .picframe");
		var count = sq.length;
		sq.addClass("zoomIn");
		for (var i = 0; i <= count; i++) {
		  var sqx = jQuery(".sequence_pf > .sq-item:eq("+i+") .picframe");
		  sqx.attr('data-wow-delay',(i/8)+'s');
		}		
	}
	
	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	function sequence_team(){
		var sq = jQuery(".sequence_team .sq-item .picframe");
		var count = sq.length;
		sq.addClass("zoomIn");
		for (var i = 0; i <= count; i++) {
		  var sqx = jQuery(".sequence_team .sq-item:eq("+i+") .picframe");
		  sqx.attr('data-wow-delay',(i/8)+'s');
		}		
	}
	
	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	function sequence_a(){
		var sq = jQuery(".sequence > .sq-item");
		var count = sq.length;
		sq.addClass("fadeInRight");
		for (var i = 0; i <= count; i++) {
		  var sqx = jQuery(".sequence > .sq-item:eq("+i+")");
		  sqx.attr('data-wow-delay',(i/8)+'s');
		}		
	}
	/* --------------------------------------------------
	 * custom scroll
	 * --------------------------------------------------*/
	$.fn.moveIt = function(){	  
	  $(this).each(function(){
		instances.push(new moveItItem($(this)));
	  });
	}
	function moveItItemNow(){
	var scrollTop = $window.scrollTop();
		instances.forEach(function(inst){
		  inst.update(scrollTop);
		});
	}
	var moveItItem = function(el){
	  this.el = $(el);
	  this.speed = parseInt(this.el.attr('data-scroll-speed'));
	};
	moveItItem.prototype.update = function(scrollTop){
	  var pos = scrollTop / this.speed;
	  this.el.css('transform', 'translateY(' + pos + 'px)');
	};
	$(function(){
		var mx = window.matchMedia("(min-width: 992px)");
		if (mx.matches) {
			$('[data-scroll-speed]').moveIt();
		}
	});
	/* --------------------------------------------------
	 * multiple function
	 * --------------------------------------------------*/
	function init() {
		var sh = jQuery('#de-sidebar').css("height");
		var dh = jQuery(window).innerHeight();
		var h = parseInt(sh) - parseInt(dh);

		function scrolling() {
			var mq = window.matchMedia("(min-width: 993px)");
			var ms = window.matchMedia("(min-width: 768px)");
			if (mq.matches) {
				var distanceY = window.pageYOffset || document.documentElement.scrollTop,
					shrinkOn = 0,
					header = jQuery("header");
				if (distanceY > shrinkOn) {
					header.addClass("smaller");
				} else {
					if (header.hasClass('smaller')) {
						header.removeClass('smaller');
					}
				}
			}
			if (mq.matches) {
				if (jQuery("header").hasClass("side-header")) {
					if (jQuery(document).scrollTop() >= h) {
						jQuery('#de-sidebar').css("position", "fixed");
						if (parseInt(sh) > parseInt(dh)) {
							jQuery('#de-sidebar').css("top", -h);
						}
						jQuery('#main').addClass("col-md-offset-3");
						jQuery('h1#logo img').css("padding-left", "7px");
						jQuery('header .h-content').css("padding-left", "7px");
						jQuery('#mainmenu li').css("width", "103%");
					} else {
						jQuery('#de-sidebar').css("position", "relative");
						if (parseInt(sh) > parseInt(dh)) {
							jQuery('#de-sidebar').css("top", 0);
						}
						jQuery('#main').removeClass("col-md-offset-3");
						jQuery('h1#logo img').css("padding-left", "0px");
						jQuery('header .h-content').css("padding-left", "0px");
						jQuery('#mainmenu li').css("width", "100%");
					}
				}

			}
		}
		
		// --------------------------------------------------
	// looping background
	// --------------------------------------------------
	 
		scrolling();
		
		
		jQuery(".btn-rsvp").on("click", function() {
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					jQuery('#popup-box').addClass('popup-show');					
					jQuery('#popup-box').removeClass('popup-hide');
					break;
				case 2:
					
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});
		
		jQuery(".btn-close").on("click", function() {
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					jQuery('#popup-box').addClass('popup-hide');					
					jQuery('#popup-box').removeClass('popup-show');
					break;
				case 2:
					
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});
	}
	/* --------------------------------------------------
	 * multiple function
	 * --------------------------------------------------*/
	function init_de() {
		jQuery('.de-team-list').each(function() {
			jQuery(this).find("img").on('load', function() {
				var w = jQuery(this).css("width");
				var h = jQuery(this).css("height");
				//nh = (h.substring(0, h.length - 2)/2)-48;
				jQuery(this).parent().parent().find(".team-pic").css("height", h);
				jQuery(this).parent().parent().find(".team-desc").css("width", w);
				jQuery(this).parent().parent().find(".team-desc").css("height", h);
				jQuery(this).parent().parent().find(".team-desc").css("top", h);
			}).each(function() {
				if (this.complete) $(this).load();
			});
		});
		jQuery(".de-team-list").on("mouseenter", function() {
				var h;
				h = jQuery(this).find("img").css("height");
				jQuery(this).find(".team-desc").stop(true).animate({
					'top': "0px"
				}, 350, 'easeOutQuad');
				jQuery(this).find("img").stop(true).animate({
					'margin-top': "-100px"
				}, 400, 'easeOutQuad');
			}).on("mouseleave", function() {
				var h;
				h = jQuery(this).find("img").css("height");
				jQuery(this).find(".team-desc").stop(true).animate({
					'top': h
				}, 350, 'easeOutQuad');
				jQuery(this).find("img").stop(true).animate({
					'margin-top': "0px"
				}, 400, 'easeOutQuad');
			})
			// portfolio
		jQuery('.item .picframe').each(function() {
			jQuery(this).find("img").css("width", "100%");
			jQuery(this).find("img").css("height", "auto");
			jQuery(this).find("img").on('load', function() {
				var w = jQuery(this).css("width");
				var h = jQuery(this).css("height");
				//nh = (h.substring(0, h.length - 2)/2)-48;
				jQuery(this).parent().css("height", h);
			}).each(function() {
				if (this.complete) $(this).load();
			});
		});
		
		
		var preloader_pos = parseInt(jQuery(window).innerHeight()/2)-30;
		$(".preloader1").css("top",preloader_pos);
	}
	
	/* --------------------------------------------------
	 * center-y
	 * --------------------------------------------------*/
	function centerY(){
			var mx = window.matchMedia("(min-width: 992px)");
			var dh = 0;
			if (mx.matches) {
				jQuery('.full-height').each(function() {
					dh = jQuery(window).innerHeight();
					jQuery(this).css("height",dh);
				});
			}else{
				jQuery('.full-height').each(function() {
					dh = '100%';
					jQuery(this).css("height",dh);
					jQuery(this).find('.center-y').css("padding","100px 0 100px 0")
				});
			}
	}
	
		$("body").show();
		$('body').addClass('de_light');
		new WOW().init();
		header_styles();
		load_magnificPopup();
		center_xy();
		init_de();
		init_resize();
		// --------------------------------------------------
		// custom positiion
		// --------------------------------------------------
		var $doc_height = jQuery(window).innerHeight();
		jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
		jQuery('.full-height .de-video-container').css("min-height", $doc_height);
		
		
		centerY();
		
		// --------------------------------------------------
		// blog list hover
		// --------------------------------------------------
		jQuery(".blog-list").on("mouseenter", function() {
				var v_height = jQuery(this).find(".blog-slide").css("height");
				var v_width = jQuery(this).find(".blog-slide").css("width");
				var newheight = (v_height.substring(0, v_height.length - 2) / 2) - 40;
				jQuery(this).find(".owl-arrow").css("margin-top", newheight);
				jQuery(this).find(".owl-arrow").css("width", v_width);
				jQuery(this).find(".owl-arrow").fadeTo(150, 1);
				//alert(v_height);
			}).on("mouseleave", function() {
				jQuery(this).find(".owl-arrow").fadeTo(150, 0);
			})
			//  logo carousel hover
		jQuery("#logo-carousel img").on("mouseenter", function() {
			jQuery(this).fadeTo(150, .5);
		}).on("mouseleave", function() {
			jQuery(this).fadeTo(150, 1);
		})
		if ($('#back-to-top').length) {
			backToTop();
		}
		jQuery(".nav-exit").on("click", function() {
			$.magnificPopup.close();
		});
		// --------------------------------------------------
		// navigation for mobile
		// --------------------------------------------------
		jQuery('#menu-btn').on("click", function() {
				if (mobile_menu_show == 0) {
					jQuery('header').css("height","auto")
					jQuery('#mainmenu').slideDown();
					mobile_menu_show = 1;
				} else {
					jQuery('#mainmenu').slideUp();
					mobile_menu_show = 0;
				}
			})
		jQuery("a.btn").on("click", function(evn) {
			if (this.href.indexOf('#') != -1) {
				evn.preventDefault();
				jQuery('html,body').scrollTo(this.hash, this.hash);
			}
		});
		
		jQuery('.de-gallery .item').on("click", function() {
			$('#navigation').show();
		});
		// btn arrow up
		jQuery(".arrow-up").on("click", function() {
			jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function() {
				jQuery("#hide-content").fadeIn(600, function() {
					jQuery('.arrow-up').animate({
						'bottom': '-40px'
					}, "slow");
					jQuery('.arrow-down').animate({
						'top': '0'
					}, "slow");
				});
			});
		});
		// btn arrow down
		jQuery(".arrow-down").on("click", function() {
			jQuery("#hide-content").fadeOut("slow", function() {
				jQuery(".coming-soon .coming-soon-content").fadeIn(800, function() {
					jQuery('.arrow-up').animate({
						'bottom': '0px'
					}, "slow");
					jQuery('.arrow-down').animate({
						'top': '-40'
					}, "slow");
				});
			});
		});
		
			filter_gallery();			
			video_autosize();
			custom_bg();
			menu_arrow();
			load_owl();
			custom_elements();
			init();
			
			
			// one page navigation
			/**
			 * This part causes smooth scrolling using scrollto.js
			 * We target all a tags inside the nav, and apply the scrollto.js to it.
			 */
			jQuery("#homepage nav a, .scroll-to").on("click", function(evn) {
				if (this.href.indexOf('#') != -1) {
					evn.preventDefault();
					jQuery('html,body').scrollTo(this.hash, this.hash);
				}
			});
			sequence();
			sequence_a();
			sequence_pf();
			sequence_team();

		
		/* --------------------------------------------------
		 * window | on resize
		 * --------------------------------------------------*/
		$(window).on("resize", function() {
			init_resize();
			centerY();
		});
		/* --------------------------------------------------
		 * window | on scroll
		 * --------------------------------------------------*/
		jQuery(window).on("scroll", function() {
			/* functions */
			header_sticky();
			de_counter();
			de_progress();
			init();
			backToTop();
			moveItItemNow();
			/* plugin | stellar */
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0
			});
			/* fade base scroll position */
			var target = $('.fadeScroll');
			var targetHeight = target.outerHeight();
			var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
			if (scrollPercent >= 0) {
				target.css('opacity', scrollPercent);
			}else{
				target.css('opacity', 0);
			}
			// custom page with background on side
			jQuery('.side-bg').each(function() {
				jQuery(this).find(".image-container").css("height", jQuery(this).find(".image-container").parent().css("height"));
			});
			/* go to anchor */
			jQuery('#mainmenu li a').each(function () {
				
				$(function(){
					var mx = window.matchMedia("(max-width: 992px)");
					if (mx.matches) {
						mobile_menu_show = 0;
					}
				});
				
                if (this.href.indexOf('#') != -1) {
                    var href = jQuery(this).attr('href');
                    if (jQuery(window).scrollTop() > jQuery(href).offset.top - 140) {
                        jQuery('#mainmenu li a').removeClass('active');
                        jQuery(this).addClass('active');
                    }
                }
            });
		});
		
		
		jQuery('.pf-click').click(function(){
			
			if(pf_open==1){
			jQuery("#loader-area").slideUp(500,function(){
				pf_open = 0;
				});
			}
					
			jQuery('.page-overlay').show();
			var url = jQuery(this).attr("data-value");
			
			jQuery("#loader-area .project-load").load(url, function() {
				jQuery("#loader-area").slideDown(500,function(){
					jQuery('.page-overlay').hide();
					pf_open = 1;
					jQuery('html, body').animate({
					scrollTop: jQuery('#loader-area').offset().top - 70
				}, 500, 'easeOutCirc');
			
		//
			
			jQuery(".image-slider").owlCarousel({
				center: false,
				items:1,
				loop:true,
				margin:0,
			 });
			
			jQuery('#btn-close').click(function(){
				jQuery("#loader-area").slideUp(500,function(){
				jQuery('html, body').animate({				
					scrollTop: jQuery('#section-portfolio').offset().top - 70
				}, 500, 'easeOutCirc');
				});

				return false;			
					
					});  
				
				});			
		}); 
		});   
		
		
		$(function(){
        var x = 0;
        setInterval(function(){
            x-=1;
            $('.bg-loop').css('background-position', x + 'px 0');
        }, 50);
		});
		
		if(smoothscroll==1){
		
			// scroll
			jQuery.scrollSpeed = function(step, speed, easing) {
			
			var $document = $(document),
				$window = $(window),
				$body = $('html, body'),
				option = easing || 'default',
				root = 0,
				scroll = false,
				scrollY,
				scrollX,
				view;
				
			if (window.navigator.msPointerEnabled)
			
				return false;
				
			$window.on('mousewheel DOMMouseScroll', function(e) {
				
				var deltaY = e.originalEvent.wheelDeltaY,
					detail = e.originalEvent.detail;
					scrollY = $document.height() > $window.height();
					scrollX = $document.width() > $window.width();
					scroll = true;
				
				if (scrollY) {
					
					view = $window.height();
						
					if (deltaY < 0 || detail > 0)
				
						root = (root + view) >= $document.height() ? root : root += step;
					
					if (deltaY > 0 || detail < 0)
				
						root = root <= 0 ? 0 : root -= step;
					
					$body.stop().animate({
				
						scrollTop: root
					
					}, speed, option, function() {
				
						scroll = false;
					
					});
				}
				
				if (scrollX) {
					
					view = $window.width();
						
					if (deltaY < 0 || detail > 0)
				
						root = (root + view) >= $document.width() ? root : root += step;
					
					if (deltaY > 0 || detail < 0)
				
						root = root <= 0 ? 0 : root -= step;
					
					$body.stop().animate({
				
						scrollLeft: root
					
					}, speed, option, function() {
				
						scroll = false;
					
					});
				}
				
				return false;
				
			}).on('scroll', function() {
				
				if (scrollY && !scroll) root = $window.scrollTop();
				if (scrollX && !scroll) root = $window.scrollLeft();
				
			}).on('resize', function() {
				
				if (scrollY && !scroll) view = $window.height();
				if (scrollX && !scroll) view = $window.width();
				
			});       
		};
		
		
		// scroll
		jQuery.easing.default = function (x,t,b,c,d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		};
		
		//jQuery.scrollSpeed(300, 1800);
		
		
		$("html").easeScroll({
		  frameRate: 60,
		  animationTime: 2000,
		  stepSize: 120,
		  pulseAlgorithm: 1,
		  pulseScale: 8,
		  pulseNormalize: 1,
		  accelerationDelta: 20,
		  accelerationMax: 1,
		  keyboardSupport: true,
		  arrowScroll: 50,
		  touchpadSupport: true,
		  fixedBackground: true
		});
	
	}
})(jQuery);

	/* --------------------------------------------------
	 * plugin | isotope
	 * --------------------------------------------------*/
	function filter_gallery() {
		var $container = jQuery('#gallery');
		$container.isotope({
			itemSelector: '.item',
			filter: '*'
		});
		jQuery('#filters a').on("click", function() {
			var $this = jQuery(this);
			if ($this.hasClass('selected')) {
				return false;
			}
			var $optionSet = $this.parents();
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
			var selector = jQuery(this).attr('data-filter');
			$container.isotope({
				filter: selector
			});
			return false;
		});
	}

/* --------------------------------------------------
 * window | on load
 * --------------------------------------------------*/
jQuery(window).on('load', function() {
	filter_gallery();		
	jQuery('#preloader').delay(500).fadeOut(500);
});