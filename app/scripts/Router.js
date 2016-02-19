App.Routers.AppRouter = Backbone.Router.extend({
	routes : {  
        '?:openId&:universityId' : 'index', 
		'index?:openId&:universityId' : 'index',
        'login' : 'login',
        '*error' : 'index'  
    },  
    index : function(openId, universityId) { 
        //App.openid = App.openid || openid || 'aaa';
        App.openid = App.openid || (location.href.split('?')[1]||'').split('&')[0]||null;
        if(!App.openid || App.openid == ''){
            $('#gradeList').html(
                '<div class="my-notice" style = "height:'
                + (document.documentElement.clientHeight - 180) 
                +'px"><i class="ui-icon-warn-lg"></i><p>登录失败啦！（缺乏身份标识）</p>'
                +'<div class="btn-box"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>'
            ); 
            App.loading();
            return;
        }
        else{
            App.openid = App.openid.split('#')[0] || App.openid;
        }
        App.UniversityId= App.UniversityId || (location.href.split('?')[1]||'').split('&')[1]||null;
        if(!App.UniversityId){
            $('#gradeList').html(
                '<div class="my-notice" style = "height:'
                + (document.documentElement.clientHeight - 180) 
                +'px"><i class="ui-icon-warn-lg"></i><p>登录失败啦！（缺乏学校标识）</p>'
                +'<div class="btn-box"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>'
            ); 
            App.loading();
            return;
        }else{
            App.UniversityId = App.UniversityId.split('#')[0] || App.UniversityId;
        }
        
        App.zIndex=1;
        $('section.show').removeClass('show fadeIn').addClass('fadeOut');
        App.loading(true);
        var that = this;
        if(!App.user || !App.weeknum || !App.weekList){
            console.log('重新拉取资料');
            $.ajax({
                url:App.URL.login + App.openid + '/' + App.UniversityId,
                type:'GET',
                dataType:'JSON',
                success:function(response){
                    var result = JSON.parse(response);
                    if(result.message == 'success' || result.message == 'null'){
                        App.room = new App.Models.RoomModel({roomid:result.roomid,roomname:result.roomname});
                        App.user = App.user || new App.Models.UserModel({areaid:result.areaid,flatid:result.flatid,roomid:result.roomid,openid:App.openid});
                        App.weeknum = result.nowweeknum || result.weeknum;
                        if(result.weeklist && result.weeklist.length>0)
                            App.weekList = new App.Collections.WeekList(result.weeklist);
                        else
                            App.weekList = null;
                        if(result.list && result.list.length >0){
                            App.gradeList = new App.Collections.GradeList(result.list);
                        }
                        else{
                            App.gradeList = null;
                        }
                        $('#selectWeek').text(App.weeknum + '周');
                        if(App.indexView)
                            App.indexView.render();
                        else
                            App.indexView = new App.Views.GradeView();
                        if(that.weekView){
                            that.weekView.render();
                        }else{
                            that.weekView = new App.Views.WeekView();
                        }
                    }else{
                        $.tips({
                            content:'先来完善资料吧！',
                            stayTime:2000,
                            type:"warn"
                        });
                        location.href="#login";
                        App.loading();
                    }
                },error:function(){
                    $.tips({
                        content:'登录失败，请重试！',
                        stayTime:2000,
                        type:"warn"
                    });
                    $('#gradeList').html(
                        '<div class="my-notice" style = "height:'
                        + (document.documentElement.clientHeight - 180) 
                        +'px"><i class="ui-icon-warn-lg"></i><p>登录失败啦！</p>'
                        +'<div class="btn-box"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>'
                    ); 
                    $('#topList').html(
                        '<div class="my-notice" style = "height:'
                        + (document.documentElement.clientHeight - 180) 
                        +'px"><i class="ui-icon-warn-lg"></i><p>登录失败啦！</p>'
                        +'<div class="btn-box"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>'
                    ); 
                    App.loading();
                }
            });
        }
        else{
            $('#selectWeek').text(App.weeknum + '周');
            if(App.indexView)
                App.indexView.render();
            else
                App.indexView = new App.Views.GradeView();
            if(this.weekView){
                this.weekView.render();
            }else{
                this.weekView = new App.Views.WeekView();
            }
        }
    },
    login : function() { 
        App.loading();
        App.zIndex ++;
        $('#login').removeClass('hide fadeOut').addClass('show fadeIn').css('zIndex',App.zIndex);
        if(this.loginView){
            this.loginView.refresh();
        }else{
            this.loginView = new App.Views.UserInfoView();
        }
        
    },
    renderError : function(error) {  
        console.log('URL错误, 错误信息: ' + error);  
    }  
}); 
$('section').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    if($(this).hasClass('fadeOut'))
        $(this).removeClass('show').addClass('hide').css('zIndex',App.zIndex);
});
$(function(){
    var router = new App.Routers.AppRouter();  
     
    Backbone.history.start();
    //location.href='#';
});