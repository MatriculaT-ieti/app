document.addEventListener('deviceready', onDeviceReady, false);
var btnLogin = document.getElementById("loginButton"); btnLogin.onclick = login;
var email = document.getElementById("email");
var password = document.getElementById("password");

function login() {
    validateLogin(email.value, CryptoJS.SHA256(password.value).toString());    
}

function validateLogin(email, password) {
    let query = "/users?email="+email;
    $.ajax({
        method: "GET",
        url: "http://localhost:3000" + query,
        dataType: "json",
    }).done(function(user) {
        if (user.length > 0) {
            for (let i = 0; i < user.length; i++) {
                if (user[i].email == email && user[i].password == password) {
                    alert("Login correct");
                }
            }
        } else {
            alert("Login incorrect");

        }
        
    }).fail(function() {
        alert("No se ha entrado ningun usuario con ese email.");
    });
}

function onDeviceReady() {
    // Pass
}