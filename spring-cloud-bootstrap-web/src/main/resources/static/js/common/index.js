var menusArray = [];
var _menus = {"menus": menusArray};
$(document).ready(function () {loadMenus();});

function loadMenus() {
    $.getJSON('home/GetMenu', function (data) {menusArray = data;_menus.menus = menusArray;initLeftMenu(_menus);});
}

//初始化左侧
function initLeftMenu(menus) {
    $.each(menus.menus, function (i, n) {
        var menulist = '';
        menulist += '<li>';
        menulist += '<a class="nav-submenu" data-toggle="nav-submenu" href="javascript:;"><i class="si si-wrench"></i><span class="sidebar-mini-hide">'
			+ n.menuname + '</span></a>';
        if (n.menus && n.menus.length > 0) {
            menulist += '<ul>';
            $.each(n.menus, function (j, o) {
                menulist += '<li><a ref="' + o.menuid
					+ '" href="javascript:;" rel="' + o.url
					+ '" class="J_menuTab">' + o.menuname
					+ '</a></li>';
                if (o.child && o.child.length > 0) {
                    menulist += '<ul>';
                    $.each(o.child, function (k, p) {
                        menulist += '<li><a ref="' + p.menuid
								+ '" href="javascript:;" rel="' + p.url
								+ '" class="J_menuTab">' + p.menuname
								+ '</a></li>'
                    });
                }
            });
            menulist += '</ul>';
        }
        menulist += '</li>';
        $("#left-nav-container").append(menulist);
    });
    $(".nav-submenu").click(function () { $(this).parent('li').toggleClass('open'); });
    $(".J_menuTab").click(function () {
        var tabTitle = $(this).text();
        var url = $(this).attr("rel");
        var menuId = $(this).attr("ref");
        addTab(url,menuId,tabTitle);
    }).hover(function () {
        $(this).parent().addClass("hover");
    }, function () {
        $(this).parent().removeClass("hover");
    });

    $("#page-tabs-content").click(function (e) {
        var obj = e ? e.target : event.srcElement;
        if (obj.tagName == "A") {
            $("#page-tabs-content a").attr("class", "J_menuTab");
            $(obj).attr("class", "J_menuTab active");
            var menuId = $(obj).attr("ref");
            $(".J_iframe").css("display", "none");
            $("#iframe" + menuId).css("display", "block");
        }
    });
}

function addContextMenuEvent(_target){
	$(_target).contextPopup({
        title: '',
        items: [
          {label:'刷新',icon:'image/refresh.png',action:function(e,_this) {
        	  refreahMenuTab(_this);
          }},
          null, // divider
          {label:'关闭',icon:'image/remove.png',action:function(e,_this) {
        	  removeCurrentMenuTab(_this);
          }},
          {label:'关闭所有',icon:'image/remove.png',action:function(e,_this) {
        	  removeOtherMenuTab(_this,true);
          }},
          {label:'关闭其他',icon:'image/remove.png',action:function(e,_this) {
        	  removeOtherMenuTab(_this,false);
          }}
        ]
      });
}

//删除按钮
function removeMenuTab() {
    var e = arguments.callee.caller.arguments[0] || window.event;
    var obj = e.srcElement ? e.srcElement : e.target;
    var parentObj = $(obj).parent();
    removeCurrentMenuTab(parentObj);
}

function addTab(url, menuId, tabTitle) {
    var exists = false;
    $("#page-tabs-content a").attr("class", "J_menuTab");
    $(".J_iframe").css("display", "none");
    $("#page-tabs-content a").each(function () {
        if ($(this).text() == tabTitle) {
            $(this).attr("class", "J_menuTab active");
            $("#iframe" + menuId).css("display", "block");
            exists = true;
        }
    });
    if (!exists) {
        var newTab = '<a ref="' + menuId + '" rel="' + url + '" href="javascript:;" class="J_menuTab active" data-id="welcome">' + tabTitle + '<i class="fa fa-times-circle" onclick="removeMenuTab();"></i></a>';
        $("#page-tabs-content").append(newTab);
        addContextMenuEvent($("#page-tabs-content > a[ref="+menuId+"]")[0]);
        var newIframe = '<iframe class="J_iframe" name="iframe' + menuId + '" id="iframe' + menuId + '" width="100%" height="100%" src="' + url + '" frameborder="0" data-id="menuId_' + menuId + '" seamless></iframe>';
        $("#content-main").append(newIframe);
        slideRightTab();
    }
}

