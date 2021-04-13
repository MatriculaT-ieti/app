document.addEventListener('deviceready', onDeviceReady, false);
let btnLogin = document.getElementById("loginButton");
let email = document.getElementById("email");
let password = document.getElementById("password");
var token = {};

function login() {
    if (email.value == "" || email.value == null) {
        M.toast({html: "El camp 'Email' no pot estar buit", displayLength: 2000, classes: 'rounded'});
    } else if (password.value == "" || password.value == null) {
        M.toast({html: "El camp 'Password' no pot estar buit", displayLength: 2000, classes: 'rounded'});
    } else {
        validateLogin(email.value, CryptoJS.SHA256(password.value).toString()); 
        startLoad();
    }
}

function validateLogin(email, password) {
    let query = "/api/login/students?email=" + email + "&password=" + password;
    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "json",
    }).done(function(user) {
        if (user.token == null) {
            M.toast({html: "Els camps email o contrasenya no s\u00F3n correctes.", displayLength: 2000, classes: 'rounded'});
            cancelLoad();
            applyShakeEffect();
        } else {
            user = jwt_decode(user.token).item;
            localStorage.setItem("data", JSON.stringify(user));
            if (user.email == email && user.password == password) {
                let url = window.location;
                window.location.replace("index.html");
            }
        }
        
    }).fail(function() {
        M.toast({html: "No s'ha pogut connectar amb la base de dades o la connexi\u00F3 ha fallat.", displayLength: 2000, classes: 'rounded'});
        applyShakeEffect();
    });
}

function startLoad() {
    email.attributes += "disabled";
    password.attributes += "disabled";
    $("#loader").addClass("active");
}

function cancelLoad() {
    email.attributes += "disabled";
    password.attributes += "disabled";
    $("#loader").removeClass("active");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyShakeEffect() {
    body.classList = [];
    await sleep(10);
    body.classList = ["shake-animation"];
}

function onDeviceReady() {
    btnLogin.onclick = login;
}