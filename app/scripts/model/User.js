App.Models.UserModel = Backbone.Model.extend({
    defaults: {
        id:0,
		areaid:0,
		flatid:0,
		roomid:0,
        name: ''
    }
});
App.Collections.UserList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.UserModel,
    url: ''
});