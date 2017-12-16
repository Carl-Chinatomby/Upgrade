/*
// Step 1 original code
$(document).ready(function() {
    $('#new-status form').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/status',
            type: 'POST',
            dataType: 'json',
            data: { text: $('#new-status textarea').val() },
            success: function(data) {
                $('#statuses ul').append('<li>' + data.text + '</li>');
                $('#new-status textarea').val('');
            }
        });
    });
});
*/
var events = _.clone(Backbone.Events);

var Status = Backbone.Model.extend({
    url: '/status'
});

var Statuses = Backbone.Collection.extend({
    model: Status
})

var NewStatusView = Backbone.View.extend({
    events: {
        'submit form': 'addStatus'
    },

    initialize: function(options) {
        this.collection.on('add', this.clearInput, this);

    },

    addStatus: function (e) 
        e.preventDefault();

        this.collection.create({ text: this.$('textarea').val() });
    },

    clearInput: function() {
        this.$('textarea').val('');
    }

});

var StatusesView = Backbone.View.extend({ 
    initialize: function(options) {
        this.collection .on('add', this.appendStatus, this);
    },

    appendStatus: function(status) {
        this.$('ul').append('<li>' + status.escape("text") + '</li>');
    }

});


StatusesView.prototype.$ = function(selector) {
    return this.el.find(selector);
}


$(document).ready(function() {
    var statuses = new Statuses();
    
    new NewStatusView({el: $('#new-status'), statuses: statuses});
    new StatusesView({el: $('#statuses'), statuses: statuses});
});