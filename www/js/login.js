document.addEventListener('deviceready', onDeviceReady, false);

function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    check(email.value, CryptoJS.SHA256(password.value).toString());
}

//validate email and password of the user against the api
function check(email, password) {
    var username = validateEmail(email);
    if (username == null) {
        alert("ERROR IN validate EMAIL")
    } else {
        var valueCheckPassword = checkPassword(username, password);
        if (valueCheckPassword == true) {
            alert("matriculaT");
        } else {
            alert("error en el login")
        }
    }
}

//get email from api, if don't found a user with this email, return null else return email user
function validateEmail(emailUserLogin) {
    let query = emailUserLogin;
    $.ajax({
        method: "GET",
        url: "API" + query,
        dataType: "json", // necessitem això pq ens retorni un objecte JSON
    }).done(function(user) {
        if (user.length == 0) {
            return null;
        } else {
            return user[0];
        }
    }).fail(function() {
        alert("ERROR");
    });
}

//check password and validate the password for this user
function checkPassword(username, encriptPassword) {
    //passwordBBDD let's get it to BBDD 
    // var passwordBBDD = validatePassword(username);
    /*
    if(passwordBBDD == null) {
        alert("ERROR validate Password");
    }
    else {

    }
    */
    var passwordBBDD = "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3";

    //if password from bbdd and password from enter the user it's don't same, set error, else matriculaT
    if (encriptPassword == passwordBBDD) {
        return true;
    } else {
        return false;
    }
}

//get password from api, always return one object because, we have already verified that this user is in our database
function validatePassword(nameUser) {
    let query = nameUser;
    $.ajax({
        method: "GET",
        url: "API" + query,
        dataType: "json", // necessitem això pq ens retorni un objecte JSON
    }).done(function(user) {
        return user[0];
    }).fail(function() {
        alert("ERROR");
    });
}

function onDeviceReady() {
    var btnLogin = document.getElementById("loginButton").onclick = login;
}