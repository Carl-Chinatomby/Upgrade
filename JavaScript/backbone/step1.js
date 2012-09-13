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

var Statuses = function() {
}

Statuses.prototype.add = function(text){
    $.ajax({
        url: '/status',
        type: 'POST',
        dataType: 'json',
        data: { text: text },// options.data
        success: function(data) {
            events.trigger('status:add', data.text);
        }
    });
}

var NewStatusView = Backbone.View.extend({
    initialize: function(options) {
        this.statuses = options.statuses;

        events.on('status:add', this.clearInput, this);

        var add = $.proxy(this.addStatus, this);
        this.$('form').submit(add);
    },

    addStatus: function (e) 
        e.preventDefault();

        this.statuses.add(this.$('textarea').val());
    },

    clearInput: function() {
        this.$('textarea').val('');
    }

});

var StatusesView = Backbone.View.extend({ 
    initialize: function(options) {
        events.on('status:add', this.appendStatus, this);
    },

    appendStatus: function(text) {
        this.$('ul').append('<li>' + text + '</li>');
    }

});


StatusesView.prototype.$ = function(selector) {
    return this.el.find(selector);
}


$(document).ready(function() {
    var statuses = new Statuses();
    
    new NewStatusView({el: $('#new-status'), statuses: statuses});
    new StatusesView({el: $('#statuses')});
});