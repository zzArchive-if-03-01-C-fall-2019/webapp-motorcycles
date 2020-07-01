function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


function RegisterUser(){
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let password2 = document.querySelector("#password2").value;
    let username = document.querySelector("#username").value;

    fetch("http://localhost:3000/users?email=" + email).then (response => response.json())
        .then(function(data){
            if(isEmpty(data)){
                fetch("http://localhost:3000/users?username=" + username).then (response => response.json())
                    .then(function(data){

                        if(isEmpty(data)){
                            let newUser = {
                                username: username,
                                email: email,
                                password: password,
                                rankId : 3
                            };

                            fetch('http://localhost:3000/users', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(newUser),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    //newUser created
                                    console.log("neu angelegt worden");
                                    window.location = "login.html";
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }
                        else {
                            console.log("user vorhanden");
                        }
                    });
            }
            else {
                console.log("email vorhanden");
            }
        })
        .catch( function (error) {
            console.error("error: " + error);
        });
}