function removeOtherMenuTab(_this,isAll){
	var parentObj = $(_this);
    var cuurentMenuId = $(parentObj).attr("ref");
    $("#page-tabs-content a").attr("class", "J_menuTab");
    $(".J_iframe").css("display", "none");
    
    $("#page-tabs-content a").each(function () {
        var _menuId = $(this).attr("ref");
        if(_menuId == "index"){
        	if(isAll){
        		$(this).attr("class", "J_menuTab active");
	            $("#iframe" + _menuId).css("display", "block");
        	}
        	return true;
        }
    	if (_menuId == cuurentMenuId) {
    		if(!isAll){
    			$(this).attr("class", "J_menuTab active");
	            $("#iframe" + cuurentMenuId).css("display", "block");
	            return true;
    		}
        }
    	$(this).remove();
        $("#iframe" + _menuId).remove();
    });
}


function removeCurrentMenuTab(_this){
	var parentObj = $(_this);
    var menuId = $(parentObj).attr("ref");
    $("#page-tabs-content a").attr("class", "J_menuTab");
    $(".J_iframe").css("display", "none");
    if(menuId == "index"){
    	return ;
    }
    if ($(parentObj).next() && $(parentObj).next().length > 0) {
        var currentObj = $(parentObj).next()[0];
        $(currentObj).attr("class", "J_menuTab active");
        var nextMenuId = $(currentObj).attr("ref");
        $("#iframe" + nextMenuId).css("display", "block");
    } else {
        var currentObj = $(parentObj).prev();
        if(currentObj && currentObj.length > 0){
	        currentObj = currentObj[0];
        	$(currentObj).attr("class", "J_menuTab active");
        	var prevMenuId = $(currentObj).attr("ref");
        	$("#iframe" + prevMenuId).css("display", "block");
        }
    }
    $(parentObj).remove();
    $("#iframe" + menuId).remove();
}


function refreahMenuTab(_this){
	var parentObj = $(_this);
    var menuId = $(parentObj).attr("ref");
    $("#iframe" + menuId).attr('src',$("#iframe" + menuId).attr('src'));
}

function slideRightTab(){
	var _width = parseInt($(".page-tabs").css("margin-left"));
	var _tab_fix_width = $(".content-tabs").width();
	var _cruurent_tabs = $("#page-tabs-content").width() +80;
	if(_cruurent_tabs > _tab_fix_width){
		var _tab_offset = _tab_fix_width - _cruurent_tabs + 40;
		if((_width) > _tab_offset){
			slideTabs(_tab_offset);
		}
	}
}

function slideLeftTab(){
	var _width = parseInt($(".page-tabs").css("margin-left")) + 120;
	if(_width >40){
		_width = 40;
	}
	slideTabs(_width);
}

function slideTabs(val){
	$(".page-tabs").animate({'margin-left':val},200);
}




function delTab(element) {
    var iframe;
    $("iframe").each(function () {
        if (element.ownerDocument === this.contentWindow.document) {
            iframe = this;
        }
        return !iframe;
    });
    var menuId = iframe.id.replace("iframe", "");

    var menu = $(".page-tabs-content .J_menuTab[ref='" + menuId + "']");
    var currentObj;
    if (menu.next() && menu.next().length > 0) {
        currentObj = menu.next();
    } else {
        currentObj = menu.prev();
    }
    currentObj.attr("class", "J_menuTab active");
    $("#iframe" + $(currentObj).attr("ref")).css("display", "block");

    menu.remove();
    $(iframe).remove();
}

function delTabAndRefresh(element, refreshMenuId) {
    delTab(element);
    document.getElementById("iframe" + refreshMenuId).contentWindow.location.reload(true);
}

function delTabAndClick(element, refreshMenuId, clickEleId) {
    delTab(element);
    if (!clickEleId) {
        clickEleId = "btnSearch";
    }
    document.getElementById("iframe" + refreshMenuId).contentWindow.document.getElementById(clickEleId).click();
}