
'use strict';
App.Views.GradeView = Backbone.View.extend({
    el: $("#gradeList"),
	
    initialize: function(){        
		
        App.room = new App.Models.RoomModel({id:1,name:'101'});
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
        console.log(App.room);
		$('#gradeList tbody').html(gradeTemplate({room:App.room}));
        $('#topList tbody').html(topTemplate({list:App.topList}));
        App.loading();
    }
});
App.Views.WeekView = Backbone.View.extend({
    el: $("#gradeList"),
	
    initialize: function(){
        App.weekList = new App.Collections.WeekList;
        this.render();
    },
    render: function() {
        
        App.weekList.add(new App.Models.WeekModel({id:1,name:'8周'}));
        App.weekList.add(new App.Models.WeekModel({id:2,name:'9周'}));
        App.weekList.add(new App.Models.WeekModel({id:3,name:'10周'}));
        App.weekList.add(new App.Models.WeekModel({id:4,name:'11周'}));
        var template = _.template($("#selectWeekTemplate").html());
        $('#selectBox .select-list').html(template({list:App.weekList})).find('li').click(function(){
            $('#selectWeek').text($(this).text());
            $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
            App.loading(true);
            setTimeout(function() {
                App.loading();
            }, 1000);
        });
    }
});