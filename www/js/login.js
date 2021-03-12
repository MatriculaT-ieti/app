document.addEventListener('deviceready', onDeviceReady, false);

function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    validateLogin(email.value, CryptoJS.SHA256(password.value).toString());
}

function validateUser(email, password) {
    let query = "users";
    $.ajax({
        method: "GET",
        url: "API" + query,
        dataType: "json", // necessitem això pq ens retorni un objecte JSON
    }).done(function(user) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].email == email && user[i].password == password) {
                console.log("email: " + user[i].email + " -- password: " + user[i].password);
                return true;
            }
        }

        return false;
    }).fail(function() {
        alert("ERROR");
    });
}

function validateLogin(email, password) {
    let validUser = validateUser(email, password);

    if (validUser == true) {
        alert("Login Correct");
    } else {
        alert("Login Incorrect")
    }
}


function onDeviceReady() {
    var btnLogin = document.getElementById("loginButton").onclick = login;
}