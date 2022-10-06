import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Buttons/Buttons";



function Page() {
  return (
    <div className="ab_center" style={{width: '100%', height:'100vh'}}>
      <div style={{ height:'50vh'}}>
        <h1> Welcome to DashBoard</h1>  
        <div className="ab_center">
            <Link to="/login" style={{textDecoration:"none",margin:"0 15px 0 0"}}><Button
      name={"Login"}
      /></Link>
     
      <Link to="/signup" style={{textDecoration:"none"}}><Button
      name={"Signup"}
      /></Link>
        </div>
    
      </div>
      
   
    </div>
  );
}

export default Page;
