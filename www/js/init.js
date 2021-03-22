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

var trafficLightMatricualtion = document.getElementById("trafficLightMatriculation");
var btMatriculation = document.getElementById("btMatriculation");
btMatriculation.onclick = changeColorMatriculation;

var dniInFront = document.getElementById("dniInFront");
var btMInFront = document.getElementById("btDniInFront");
btMInFront.onclick = changeColorDniInFront;

var dniBehind = document.getElementById("dniBehind");
var btDniBehind = document.getElementById("btDniBehind");
btDniBehind.onclick = changeColorDniBehind;

function changeColorMatriculation() {
    trafficLightMatricualtion.className = "material-icons circle green-text darken-3";
}

function changeColorDniInFront() {
    dniInFront.className = "material-icons circle orange-text darken-3";
}

function changeColorDniBehind() {
    dniBehind.className = "material-icons circle red-text darken-3";
}

function onDeviceReady() {
    //pass
}