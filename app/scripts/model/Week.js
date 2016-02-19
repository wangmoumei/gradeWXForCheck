App.Models.WeekModel = Backbone.Model.extend({
    defaults: {
        week: 0
    }
});
App.Collections.WeekList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.WeekModel,
    url: ''
});