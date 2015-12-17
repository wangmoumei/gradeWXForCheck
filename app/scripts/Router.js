App.Routers.AppRouter = Backbone.Router.extend({
	routes : {  
        '?:openId' : 'index', 
		'index?:openId' : 'index',
        'login' : 'login',
        '*error' : 'index'  
    },  
    index : function(openid) { 
        App.openid = App.openid || openid || 'aaa';
        App.zIndex=1;
        $('section.show').removeClass('show fadeIn').addClass('fadeOut');
        App.loading(true);
        /*$.ajax({
                url:App.URL.getUser,
                data:{
                    openid:App.openid
                },
                type:'POST',
                dataType:'JSON',
                success:function(response){
                    console.log(response);
                    App.user = new App.Models.UserModel(JSON.parse(response));
                    location.href="/";
                },error:function(){
                    $.tips({
                        content:'登录失败，请重试！',
                        stayTime:2000,
                        type:"warn"
                    });
                    App.loading();
                }
            });*/
        
        if(App.openid != 'aaa' && !App.user){
            location.href = '#login';
            return;
        }else{
            App.user = App.user || new App.Models.UserModel({name:'王同学',areaid:1,flatid:1,roomid:1,openid:App.openid});
            
            if(this.indexView)
                this.indexView.render();
            else
                this.indexView = new App.Views.GradeView();
            if(this.weekView){
                this.weekView.render();
            }else{
                this.weekView = new App.Views.WeekView();
            }
            App.loading();
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
    new App.Routers.AppRouter();  
     
    Backbone.history.start();
    //location.href='#';
});