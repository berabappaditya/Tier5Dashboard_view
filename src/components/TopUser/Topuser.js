import { Grid, Paper } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setDashboard } from "../../app/userSlice";
import { TopUsers } from "../../assets/DmyData";
import { CloseIcon } from "../../assets/Icons";
import "./TopUser.css";

function Topuser() {
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const uniqueId = localStorage.getItem("userName");
      const res = await fetch("http://localhost:8080/user/dashboardUpdate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueId,
          label: "topUsage",
          value: false,
        }),
      });
      const data = await res.json();
      console.log("iam from top user", data);
      dispatch(setDashboard({ dashboard: data.dashboard }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 370,
          width: "93%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            height: "10%",
          }}
        >
          <span onClick={handleClick}>
            <CloseIcon height={"15px"} width={"15px"} color={"black"} />
          </span>
        </div>
        <h2>Top users</h2>
        <nav>
          <ul>
            {TopUsers.map((item, index) => {
              return (
                <li key={index}>
                  {item.name}--{item.country}
                </li>
              );
            })}
          </ul>
        </nav>
      </Paper>
    </Grid>
  );
}

export default Topuser;
