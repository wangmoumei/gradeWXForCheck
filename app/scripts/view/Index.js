
'use strict';
App.Views.GradeView = Backbone.View.extend({
    el: $("#gradeList"),
	
    initialize: function(){        
        App.topList = new App.Collections.TopList;
        App.topList.add(new App.Models.TopModel({name:'楼栋#1',grade:99,id:1}));
        App.topList.add(new App.Models.TopModel({name:'楼栋#2',grade:98,id:2}));
        App.topList.add(new App.Models.TopModel({name:'楼栋#3',grade:97,id:3}));
        App.topList.add(new App.Models.TopModel({name:'楼栋#4',grade:96,id:4}));
        App.topList.add(new App.Models.TopModel({name:'楼栋#5',grade:95,id:5}));
        this.render();
    },

    render: function() {
        var gradeTemplate = _.template($("#gradeTableTemplate").html());
		var topTemplate = _.template($("#topTableTemplate").html());
        if(App.gradeList){
		  $('#gradeList').html(gradeTemplate({grade:App.gradeList}));
        }else{
            $('#gradeList').html('<div class="my-notice" style = "height:'+ (document.documentElement.clientHeight - 180) +'px"><i class="ui-icon-warn-lg"></i><p>暂无打分记录</p></div>')
        }
        $('#gradeIndex header h1').text(App.room.get('roomname'));
        //$('#topList').html(topTemplate({list:App.topList}));
        App.loading();
    }
});
App.Views.WeekView = Backbone.View.extend({
    el: $("#selectBox .select-list"),
	
    initialize: function(){
        this.render();
    },
    render: function() {
        if(App.weekList && App.weekList.length > 0){
            var template = _.template($("#selectWeekTemplate").html());
            $('#selectBox .select-list').html(template({list:App.weekList,now:App.weeknum})).find('li').click(function(){
                var week = parseInt($(this).attr('data-real'));
                if(App.weeknum != week){
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                    $('#selectWeek').text(week + '周');
                    App.weeknum = week;
                    App.loading(true);
                    $.ajax({
                        url:App.URL.getRoomGrade + App.user.get('roomid') + '/' + App.weeknum,
                        type:'GET',
                        dataType:'JSON',
                        success:function(response){
                            var result = JSON.parse(response);
                            if(result.message == 'success'){
                                App.gradeList = new App.Collections.GradeList(result.list);
                                App.indexView.render();
                            }
                            else{
                                $.tips({
                                    content:result.message,
                                    stayTime:10000,
                                    type:"warn"
                                });
                                App.gradeList = null;
                            }
                            
                        },error:function(){
                            $.tips({
                                content:'查询寝室分数失败，请重试！',
                                stayTime:10000,
                                type:"warn"
                            });
                            App.gradeList=null;
                            $('#gradeList').html(
                                '<div class="my-notice" style = "height:'
                                + (document.documentElement.clientHeight - 180) 
                                +'px"><i class="ui-icon-warn-lg"></i><p>登录失败啦！</p>'
                                +'<div class="btn-box"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>'
                            ); 
                            App.loading();
                        }
                    });
                }
            });
            $('#selectBox h4').text('选择');
        }else{
            $('#selectBox h4').text('暂无历史成绩记录');
        }
    }
});