$(function () {
  $.Modal = function () {
    if(!$('#modal-alert').length){
        var _alert_html='<div id="modal-alert" class="modal" style="z-index:99999"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h5 class="modal-title"><span class="glyphicon "></span> [Title]</h5></div><div class="modal-body small"><p >[Message]</p></div><div class="modal-footer" ><button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button><button type="button" class="btn btn-primary ok" data-dismiss="modal">确定</button></div></div></div></div>';
        $(document.body).append(_alert_html);
    }
    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
    var alr = $("#modal-alert");
    var ahtml = alr.html();
    
    var _alert = function (title,msg,callback,icon) {
      alr.html(ahtml);	// 复原
      alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
      alr.find('.cancel').hide();
      alr.find('.modal-title').children('span').removeClass().addClass('glyphicon').addClass(_getIconClass(icon));
      if(!icon){
    	  icon = 'info';
      }
      _dialog(msg,icon,title);
      if (callback && callback instanceof Function) {
          alr.find('.ok').click(function () { callback(true)});
      }
    };
    
    var _getIconClass =function(icon){
    	if(icon){
    		if(icon == 'warn'){
    			return 'glyphicon glyphicon-exclamation-sign';
    		}else if(icon == 'error'){
    			return 'glyphicon-remove-sign';
    		}else if(icon == 'question'){
    			return 'glyphicon-question-sign';
    		}
    	}
    	return 'glyphicon-info-sign';
    };
    
    
    var _confirm = function (title,msg,callback,icon) {
      alr.html(ahtml); // 复原
      alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
      alr.find('.cancel').show();
      _dialog(msg,icon,title);
      if (callback && callback instanceof Function) {
          alr.find('.ok').click(function () { callback(true)});
          alr.find('.cancel').click(function () { callback(false)});
      };
    };

    var _dialog = function (msg,icon,title) {
      alr.find('.modal-title').children('span').removeClass().addClass('glyphicon').addClass(_getIconClass(icon));
      var html = alr.html().replace(reg, function (node, key) {
        return {
          Title: title,
          Message: msg,
        }[key];
      });
      alr.html(html);
      alr.modal({
        backdrop: 'static'
      });
    };
    return {
      alert: _alert,
      confirm: _confirm
    };
  }();
});