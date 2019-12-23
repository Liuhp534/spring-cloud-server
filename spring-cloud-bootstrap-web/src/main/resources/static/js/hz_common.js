
var hz = {};

hz.location = (window.location+'').split('/');

hz.getCookie=function(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]==name)

            return arr[1];
    }
    return "";
};

hz.basePath = decodeURIComponent(hz.getCookie('context_path'));
hz.embedObs = decodeURIComponent(hz.getCookie('embed_obs'));


hz.retreatExecuteStatus=[[0,'已发送'],[1,'已接收'],[2,'执行失败'],[3,'执行成功']];
hz.retreatIssueType=[[1,'对接出单'],[2,'手工出单'],[3,'慧择出单']];
hz.retreat_executeStatus=[[0,'无接口'],[1,'未发送'],[2,'已发送'],[4,'执行异常'],[6,'执行成功']];
hz.retreat_retreatType = [[1,'退保重出'],[2,'退保退款'],[3,'退保重出(退余额)']];
hz.retreat_refundStatus = [[0,'未确认'],[1,'客服已确认'],[2,'产品已确认'],[3,'财务已确认'],[4,'已执行'],[5,'已撤销退保'],[41,'出纳执行中'],[42,'出纳执行失败']];
hz.platformEnum=[[1,'主站'],[2,'齐欣'],[3,'聚米'],[7,'协保']];
hz.annuity_signPayType=[[0,'保险公司'],[1,'微信']];
hz.annuity_signPayStatus=[[0,'不支持'],[1,'支持']];
hz.annuity_annuityPlanStatus=[[1,'有效'],[2,'客户取消'],[3,'终止'],[9,'已完成']];
hz.annuity_annuityPlanType=[[1,'设置计划'],[2,'单次计划']];
hz.annuity_payStatus=[[1,'支付失败'],[2,'支付成功']];
hz.annuity_applyStatus=[[1,'待申请'],[3,'申请异常'],[4,'申请失败'],[9,'申请成功']];
hz.annuity_applyType=[[1,'首次投入'],[2,'定期追加'],[3,'单次追加']];

hz.getEnumDesc = function(val,enumConstant){
	if(!hz.isNull(val)){
		var enumDesc = "";
		$.each(enumConstant,function(n,value) {
			if(value[0] ==val){
				enumDesc = value[1];
				return false;
			}
		});
		return enumDesc;
	}
	return val;
};




var maskDiv,maskMsg;
//加载效果
hz.loadMsg = function(msg){
	if(hz.isNull(msg)){
		msg = "正在处理,请稍等....";
	}
	if(!maskDiv){
        maskDiv = $("<div class=\"datagrid-mask mymask\" style=\"z-index:90003;\"></div>").appendTo("body");  
    }  
    if(!maskMsg){  
        maskMsg = $("<div class=\"datagrid-mask-msg mymask\" style=\"z-index:90003;\" >"+msg+"</div>")  
            .appendTo("body").css({'font-size':'12px'});  
    }
    maskDiv.css({width:"100%",height:$(document).height()});  
    var scrollTop = $(document.body).scrollTop();  
    maskMsg.css({  
        left:( $(document.body).outerWidth(true) - 190 ) / 2  
        ,top:( ($(window).height() - 45) / 2 ) + scrollTop  
    });
    maskDiv.show();  
    maskMsg.html(msg).show();
};

//提示信息,自动消失
hz.unLoadMsg = function(){
	if(maskDiv){
		maskDiv.hide();  		
	}
	if(maskMsg){
		maskMsg.hide();		
	}
};

hz.alert = function(msg, icon, title){
	var _title = '提示信息';
	var _icon = 'info';
	if(title){
		_title = title;
	}
	if(icon){
		_icon = icon;
	}
	$.messager.alert(_title, msg, _icon);
};
 
/**
 * 校验是否为空(先删除二边空格再验证)
 * result: true：为空;false相反
 */
hz.isNull = function(str){
	if(str==undefined){
		return true;
	}
	if(typeof(str) == "string"){
		str = $.trim(str);
		if (null == str || "" == str || 'undefined'==str) {
			return true;
		} else {
			return false;
		}
	}else{
		if(str!==null){
			return false;
		}else{
			return true;
		}
	}
};


hz.isDigit = function (str) {
	var patrn = /^\d+$/;
	return patrn.test(str);
};
//校验电邮地址
hz.isEmail = function (str) {
	var patrn = /^[\w-\.\_]+@[\w-]+(\.[\w-]+)+$/;
	return patrn.test(str);
};
//校验手机号码
hz.isMobile = function (str) {
	var patrn = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	return patrn.test(str);
};

//提交post请求，传入callBack方法
hz.postForCallBack = function(url, data, callBack,completeInvoke){
	data = hz.parseStrToJson(data);
	$.ajax({
		cache:false,
		type : "post",
		data: data,
		dataType : "json",
		timeout:60000,
		url : hz.basePath + url,
		success : function(data) {
			if(callBack){
				callBack(data.map);
			}
		},
		error : function(err) {
			if(callBack){
				callBack(err);
			}
		},
		complete:function(){
			if(completeInvoke){
				completeInvoke();
			}
		}
	});
};

/**
 * 添加窗口页面
 */
hz.openWindowTab = function(menuId,tabtitle, url, icon){
	try{
		top.addTab(url,menuId,tabtitle);
	}catch(e){}
	try{
		parentOpeate.addTab(tabtitle, url,'icon icon-nav');		
	}catch(e){}
};

/**
 * 关闭当前TAB页
 */
hz.closeWindowTab = function(){
	try{
		top.closeTab('close');
	}catch(e){}
	try{
		parentOpeate.closeTabCurrent();		
	}catch(e){}
};

/**
 * 刷新当前TAB页
 */
hz.refreshWindowTab = function(){
	try{
		top.closeTab('refresh');
	}catch(e){}
	try{
		parentOpeate.refreshTab(parentOpeate.tabName);		
	}catch(e){}
};

/**
 * 解析json字符串成json对象
 * @param {Object} data
 * @return {TypeName} 
 */
hz.parseJson = function(data){
	if(typeof(data)=='string'){
		if(typeof(JSON) =='undefined'){
			data = eval("("+data+")");
		}else{
			data = JSON.parse(data);
		}
	}
	if(data.statusText=='timeout'){
		data.status=false;
		data.msg="请求超时，请重新操作";
		return data;
	}
	if(data.status=="101"){
		data.status=true;
	}else if(data.status=="102"){
		data.status=false;
	}else if(data.status=="103"){
		data.status=false;
		$.messager.alert("提示信息","访问超时,请重新登录","error",function(){
			self.top.location.href=data.redirectUrl;
			throw new Error("timeout");
		});
		throw new Error("timeout");
		return data;
	}else{
		data.status=false;
		data.msg="系统异常,请重新操作";
		return data;
	}
	return data;
};

hz.parseStrToJson = function(data){
	if(typeof(data)=='string'){
		if(typeof(JSON) =='undefined'){
			data = eval("("+data+")");
		}else{
			data = JSON.parse(data);
		}
	}
	return data;
};



