
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
			App.areaList = new App.Collections.AreaList;
			App.areaList.add(new App.Models.AreaModel({'name':'东门公寓',id:'1'}));
			App.areaList.add(new App.Models.AreaModel({'name':'南门公寓',id:'2'}));
			App.areaList.add(new App.Models.AreaModel({'name':'西区公寓',id:'3'}));
			App.areaList.add(new App.Models.AreaModel({'name':'西区宿舍',id:'4'}));
			App.areaList.add(new App.Models.AreaModel({'name':'北区二村',id:'5'}));
			App.areaList.add(new App.Models.AreaModel({'name':'本部公寓',id:'6'}));
			App.areaList.add(new App.Models.AreaModel({'name':'本部宿舍',id:'7'}));
			App.areaList.add(new App.Models.AreaModel({'name':'甬江公寓',id:'8'}));
			this.refresh();
		}
    },
	refresh:function(){
		if(App.user){
			App.areaid = App.user.get('areaid');
			App.flatid = App.user.get('flatid');
			App.roomid = App.user.get('roomid');
			
			var area = _.find(App.areaList.models,function(a){return a.get('id') == App.areaid;});
			App.flatList = new App.Collections.FlatList;
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#1',id:'1'}));
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#2',id:'2'}));
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#3',id:'3'}));
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#4',id:'4'}));
			
			App.roomList = new App.Collections.RoomList;
			App.roomList.add(new App.Models.RoomModel({'name':'101',id:'1'}));
			App.roomList.add(new App.Models.RoomModel({'name':'102',id:'2'}));
			App.roomList.add(new App.Models.RoomModel({'name':'103',id:'3'}));
			App.roomList.add(new App.Models.RoomModel({'name':'104',id:'4'}));
			App.roomList.add(new App.Models.RoomModel({'name':'201',id:'5'}));
			App.roomList.add(new App.Models.RoomModel({'name':'202',id:'6'}));
			App.roomList.add(new App.Models.RoomModel({'name':'301',id:'7'}));
			App.roomList.add(new App.Models.RoomModel({'name':'302',id:'8'}));
			App.roomList.add(new App.Models.RoomModel({'name':'401',id:'9'}));
			App.roomList.add(new App.Models.RoomModel({'name':'402',id:'10'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1101',id:'11'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1102',id:'12'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1103',id:'13'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1201',id:'14'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1202',id:'15'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1203',id:'16'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1301',id:'17'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1302',id:'18'}));
			this.render();
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
			var area = App.areaList.models[(parseInt(event.target.value))];
			App.areaid = area.get('id');
			App.flatList = new App.Collections.FlatList;
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#1',id:'1'}));
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#2',id:'2'}));
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#3',id:'3'}));
			App.flatList.add(new App.Models.FlatModel({'name':area.get('name') + '#4',id:'4'}));
			App.roomList = null;
			App.flatid = 0;
			this.render();
		}
	},
    selectFlat:function(){
		if(parseInt(event.target.value)>-1){
			var flat = App.flatList.models[(parseInt(event.target.value))];
			App.flatid = flat.get('id');
			App.roomList = new App.Collections.RoomList;
			App.roomList.add(new App.Models.RoomModel({'name':'101',id:'1'}));
			App.roomList.add(new App.Models.RoomModel({'name':'102',id:'2'}));
			App.roomList.add(new App.Models.RoomModel({'name':'103',id:'3'}));
			App.roomList.add(new App.Models.RoomModel({'name':'104',id:'4'}));
			App.roomList.add(new App.Models.RoomModel({'name':'201',id:'5'}));
			App.roomList.add(new App.Models.RoomModel({'name':'202',id:'6'}));
			App.roomList.add(new App.Models.RoomModel({'name':'301',id:'7'}));
			App.roomList.add(new App.Models.RoomModel({'name':'302',id:'8'}));
			App.roomList.add(new App.Models.RoomModel({'name':'401',id:'9'}));
			App.roomList.add(new App.Models.RoomModel({'name':'402',id:'10'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1101',id:'11'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1102',id:'12'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1103',id:'13'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1201',id:'14'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1202',id:'15'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1203',id:'16'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1301',id:'17'}));
			App.roomList.add(new App.Models.RoomModel({'name':'1302',id:'18'}));
			App.floor = 0;App.roomid = 0;
			this.render();
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
		App.user = new App.Models.UserModel({
			id:1,
			areaid:App.areaid,
			flatid:App.flatid,
			roomid:parseInt($('#selectRoom').val()),
			name: '王同学1'
		})
		location.href="#index";
		/*$.ajax({
			url:App.URL.getUser,
			data:{
				username:username.val(),
				password:password.val(),
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
					content:'绑定失败，请重试！',
					stayTime:2000,
					type:"warn"
				});
				App.loading();
			}
		});*/
    }
});
