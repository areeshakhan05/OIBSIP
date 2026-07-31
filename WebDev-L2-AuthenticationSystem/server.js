const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const PORT = 3000;


// Register API
app.post("/register", (req, res) => {

    const { email, password } = req.body;


    let users = [];

    if(fs.existsSync("users.json")){
        const data = fs.readFileSync("users.json");
        if(data.length > 0){
            users = JSON.parse(data);
        }
    }


    const existingUser = users.find(user => user.email === email);


    if(existingUser){
        return res.json({
            message:"User already exists"
        });
    }


    users.push({
        email,
        password
    });


    fs.writeFileSync(
        "users.json",
        JSON.stringify(users, null, 2)
    );


    res.json({
        message:"Registration successful"
    });

});



// Login API
app.post("/login", (req,res)=>{

    const {email,password}=req.body;


    let users=[];


    if(fs.existsSync("users.json")){
        const data=fs.readFileSync("users.json");

        if(data.length>0){
            users=JSON.parse(data);
        }
    }


    const user = users.find(
        user => user.email === email && user.password === password
    );


    if(user){

        res.json({
            success:true,
            message:"Login successful"
        });

    }

    else{

        res.json({
            success:false,
            message:"Invalid email or password"
        });

    }

});



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});