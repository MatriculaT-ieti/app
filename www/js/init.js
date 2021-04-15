(function($) {
    $(function() {

        $('.sidenav').sidenav();
        $('.tabs').tabs({ "swipeable": true });

        if ($(".carousel").length > 0) {
            $(".carousel")[0].style = "height: 100%;";
        }

        $(document).ready(function() {
            $('.tap-target').tapTarget();
            $('.tap-target').tapTarget('open');
            $('.fixed-action-btn').floatingActionButton();
            $('.collapsible').collapsible();
        });

    }); //end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //pass
}

function closeApp() {
    try {
        navigator.app.exitApp();
    } catch (TypeError) {
        // Do nothing
    }
    
}