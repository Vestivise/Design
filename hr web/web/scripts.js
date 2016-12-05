var	html = $('html'),
	body = $('body'),
	header = $('#header'),
	header_logo = header.find('#logo');

function global_var(){
	window_width = $(window).width(),
	window_height = $(window).height()
}
global_var();

function input_label_relation(){
	function has_value(){
		$("input,textarea").each(function(){
			var field = $(this),
				label = $('label[for="' + field.attr("id") + '"]');
	   		if(field.val().length > 0){
				label.hide()
	   		}else{
				label.fadeIn(100)
	   		}
		});
	}
	has_value();
	$("input,textarea").focus(function(){
   		$('label[for="' + $(this).attr("id") + '"]').fadeOut(100)
	}).blur(function(){
		if(!$(this).val()){
   			$('label[for="' + $(this).attr("id") + '"]').fadeIn(100)
    	}
	});
	$('.wpcf7-form [type="submit"]').click(function(){
		setTimeout(function(){
			if($('.wpcf7-form').hasClass('sent')){
				has_value();
			}
		},301)
	})
}
input_label_relation();

function center_content(){
	var center = $('.center');
	center.imagesLoaded(function(){
		center_height = center.height();
	    if(window_height > center_height){
	    	center.addClass('center_absolute css_fadein').removeClass('center_margin')
	    }else{
	    	center.addClass('center_margin css_fadein').removeClass('center_element')
	    }
	});
}
center_content();

function scroll_to(div){
	$("html,body").animate({
  		scrollTop:$(div).offset().top
	},600)
}

/*  HEADER  */

function header_logo_click(event){
	if(body.is('#page-dashboard')){
		event.preventDefault();
		scroll_to('body');
	}
}
header_logo.click(header_logo_click)

function header_scroll(){
	var scroll_top = $(window).scrollTop();
	if(scroll_top > 30){
		html.addClass('scroll')
	}else{
		html.removeClass('scroll')
	}
}
header_scroll();
$(window).scroll(header_scroll)

/*  HEADER - END  */

/*  DASHBOARD  */

function employee_init(){
	var employee_listing = $('#employee-listing'),
		employee_add = $('#employee_add'),
		employee_add_form = employee_add.find('#employee_add_form')

	if(employee_listing.find('ul').length > 10){
		employee_listing.addClass('overflow');
	}
	employee_listing.find('#employee-listing-more').click(function(){
		employee_listing.css('max-height','none').removeClass('overflow')
	})
	$('#employee-add').click(function(){
		employee_add.show(function(){
			$(document).bind('click',function(e){
				if(html.hasClass('employee_add_open') && !employee_add_form.is(e.target) && employee_add_form.has(e.target).length === 0){
					setTimeout(function(){
						html.removeClass('employee_add_open')
					},20);
					$(document).unbind('click');
				}
			});
		});
		setTimeout(function(){
			html.addClass('employee_add_open');
		},10)
	})

}
employee_init()

/*  DASHBOARD - END  */