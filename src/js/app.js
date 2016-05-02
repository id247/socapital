;(function(){
	
	'use strict';

	var maxHeight = 800;
	var maxWidth = 1024;

	var isMobile = (function detectmob() { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		} else {
			return false;
		}
	})();

	var isNativeScrollEnabled = true;

	function scrollMeTo(){
		
		$('.js-goto').on('click', function(e){
			var $target = $(this.href.replace( /^.*\#/, '#' ) );
			
			if ($target.length === 1) {
				e.preventDefault();

				$('body,html').animate({ 
					scrollTop: $target.offset().top,
					easing: 'ease-in'
				}, 500);
			};
		});

	};

	function scroll(){
		var isScrolling = false;
		var $html = $('html');
		var $sections = $('.section');
		
		var scrollDirection;
		var winHeight;

		function scrollMeTo(e, index){

			var $target = $sections.eq(index);

			if ($target.length === 1) {

				e.preventDefault();

				isScrolling = true;

				$sections.addClass('section--scrolling');

				var scrollTop = $target.offset().top;

				if (scrollDirection == 'up'){
					scrollTop += ($target.outerHeight() - winHeight);
				}

				$('body,html').animate({ 
					scrollTop: scrollTop,
					easing: 'ease-in'
				}, 900, function(){
					isScrolling = false;
					$sections.removeClass('section--scrolling');
				});
			};
		}

		function smoothScroll(e){

			if (isScrolling){
				e.preventDefault();
				return;
			}		

			if (e.keyCode){
				
				if(e.keyCode === 38) {
					scrollDirection = 'up';
				}
				else if (e.keyCode === 40){
					scrollDirection = 'down';
				}

			}else{

				if(e.originalEvent.wheelDelta / 120 > 0) {
					scrollDirection = 'up';
				}
				else{
					scrollDirection = 'down';
				}

			}

			$sections.each(function(index, section){
				
				var rect = this.getBoundingClientRect();

				if (
					rect.top >= -(winHeight / 2)
					&& rect.top <= winHeight / 2
					&& rect.bottom <= winHeight * 1.5
					){
					
					if ( scrollDirection  == 'up' && index > 0 ){
						
						if ( rect.top < 0 && rect.bottom < winHeight ){
							
							scrollMeTo(e, index);
						
						}else if( rect.top >= 0 ){
							
							scrollMeTo(e, index - 1);
						}

					}else if ( scrollDirection  == 'down' && index < $sections.length ){ 

						if( rect.bottom <= winHeight ){
							
							scrollMeTo(e, index + 1);
						
						}else if( rect.top > 0 ){	
						
							scrollMeTo(e, index);
						}

					}
				}

			});
		}

		function enableScroll(e){
			if (!isNativeScrollEnabled && !$html.hasClass('fancybox-lock')){
				smoothScroll(e);
			}	
		}

		function resize(){
			winHeight = ( window.innerHeight || document.documentElement.clientHeight );
			
			if ( winHeight > maxHeight && $(window).width() > maxWidth ){
				isNativeScrollEnabled = false;
			}else{
				isNativeScrollEnabled = true;
			}
		}
		resize();

		$(window).on('resize', function(e){
			resize();
		});		

		$(window).on('mousewheel', function(e){
			enableScroll(e);
		});		

		$(document).keydown(function(e){
			if (e.keyCode === 38 || e.keyCode === 40){
				enableScroll(e);			
			}
		});		
	}

	function header(){

		var $header = $('#header');

		$header.addClass('header--fixed');

		function resize(){
			if ( $(window).scrollTop() > 100 && $(window).width() > maxWidth ){
				$header.addClass('header--small');
			}else{
				$header.removeClass('header--small');
			}
		}

		resize();

		$(window).on('scroll resize', function(e){
			resize();
		});
	}

	function sections(){
		var $sections = $('.section');

		function resize(){
			
			var winHeight = $(window).height();

			$sections.each(function(){
				var $section = $(this);
				var height = winHeight;

				if (($section).data('scroll') !== 'enable'){
					return;
				}
				
				if (winHeight > maxHeight){
					$(this).css('height', height);
				}else{
					$(this).css('height', '');
				}
				
			});
		}

		resize();

		$(window).on('resize', function(e){
			resize();
		});
	}

	function modal(){

		$('.js-fancybox').fancybox({
			padding: 0,
			scrolling: 'no',
			autoCenter : false,
			fitToView: false,
			helpers: {
				overlay: {
					//locked: false // if true (default), the content will be locked into overlay
				}
			}
		});
	 

	}



	/*
		submit form
	*/

	function form(){		

		$.extend($.validator.messages, {
			required: 'Это поле обязательно для заполнения.',
			remote: 'Please fix this field.',
			email: 'Введите корректный e-mail адрес.',
			url: 'Please enter a valid URL.',
			date: 'Please enter a valid date.',
			dateISO: 'Please enter a valid date (ISO).',
			number: 'Введите число.',
			digits: 'Допустимо вводить только цифры.',
			creditcard: 'Please enter a valid credit card number.',
			equalTo: 'Please enter the same value again.',
			accept: 'Please enter a value with a valid extension.',
			maxlength: jQuery.validator.format('Please enter no more than {0} characters.'),
			minlength: jQuery.validator.format('Please enter at least {0} characters.'),
			rangelength: jQuery.validator.format('Please enter a value between {0} and {1} characters long.'),
			range: jQuery.validator.format('Please enter a value between {0} and {1}.'),
			max: jQuery.validator.format('Please enter a value less than or equal to {0}.'),
			min: jQuery.validator.format('Please enter a value greater than or equal to {0}.')
		});

		$('form').each( function(){

			const $button = $(this).find('button[type="submit"]');
			const $success = $(this).find('.order-form__success');

			$success.hide();

			$(this).validate({
			});

			$(this).on('submit', function(e){

				e.preventDefault();

				const form = e.target;

				if ( !$(form).valid() ){
					return false;
				}

				//submit form

			});
		});

	}

	function init(){
		if (!isMobile){
			header();
			sections();
			scroll();
		}

		scrollMeTo();		
		modal();		
	}

	$(document).ready(function(){
		init();
	});	

})();