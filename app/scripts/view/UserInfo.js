
'use strict';
App.Views.UserInfoView = Backbone.View.extend({
    el: $("#login"),
	events: {
        'change #selectArea': 'selectArea',
        'change #selectFlat': 'selectFlat',
		'change #selectFloor': 'selectFloor',
		'click #userSave': 'userSave'
    },
    initialize: function(){
		if(App.areaList){
			this.refresh();
		}else{
            var that = this;
            if(!App.UniversityId){location.href="#"; return;}
			App.areaList = new App.Collections.AreaList;
			App.areaList.fetch({
                url:App.URL.getArea + App.UniversityId,
                success:function(collection,response){  
                    that.refresh();
                },error:function(){
                    $.tips({
                        content:'查询生活区信息失败，请重试！',
                        stayTime:10000,
                        type:"warn"
                    });
                    $('#login').html('<div class="ui-notice"><i></i><p>查询生活区信息失败</p><div class="ui-notice-btn"><button class="ui-btn-danger ui-btn-lg" onclick="location.reload()">刷新</button></div></div>')
                    App.areaList=null;
                    App.loading();
                }
            });
			
		}
    },
	refresh:function(){
		if(App.user){
			App.areaid = App.user.get('areaid');
			App.flatid = App.user.get('flatid');
			App.roomid = App.user.get('roomid');
			
			var area = _.find(App.areaList.models,function(a){return a.get('id') == App.areaid;});
			var that = this;
            this.getFlat(function(){
                that.getRoom(function(){
                    that.render();
                });
            });
		}
		else
			this.render();
	},
    render: function() {
        var template = _.template($("#selectLoginTemplate").html());
		
		$("#login").html(template({
			areas:{list:App.areaList,chosen:App.areaid || 0},
			flats:{list:App.flatList || null,chosen:App.flatid || 0},
			rooms:{list:App.roomList || null,floor:App.floor||0,chosen:App.roomid || 0}
			}));
        	
        App.loading();
    },
	selectArea:function(){
		if(parseInt(event.target.value)>-1){
			var area = App.areaList.models[(parseInt(event.target.value))],that = this;
			App.areaid = area.get('areaid');
			this.getFlat(function(){
                App.roomList = null;
                App.flatid = 0;
                that.render();
            });
			
		}
	},
    selectFlat:function(){
		if(parseInt(event.target.value)>-1){
			var flat = App.flatList.models[(parseInt(event.target.value))],that = this;
			App.flatid = flat.get('flatid');
			this.getRoom(function(){
                App.floor = 0;App.roomid = 0;
                that.render();
            });
			
		}
    },
    selectFloor:function(){
        App.floor = parseInt(event.target.value);
		App.roomid = 0;
		this.render();
    },
    userSave:function(){
		var area = $('#selectArea'),flat = $('#selectFlat'),room = $('#selectRoom'),that = this;
		if(!App.areaid){
			$.tips({
				content:'请选择生活区！',
				stayTime:2000,
				type:"warn"
			});
			return;
		}
		if(!App.flatid){
			$.tips({
				content:'请选择楼栋！',
				stayTime:2000,
				type:"warn"
			});
			return;
		}
		
		$.ajax({
			url:App.URL.setUser,
			data:{
				roomid:$('#selectRoom').val(),
				openid:App.openid
			},
			type:'POST',
			dataType:'JSON',
			success:function(response){
                var result = JSON.parse(response);
                App.room = new App.Models.RoomModel({roomid:result.roomid,roomname:result.roomname});
                App.weeknum = result.nowweeknum || result.weeknum;
                App.weekList = new App.Collections.WeekList(result.weeklist);
                if(result.message = 'success' && result.list.length > 0){
                    App.gradeList = new App.Collections.GradeList(result.list);
                }else{
                    App.gradeList = null;
                }
				App.user = new App.Models.UserModel({areaid:result.areaid,flatid:result.flatid,roomid:result.roomid,openid:App.openid});
				location.href="#index";
			},error:function(){
				$.tips({
					content:'绑定失败，请重试！',
					stayTime:2000,
					type:"warn"
				});
				App.loading();
			}
		});
    },
    getFlat:function (fun) {
        App.loading(true);
        App.flatList = new App.Collections.FlatList;
        App.flatList.fetch({
            url:App.URL.getFlat + App.areaid,
            success:function(collection,response){  
                App.loading();
                if(fun)fun();
            },error:function(){
                $.tips({
                    content:'查询楼栋信息失败，请重试！',
                    stayTime:10000,
                    type:"warn"
                });
                App.flatList=null;
                App.loading();
            }
        });
    },
    getRoom:function(fun){
        App.loading(true);
        App.roomList = new App.Collections.RoomList;
        App.roomList.fetch({
            url:App.URL.getRoom + App.flatid,
            success:function(collection,response){  
                App.loading();
                if(fun) fun();
            },error:function(){
                $.tips({
                    content:'查询寝室信息失败，请重试！',
                    stayTime:10000,
                    type:"warn"
                });
                App.roomList=null;
                App.loading();
            }
        });
    }
});
