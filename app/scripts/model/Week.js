App.Models.WeekModel = Backbone.Model.extend({
    defaults: {
        id:0,
        name: '12周'
    }
});
App.Collections.WeekList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.WeekModel,
    url: ''
});