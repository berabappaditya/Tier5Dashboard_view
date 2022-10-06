import React, { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { SubmitButton } from "../components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSunmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      const data = await response.json();
      console.log("my data**",data);
      dispatch(
        setUser({ userName: data.nwuser.userName, email: data.nwuser.email,dashboard:data.nwuser.dashboard })
      );
      localStorage.setItem("userName", data.nwuser.userName);
      localStorage.setItem("email", data.nwuser.email);
      localStorage.setItem("auth-token", data.auth_token);
      alert("User Created Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ab_center">
  
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >

        <div style={{textAlign: "center",marginTop:"10vh"}}>
            <h2>Signup</h2>
              <TextField
                required
                fullWidth
                //     sx={{    "& .MuiInputBase-root": {
                //     height: 50
                // }}}
                id="outlined-required"
                label="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
           
              <TextField
                required
                fullWidth
                type="email"
                id="outlined-required"
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
         
              <TextField
                required
                fullwidth
                type="password"
                id="outlined-required"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
        
              <TextField
                required
                fullwidth
                type="password"
                id="outlined-required"
                label="Confirm Password"
                value={confimPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <div style={{textAlign:"left",padding:"10px 0 0 1vh"}}><SubmitButton name="submit" onClick={handleSunmit} /></div>
              
              </div>
      
  
      </Box>
    </div>
  );
}

export default SignUp;
