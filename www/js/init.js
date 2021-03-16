(function($) {
    $(function() {

        $('.sidenav').sidenav();
        $('.tabs').tabs({ "swipeable": true });

        $(document).ready(function() {
            $('.fixed-action-btn').floatingActionButton();
        });

        if ($(".carousel").length > 0) {
            $(".carousel")[0].style = "height: 100%;";
        }

        $(document).ready(function() {
            $('.tap-target').tapTarget();
            $('.tap-target').tapTarget('open');
        });


    }); //end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);

var stateMatriculation = document.getElementById("stateMatriculation");
var btMatriculation = document.getElementById("btMatriculation");
btMatriculation.onclick = changeColorMatriculation;

var dniInFront = document.getElementById("dniInFront");
var btDniInFront = document.getElementById("btDniInFront");
btDniInFront.onclick = changeColorDniInFront;

var dniBehind = document.getElementById("dniBehind");
var btDniBehind = document.getElementById("btDniBehind");
btDniBehind.onclick = changeColorDniBehind;

function changeColorMatriculation() {
    var random = Math.floor(Math.random() * 3);
    if (random == 0) {
        stateMatriculation.style.borderLeft = "20px dotted #008000";
    } else if (random == 1) {
        stateMatriculation.style.borderLeft = "20px dotted #FFA500";
    } else {
        stateMatriculation.style.borderLeft = "20px dotted #FF0000";
    }
}

function changeColorDniInFront() {
    var random = Math.floor(Math.random() * 3);
    if (random == 0) {
        dniInFront.style.borderLeft = "20px dotted #008000";
    } else if (random == 1) {
        dniInFront.style.borderLeft = "20px dotted #FFA500";
    } else {
        dniInFront.style.borderLeft = "20px dotted #FF0000";
    }
}

function changeColorDniBehind() {
    var random = Math.floor(Math.random() * 3);
    if (random == 0) {
        dniBehind.style.borderLeft = "20px dotted #008000";
    } else if (random == 1) {
        dniBehind.style.borderLeft = "20px dotted #FFA500";
    } else {
        dniBehind.style.borderLeft = "20px dotted #FF0000";
    }
}

function onDeviceReady() {
    //pass
}