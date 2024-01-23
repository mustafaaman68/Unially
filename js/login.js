var alert_var_login = document.getElementById("alert_box_login");
function validating_credits(){
    setTimeout (function () {
        // used to fetch the value from node.js 
        fetch('/getMyVariable')
        .then(response => response.text())
        .then(data => {
            window.scrollTo(0, 300);        // used to scroll window
            if(data=="false"){
                alert_var_login.style.visibility = "visible";
                alert_var_login.textContent = "Login Failed ! Doesn't have a account do sign up";
            }
            else{
                alert_var_login.style.visibility = "visible";
                alert_var_login.style.backgroundColor = "#04AA6D";
                alert_var_login.textContent = "Successfully Logged In !";
            }
        }); 
    },1000);
}




