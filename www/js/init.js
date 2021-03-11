(function($) {
    $(function() {

        $('sidenav').sidenav();
        $('.tabs').tabs({ "swipeable": true });

    }); //end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {}