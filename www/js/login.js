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
        url: "http://localhost:3000" + query,
        dataType: "json",
    }).done(function(user) {
        if (user.length > 0) {
            for (let i = 0; i < user.length; i++) {
                if (user[i].email == email && user[i].password == password) {
                    let url = window.location;
                    window.location.replace("index.html");
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