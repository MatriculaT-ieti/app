document.addEventListener('deviceready', onDeviceReady, false);
let btnLogin = document.getElementById("loginButton"); btnLogin.onclick = login;
let email = document.getElementById("email");
let password = document.getElementById("password");

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
    let query = "/users?email="+email;
    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "json",
    }).done(function(user) {
        user = jwt_decode(user.token).item;

        if (user.email == email && user.password == password) {
            let url = window.location;
            window.location.replace("index.html");
        } else {
            alert("La contrase" + '\u00F1' + "a es incorrecta.");
        }
        
    }).fail(function() {
        alert("No se ha entrado ningun usuario con ese email.");
    });
}

function onDeviceReady() {
    // Pass
}