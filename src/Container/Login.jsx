import React, { useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SubmitButton } from "../components/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("this user data**",userData);
  //   localStorage.setItem('userData', userData);
  // },[userData]);


  const handleSunmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://tier5dashboard.herokuapp.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniqueId, password }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem('userName', data.doc.userName);
      localStorage.setItem('email', data.doc.email);
      localStorage.setItem('auth-token', data.auth_token);
      // setUserData(data)
      console.log(data);
      dispatch(
        setUser({ userName: data.doc.userName, email: data.doc.email,dashboard:data.doc.dashboard })
      );


      alert("User login successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      
      <Box
       component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
    <div style={{textAlign: "center",marginTop:"10vh"}}>
      <h2>Login</h2>
          <TextField
            required
            fullWidth

            id="outlined-required"
            label="username/email"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
          />
          <br/>
          <TextField
            required
            fullWidth
            id="outlined-required"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <div className="ab_center">
            <div  style={{width:"14vw",padding:"10px 0 0 1vh",textAlign:"left"}}><SubmitButton name={"submit"} onClick={handleSunmit} /></div></div>
        </div>
      </Box>
    </div>
  );
}

export default Login;
