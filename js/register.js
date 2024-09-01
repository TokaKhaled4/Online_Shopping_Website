var firstname=document.getElementById("fn")
var lastname=document.getElementById("ln")
var email=document.getElementById("email")
var password=document.getElementById("password")
var submit=document.getElementById("log")

submit.addEventListener("click",function(prevent_refresh){
    prevent_refresh.preventDefault()
    if(firstname.value===""||lastname.value===""||password.value===""||email.value===""){
        alert("please fill missing data")
    }else{
        localStorage.setItem("firstname",firstname.value)
        localStorage.setItem("lastname",lastname.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)

       setTimeout(()=>{
        window.location="login.html"
       },1500)
    }

})