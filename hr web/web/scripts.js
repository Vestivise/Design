var	body = $('body')

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

/*  DASHBOARD  */

function employee_init(){
	var employee_listing = $('#employee-listing');
	if(employee_listing.find('ul').length > 10){
		employee_listing.addClass('overflow');
	}
	employee_listing.find('#employee-listing-more').click(function(){
		employee_listing.css('max-height','none').removeClass('overflow')
	})
	$('#employee-search-submit').click(function(){
		
	})
}
employee_init()

/*  DASHBOARD - END  */