document.addEventListener('deviceready', onDeviceReady, false);

function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    validateLogin(email, CryptoJS.SHA256(password.value).toString());
}

function validateUser(email, password) {
    let query = users;
    $.ajax({
        method: "GET",
        url: "API" + query,
        dataType: "json", // necessitem això pq ens retorni un objecte JSON
    }).done(function(user) {
        for (let index = 0; index < user.length; index++) {
            if (user[index].email == email && user[index].password == password) {
                console.log("email: " + user.email + " -- password: " + user.password);
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