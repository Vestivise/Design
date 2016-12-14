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

var annotation = $('#annotation'),
	annotation_ajax = annotation.find('#annotation_ajax')

function annotation_open(e){
	e.preventDefault();
	html.addClass('annotated');
	$.ajax({
        type:'get',
        url:$(this).attr('href'),
        data:$('#annotation_text'),
		success:function(data){
			var annotation_text = $(data).find('#annotation_text');
			annotation_ajax.html(annotation_text);
			html.addClass('annotated');
		}
	});
}
$('.annotation').click(annotation_open)

function annotation_close(e){
    if (!annotation_ajax.is(e.target) && annotation_ajax.has(e.target).length === 0){
		html.removeClass('annotated');
		setTimeout(function(){
			annotation_ajax.empty()
		},600)
    }
}
annotation.click(annotation_close);

function chart_slider_init(){
	var chart_slider = $('#chart-slider'),
		chart_slider_li = chart_slider.find('li');

	function chart_slider_active(){
		var scroll_top = $(window).scrollTop();
		$('.section').each(function(){
			var section = $(this),
				section_id = section.attr('id'),
				section_top = section.offset().top;
			if(scroll_top > section_top - 1){
				chart_slider.find('[data-scroll="' + section_id + '"]').addClass('active').siblings().removeClass('active')
			}
		})
	}
	chart_slider_active()
	$(window).scroll(chart_slider_active)

	chart_slider_li.click(function(){
		var chart_scroll = $(this).attr('data-scroll');
		scroll_to('#' + chart_scroll)
	});

}
chart_slider_init();

$('.slider').slick({
	speed:600,
	infinite:false,
	slidesToShow:1,
	variableWidth:false,
	focusOnSelect:false,
	Autoplay:true,
	autoplaySpeed:1000,
	dots:false,
	arrows:true,
	prevArrow:'<button class="slick-prev"><hr><hr></button>',
	nextArrow:'<button class="slick-next"><hr><hr></button>',
}).addClass('loaded')

function percentage_charts(){
	var chart = $(this),
		chart_section = chart.children(),
		chart_percentage = (Number(chart.attr('data-per'))).toFixed(1),
		chart_title = chart.attr('data-title');
	chart.css('width',chart_percentage + '%').append('<span><h3>' + chart_percentage + '% ' + chart_title + '</h3>');
	if(chart_section.length > 0 && chart_percentage > 1){
		chart_section.each(function(){
			var section = $(this),
				section_percentage = section.attr('data-per'),
				section_percentage_total = (section_percentage/100*chart_percentage).toFixed(1);
				section_title = section.attr('data-title');
			section.css('width',section_percentage + '%').append('<span><h3>' + section_percentage_total + '% ' + section_title + '</h3>');
		})
	}
}
$('.percentage_chart ul').each(percentage_charts);

function bar_charts(){
	var chart = $(this),
		chart_ul = chart.find('ul'),
		chart_ul_length = chart_ul.length;

	chart_ul.css('width','calc(' + 95/chart_ul_length + '% - 20px)').each(function(){
		var chart_ul = $(this),
			chart_ul_title = chart_ul.attr('data-title'),
			chart_ul_li = chart_ul.find('li'),
			chart_ul_li_length = chart_ul_li.length;
			chart_ul_li.css('width','calc(' + 100/chart_ul_li_length + '% - 10px)');
		chart_ul.append('<h3>' + chart_ul_title + '</h3>');
		chart_ul_li.each(function(){
			var chart_ul_li = $(this),
				chart_ul_li_percentage = chart_ul_li.attr('data-per'),
				chart_ul_li_title = chart_ul_li.attr('data-title');
			chart_ul_li.css('height',chart_ul_li_percentage + '%').append('<span>' + chart_ul_li_title + '</span>');
		})
	});

	function build_background(){
		var chart_title = chart.attr('data-ytitle'),
			chart_values = chart.attr('data-yvalues');
		chart.append('<h3 class="y-title">' + chart_title + '</h3>');
		var chart_values_array = chart_values.split(" / "),
			chart_values_array_length = chart_values_array.length,
			count = 0;
		chart_values_array.forEach(function(value){
			count++;
			var position_bottom = (100/chart_values_array_length)*count;
			chart.append('<span class="values" style="bottom:' + position_bottom + '%">' + value + '<hr></span>')
		})
	}
	build_background();
}
$('.bar_chart').each(bar_charts);

function half_pie_chart(){
	var chart = $(this);
		chart_value = chart.attr('data-per'),
		chart_value_deg = (180*(chart_value/100)).toFixed(1);

	chart.append('<hr style="-webkit-transform:translate(-50%,-50%) rotate(' + chart_value_deg + 'deg);transform:translate(-50%,-50%) rotate(' + chart_value_deg + 'deg);">');

	chart.find('li').each(function(){
		var chart_li = $(this),
			chart_li_title = chart_li.attr('data-title');
		chart.append('<h3>' + chart_li_title + '</h3>');
	})
}
$('.half_pie_chart').each(half_pie_chart);

