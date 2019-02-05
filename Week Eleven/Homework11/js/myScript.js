/**
Im still not sure if these should be two functions or if wrapping them in the same function is how its supposed to work.
**/

$(function () {
    /**
    Learned about keyup events. keycode 13 strict is enter pressed

    https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
    **/

    $("#input").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submitButton").click();
        }
    });

    /**
    written with help from slides mostly my code though.
    **/

    $("#submitButton").click(function () {
        var text = $('#input').val();
        if (text != "") {
            $("ul.inProgress").append('<li class =\'added\'>' + text + '</l1>');
        }
        $('#input').val("");
        $('li.added').on('click', function () {
            var text = $(this).text();
            $(this).animate({
                opacity: 0.0,
                paddingLeft: '+=80'
            }, 500, function () {
                $("ul.finished").append('<li>' + text + '</l1>');
                $(this).remove();
            });
        });
    });

});
