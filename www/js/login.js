document.addEventListener('deviceready', onDeviceReady, false);
let btnLogin = document.getElementById("loginButton");
let email = document.getElementById("email");
let password = document.getElementById("password");
var token = {};

function login() {
    if (email.value == "" || email.value == null) {
        alert("El campo 'Email' no puede estar vac" + '\u00ED' + "o");
    } else if (password.value == "" || password.value == null) {
        alert("El campo 'Password' no puede estar vac" + '\u00ED' + "o");
    } else {
        validateLogin(email.value, CryptoJS.SHA256(password.value).toString());    
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
            alert("Los campos email o contrase" + '\u00F1' + "a no s" + '\u00F3' + "n correctos.");
        } else {
            user = jwt_decode(user.token).item;
            localStorage.setItem("data", JSON.stringify(user));
            if (user.email == email && user.password == password) {
                let url = window.location;
                window.location.replace("index.html");
            } else {
                alert("La contrase" + '\u00F1' + "a es incorrecta.");
            }
        }
        
    }).fail(function() {
        alert("No se ha podido conectar con la base de datos.");
    });
}

function onDeviceReady() {
    btnLogin.onclick = login;
    // Pass
}