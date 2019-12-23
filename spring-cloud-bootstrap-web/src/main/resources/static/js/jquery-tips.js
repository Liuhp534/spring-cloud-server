/**
*
* 使用方法
* $(selector).tips();
*
*/
(function ($) {
    $.fn.tips = function(){
	    if(!$('#jquery_tips_style').length){
	        var style='<style id="jquery_tips_style" type="text/css">';
	        		style+='.jqtooltip {position: absolute;border: 1px solid #6f6f6f;background:#EBF1F7;padding: 3px;color:#606060;display: none;border-radius:3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;width:48%;overflow: scroll; }';
	        		style+='.tooltip_font {text-decoration:underline;cursor: text;color: #000;}';
	        	style+='</style>';
	        $(document.body).append(style);
	    }
	    var x = 8;
		var y = 10;
		//var tooltip = "<div id='jqtooltip' class='jqtooltip' >" + this.myTitle + "<\/div>"; //创建 div 元素
		var tooltip = "<div id='jqtooltip' class='jqtooltip' ></div>"; //创建 div 元素
		$(document.body).append(tooltip); //把它追加到文档中
		return this.each(function() {
			
			$(this).mouseover(function(e) {
				if(this.title == undefined || this.title == ''){
					return ;
				}
				this.myTitle = this.title;
				this.myTitle = decodeURIComponent(this.myTitle);
				this.title = "";
				$("#jqtooltip").css({
					"top" : (e.pageY + y) + "px",
					"left" : (e.pageX + x) + "px"
				}).show("fast").html(this.myTitle).mouseover(function(){
					$(this).show();
				}).mouseleave(function(){
					$(this).hide();
				});
				$(this).addClass("tooltip_font");
			}).mouseout(function() {
				this.title = this.myTitle;
				$(this).removeClass("tooltip_font");
				//$("#jqtooltip").hide();
			}).mousemove(function(e) {
				//$(this).removeClass("tooltip_font");
				/*$("#jqtooltip").css({
					"top" : (e.pageY + y) + "px",
					"left" : (e.pageX + x) + "px"
				});*/
			});
			
	    });
    };
})(jQuery);