function register(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");


    if(email === "" || password === ""){
        message.innerText = "Please fill all fields";
        return;
    }


    if(password.length < 8){
        message.innerText = "Password must be at least 8 characters";
        return;
    }


    if(!/\d/.test(password)){
        message.innerText = "Password must contain at least one number";
        return;
    }


    fetch("/register", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    })

    .then(response => response.json())

    .then(data => {

        message.style.color="green";
        message.innerText=data.message;

        if(data.message === "Registration successful"){
            setTimeout(()=>{
                window.location="login.html";
            },1500);
        }

    });

}




function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let message=document.getElementById("message");


    if(email === "" || password === ""){
        message.innerText="Please fill all fields";
        return;
    }


    fetch("/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    })


    .then(response=>response.json())


    .then(data=>{

        if(data.success){

            localStorage.setItem("loggedIn","true");

            window.location="dashboard.html";

        }

        else{

            message.innerText=data.message;

        }

    });

}





function logout(){

    localStorage.removeItem("loggedIn");

    window.location="login.html";

}