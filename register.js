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

    const bcrypt = require('bcrypt');

    bcrypt.hash(password, 10).then(
        hash => {
            console.log('Your hash: ', hash);
        },
        err => {
            console.log(err);
        }
    );

    /*bcrypt.compare(password, hash).then(
        result => {
            console.log('Submitted password is correct');
        },
        err => {
            console.log(err);
        }
    );*/

    fetch("http://localhost:3000/users?email=" + email).then (response => response.json())
        .then(function(data){
            if(isEmpty(data)){
                fetch("http://localhost:3000/users?username=" + username).then (response => response.json())
                    .then(function(data){

                        if(isEmpty(data)){
                            let newUser = {
                                username: username,
                                email: email,
                                password: hash,
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