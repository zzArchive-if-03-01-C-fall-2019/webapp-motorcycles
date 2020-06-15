function CheckLogin(){
    login();
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function login(){

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    fetch("http://localhost:3000/users?email=" + email + "&password=" + password).then (response => response.json())
        .then(function(data){
            if(isEmpty(data)){
                //user email exsitiert nicht oder passwort falcsh und email richtig 1 ist flasch
                console.log("falsch");
            }
            else {
                //richtig
                console.log("richtig ");

                //cookie

            }
        })
        .catch( function (error) {
            console.error("error: " + error);
        });
}
