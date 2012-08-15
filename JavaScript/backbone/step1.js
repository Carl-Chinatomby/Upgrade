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
var Statuses = function() {
}

Statuses.prototype.add = function(options){
    $.ajax({
        url: '/status',
        type: 'POST',
        dataType: 'json',
        data: { options.text },// options.data
        success: options.success
        }
    });
}

var NewStatusView = function(options) {
    this.statuses = options.statuses;
    
    var add = $.proxy(this.addStatus, this);
    $('#new-status form').submit(add);
}

NewStatusView.prototype.addStatus = function (e) 
    e.preventDefault();
    statuses.add({
        text: $('#new-status textarea').val(),
        success: function(data) {
            $('#statuses ul').append('<li>' + data.text + '</li>');
            $('new-statuses textarea').val('');
        }
    });
});

$(document).ready(function() {
    var statuses = new Statuses();
    
    new NewStatusView({statuses: statuses });

});