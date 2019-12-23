$.namespace("monitor.common");

monitor.common = function () {  
	var statViewOrderBy = '';
	var statViewOrderBy_old = '';
	var statViewOrderType = 'asc';
	var isOrderRequest = false;

	// only one page for now
	var sqlViewPage = 1;
	var sqlViewPerPageCount = 1000;
	var projectId = 1;
	return  {
		init : function() {
			//this.buildFooter();
			//monitor.lang.init();
		},
		
		buildHead : function(index) {
			/**
			$.get('header.html',function(html) {
				$(document.body).prepend(html);
				//monitor.lang.trigger();
				$(".navbar .nav li").eq(index).addClass("active");
			},"html"); **/
						
		},
		
		buildFooter : function() {
			/**
			var html = '<footer class="footer">'+
					  '    		<div class="container">'+
				  	  '	powered by <a href="https://github.com/alibaba/" target="_blank">AlibabaTech</a> & <a href="http://www.sandzhang.com/" target="_blank">sandzhang</a> & <a href="http://melin.iteye.com/" target="_blank">melin</a> & <a href="https://github.com/shrekwang" target="_blank">shrek.wang</a>'+
				  	  '			</div>'+
					  ' </footer>';
			$(document.body).append(html);
			**/
		},
		
		ajaxRequestForReset : function() {
			if(!confirm("Are you sure to reset all stat? It'll clear all stat data !")){
				return;
			}
			
			$.ajax({
				type: 'POST',
				url: "reset-all.json",
				success: function(data) {
					if (data.ResultCode == 1) {
						alert("already reset all stat");
					}
				},
				dataType: "json"
			});
		},
		setProjectId : function(p){
			if(p!=null && p !=''){
				projectId = p;
			}
		},
		getAjaxUrl : function(uri) {
			var result = uri;
			
			if(projectId != undefined){
				result += 'proId=' + projectId + '&';
			}
			if (statViewOrderBy != undefined)
				result += 'orderBy=' + statViewOrderBy + '&';

			if (statViewOrderType != undefined)
				result += 'orderType=' + statViewOrderType + '&';

			if (sqlViewPage != undefined)
				result += 'pageNo=' + sqlViewPage + '&';

			if (sqlViewPerPageCount != undefined)
				result += 'pageSize=' + sqlViewPerPageCount + '&';

			return result;
		},
		
		resetSortMark : function() {
			var divObj = document.getElementById('th-' + statViewOrderBy);
			var old_divObj = document.getElementById('th-' + statViewOrderBy_old);
			var replaceToStr = '';
			if (old_divObj) {
				var html = old_divObj.innerHTML;
				if (statViewOrderBy_old.indexOf('-') > 0)
					replaceToStr = '-';
				html = html.replace('▲', replaceToStr);
				html = html.replace('▼', replaceToStr);
				old_divObj.innerHTML = html
			}
			if (divObj) {
				var html = divObj.innerHTML;
				if (statViewOrderBy.indexOf('-') > 0)
					html = '';

				if (statViewOrderType == 'asc') {
					html += '▲';
				} else if (statViewOrderType == 'desc') {
					html += '▼';
				}
				divObj.innerHTML = html;
			}
			isOrderRequest = true;
			
			//this.ajaxRequestForBasicInfo();
			return false;
		},

		setOrderBy : function(orderBy) {
			if (statViewOrderBy != orderBy) {
				statViewOrderBy_old = statViewOrderBy;
				statViewOrderBy = orderBy;
				statViewOrderType = 'desc';
				monitor.common.resetSortMark();
				return;
			}

			statViewOrderBy_old = statViewOrderBy;

			if (statViewOrderType == 'asc')
				statViewOrderType = 'desc'
			else
				statViewOrderType = 'asc';

			monitor.common.resetSortMark();
		},
		
		ajaxuri : "",
		handleCallback:null,
		handleAjaxResult : function(data) {
			monitor.common.handleCallback(data);
			if (!isOrderRequest) {
				//monitor.lang.trigger();
			}
		},
		ajaxRequestForBasicInfo : function() {
			$.ajax({
				type: 'POST',
				url: monitor.common.getAjaxUrl(monitor.common.ajaxuri),
				success: function(data) {
					monitor.common.handleAjaxResult(data);
				},
				dataType: "json"
			});
		},
		
		subSqlString : function(sql, len) {
			if (sql == undefined || sql == null) {
				return '';
			}
			
			if (sql.length <= len)
				return sql;
			return sql.substr(0, len) + '...';
		},
		
		stripes : function() {
            $("#dataTable tbody tr").each(function () {
                $(this).removeClass("striped");
            });
            $("#dataTable tbody tr:even").each(function () {
                $(this).addClass("striped");
            });
        },
        
        getUrlVar : function(name) {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
        	return vars[name];
        }
	}
}();

$(document).ready(function() {
	monitor.common.init();
});

function replace (data) {
	if(data == undefined){
		return '';
	}else{
		return format(data);
	}
}

function format(s) {
	var str=s+='';
	return str = str.replace(/\"/g,"'");
	//return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}