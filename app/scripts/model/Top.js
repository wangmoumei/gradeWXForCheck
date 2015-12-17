App.Models.TopModel = Backbone.Model.extend({
    defaults: {
        id:0,
        name: '',
        grade:0
    }
});
App.Collections.TopList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.TopModel,
    url: ''
});