function half_circle_chart(){
	var chart = $(this),
		chart_value = chart.attr('data-per'),
		chart_total = chart.attr('data-total'),
		chart_average = chart.attr('data-average'),
		chart_value_deg = (180 - 180*(chart_value/chart_total)).toFixed(1);
		chart_average_deg = (180*(chart_average/chart_total)).toFixed(1);
	chart.append('<h4 class="start">0%</h4><h4 class="end">' + chart_total + '%</h4><div class="average" style="-webkit-transform:translate(-50%,-50%) rotate(' + chart_average_deg + 'deg);transform:translate(-50%,-50%) rotate(' + chart_average_deg + 'deg);"><h4>Average: ' + chart_average + '%</h4><hr></div>')
	chart.find('.circle').append('<div class="fill" style="-webkit-transform:translate(-50%,-50%) rotate(-' + chart_value_deg + 'deg);transform:translate(-50%,-50%) rotate(-' + chart_value_deg + 'deg);"></div>');

	chart.find('.value').append('<h3>' + chart_value + '%</h3>')
}
$('.half_circle_chart').each(half_circle_chart)

function bell_chart(){
	var chart = $(this),
		chart_value = chart.attr('data-per'),
		chart_ytitle = chart.attr('data-ytitle'),
		chart_yvalues = chart.attr('data-yvalues'),
		chart_xtitle = chart.attr('data-xtitle'),
		chart_xvalues = chart.attr('data-xvalues');

	chart.append('<div class="mark" style="left:' + chart_value + '%"><h3>' + chart_value + '%</h3></div>')

	function build_background(){

		if(chart_ytitle){
			chart.append('<h3 class="y-title">' + chart_ytitle + '</h3>');
		}
		if(chart_yvalues){
			var chart_yvalues_array = chart_yvalues.split(" / "),
				chart_yvalues_array_length = chart_yvalues_array.length,
				count = 0;
			chart_yvalues_array.forEach(function(value){
				count++;
				var position_bottom = (100/chart_yvalues_array_length)*count;
				chart.append('<span class="yvalues" style="bottom:' + position_bottom + '%">' + value + '<hr></span>')
			})
		}

		if(chart_xtitle){
			chart.append('<h3 class="x-title">' + chart_xtitle + '</h3>');
		}
		if(chart_xvalues){
			var chart_xvalues_array = chart_xvalues.split(" / "),
				chart_xvalues_array_length = chart_xvalues_array.length,
				count = 0;
			chart_xvalues_array.forEach(function(value){
				count++;
				var position_left = (100/(chart_xvalues_array_length + 1))*count;
				chart.append('<span class="xvalues" style="left:' + position_left + '%"><h3>' + value + '</h3></span>')
			})
		}
	}
	build_background();

}
$('.bell_chart').each(bell_chart)

function line_chart(){
	var chart = $(this),
		chart_ytitle = chart.attr('data-ytitle'),
		chart_xvalyues_array = chart.attr('data-xvalues').split(' / '),
		chart_xvalues1_array = chart.attr('data-xvalues-1').split(' / '),
		chart_xvalues2_array = chart.attr('data-xvalues-2').split(' / '),
		chart_xvalues3_array = chart.attr('data-xvalues-3').split(' / '),
		chart_xvalues4_array = chart.attr('data-xvalues-4').split(' / '),
		chart_xvalues5_array = chart.attr('data-xvalues-5').split(' / '),
		chart_xvalues6_array = chart.attr('data-xvalues-6').split(' / '),
		data = {
			labels:chart_xvalyues_array,
			series:[
				chart_xvalues1_array,
				chart_xvalues2_array,
				chart_xvalues3_array,
				chart_xvalues4_array,
				chart_xvalues5_array,
				chart_xvalues6_array
			]
		},
		options = {
		height:'360px',
		showPoint:true,
		showArea:true,
		axisX:{
			labelInterpolationFnc:function(value){
				return value + ' ' + chart_ytitle;
			}
		},
		axisY:{
			showLabel:true,
			labelInterpolationFnc:function(value){
				while(/(\d+)(\d{3})/.test(value.toString())){
					value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
				}
				return '$' + value;
			}
		}
	};
	new Chartist.Line('.line_chart',data,options);
}
$('.line_chart').each(line_chart)

/*  DASHBOARD - END  */

/*  SETTINGS  */

$('#link_account').click(function(e){
	e.preventDefault();
	html.addClass('link_account_linking');
	// on success html.removeClass('link_account_linking')
})

$('.rating li').click(function(){
	$(this).addClass('active').siblings().removeClass('active')
})

/*  SETTINGS - END  */