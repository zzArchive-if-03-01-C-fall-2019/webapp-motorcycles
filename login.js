function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function CheckLogin(){

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
                window.location = "LoggedIn/index.html";
                //checkCookie(email);
            }
        });
}

/*function checkCookie(email) {
   // var user = getCookie();
    if (user != "") {
        //console.log("cookie wurde befüllt");
        window.location = "LoggedIn/index.html";
    } else {
        fetch("http://localhost:3000/users?email=" + email).then (response => response.json())
            .then(function(data){

                if(isEmpty(data)){
                    console.log(data);
                }
                else {
                    if (data != "" && data != null) {
                        //setCookie("username", data.username, 1);
                        window.location = "LoggedIn/index.html";
                    }
                    else {
                        console.log("kritischer fehler hoch2");
                    }
                }
            })
            .catch( function (error) {
                console.error("error: " + error);
            });
    }
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cvalue;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}*/
