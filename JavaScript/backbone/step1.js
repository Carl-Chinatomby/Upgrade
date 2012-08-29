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

var NewStatusView = function(options) {
    this.statuses = options.statuses;
    this.el = $('#new-status');

    events.on('status:add', this.clearInput, this);

    var add = $.proxy(this.addStatus, this);
    this.el.find('form').submit(add);
}

NewStatusView.prototype.addStatus = function (e) 
    e.preventDefault();

    this.statuses.add($('#new-status textarea').val());
});


NewStatusView.prototype.clearInput = function() {
    this.el.find('textarea').val('');
};

var StatusesView = function() {
    events.on('status:add', this.appendStatus, this);
    this.el = $('statuses');
}

StatusView.prototype.appendStatus = function(text) {
    this.el.find('ul').append('<li>' + text + '</li>');
};


$(document).ready(function() {
    var statuses = new Statuses();
    
    new NewStatusView({statuses: statuses });
    new StatusesView();
});