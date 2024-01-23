var alert_var = document.getElementById("alert_box");
var password,con_password; 
function password_check(){
    window.scrollTo(0, 0);
    password = document.getElementById("password").value;
    con_password = document.getElementById("confirm_password").value;
    console.log(password);
    console.log(con_password);
    if(password!=con_password){
        alert_var.style.visibility = "visible";
        alert_var.textContent = "Password Didn't match!";
    }
    else{
        alert_var.style.visibility = "visible";
        alert_var.style.backgroundColor = "#04AA6D";
        alert_var.textContent = "Successfully Registered !";
    }
}