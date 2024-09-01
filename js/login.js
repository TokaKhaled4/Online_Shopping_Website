var email=document.getElementById("email")
var password=document.getElementById("password")
var submit=document.getElementById("log")

submit.addEventListener("click",function(prevent_refresh){
    prevent_refresh.preventDefault()
    if(password.value===""||email.value===""){
        alert("please fill missing data")
    }else{
        if(localStorage.getItem("email")===email.value &&localStorage.getItem("password")===password.value){
            setTimeout(()=>{
                window.location="hompage.html"
               },1500)
        }
        else{
            alert("the email or the password is wrong")
        }
 


    }


})





