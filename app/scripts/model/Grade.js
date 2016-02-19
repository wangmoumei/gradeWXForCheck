App.Models.GradeModel = Backbone.Model.extend({
    defaults: {
        code:0,
        xh:0,
        name: "",
        universityid: "",
        vkey: 0,
        score:0,
        minus:0
    },
    initialize:function(){
        if(typeof this.attributes.vkey != 'number') {
            this.attributes.vkey = parseInt(this.attributes.vkey);
        }
        if(typeof this.attributes.score != 'number') {
            this.attributes.score = parseInt(this.attributes.score);
        }
        this.attributes.minus = this.attributes.score - this.attributes.vkey;
    }
});
App.Collections.GradeList = Backbone.Collection.extend({
    initialize: function() {
    },
    model: App.Models.GradeModel,
    url: ''
});