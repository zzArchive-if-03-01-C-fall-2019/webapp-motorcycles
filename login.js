function CheckLogin(){
    var error = "";
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;



    var xhr = new XMLHttpRequest();
    xhr.open("GET", "db.json", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var data = JSON.parse(xhr.responseText);

            if(email == ""){
                error = "Please enter your email!";
            }
            else if(password == ""){
                error = "Please enter your password <br>";
            }
            else {
                for(var i = 0; i < data.users.length; i++){
                    if(email == data.users[i].email){
                        if(password == data.users[i].password){
                            console.log("Es geht endlich");
                        }
                        else{
                            error = "Email or password is incorrect <br>";
                        }
                    }else {
                        error = "This Email does not exist <br>";
                    }
                }
            }
            if(error != ""){
                if(document.getElementById("error").style.display == "none")
                    document.getElementById("error").style.display = "block";
                document.getElementById("error").innerHTML = error;
            }
        }
    }
    xhr.send(null);
}