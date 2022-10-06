import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Grid, MenuItem, Paper, Select } from "@mui/material";
import { CloseIcon } from "../../assets/Icons";
import { useDispatch } from "react-redux";
import { setDashboard } from "../../app/userSlice";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "User usage chart",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const dataDaily = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Daily usage",
      data: [700, 450, 560, 900, 800, 1200, 1800],
      fill: false,
      borderWidth: 1.5,
      borderColor: "#5eff86",
      backgroundColor: "rgb(94, 255, 134,0.4)",
      yAxisID: "y",
      tension: 0.1,
    },
  ],
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dataMonthly = {
  labels: months,
  datasets: [
    {
      label: "Dataset 1",
      data: [790, 894, 904, 890, 934, 910, 920, 934, 984, 1029, 1109, 1179],
      borderColor: "#5eff86",
      backgroundColor: "rgb(94, 255, 134,0.4)",
      borderWidth: 1.5,
      yAxisID: "y",
      tension: 0.1,
    },
  ],
};
const years = [
  2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
];
export const dataYearly = {
  labels: years,
  datasets: [
    {
      label: "Dataset 1",
      data: [
        740, 934, 834, 890, 870, 970, 880, 905, 884, 902, 1003, 1075, 1070,
      ],
      borderColor: "#5eff86",
      backgroundColor: "rgb(94, 255, 134,0.4)",
      borderWidth: 1.5,
      yAxisID: "y",
      tension: 0.1,
    },
  ],
};

export function MAUChart() {
  const [constrain, setContrain] = useState("D");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContrain(e.target.value);
  };

  const handleClick = async () => {
    try {
      const uniqueId = localStorage.getItem("userName");
      const res = await fetch(
        "https://tier5dashboard.herokuapp.com/user/dashboardUpdate",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uniqueId,
            label: "usagechart",
            value: false,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
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
            justifyContent: "space-between",
            height: "10%",
          }}
        >
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={constrain}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"D"}>Daywise</MenuItem>
            <MenuItem value={"M"}>Mothwise</MenuItem>
            <MenuItem value={"Y"}>Yearly</MenuItem>
          </Select>
          <span onClick={handleClick}>
            <CloseIcon height={"15px"} width={"15px"} color={"black"} />
          </span>
        </div>
        <Line
          options={options}
          data={
            constrain === "D"
              ? dataDaily
              : constrain === "M"
              ? dataMonthly
              : dataYearly
          }
        />
      </Paper>
    </Grid>
  );
}
