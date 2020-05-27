function RegisterUser(){
    var error = "";
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var password2 = document.querySelector("#password2").value;
    var username = document.querySelector("#username").value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "db.json", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var data = JSON.parse(xhr.responseText);

            if (email == "") {
                error = "Please enter your email!";
            } else if (password == "") {
                error = "Please enter your password <br>";
            } else if (password2 == "") {
                error = "Please enter your password again<br>";
            } else if (username == "") {
                error = "Please enter your username <br>";
            } else {
                if (password != password2) {
                    error = "passwords do not match";
                }
                else{
                    for (var i = 0; i < data.users.length; i++) {
                        if (email == data.users[i].email) {
                            error = "This email is in using";
                        } else {
                            console.log(JSON.stringify({
                                username: username,
                                email: email,
                                password: password,
                                rankId: 3
                            }));
                        }
                    }
                }
            }
        }
    }
}