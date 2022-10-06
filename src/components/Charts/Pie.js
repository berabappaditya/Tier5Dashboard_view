import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Grid, MenuItem, Paper, Select } from "@mui/material";
import { CloseIcon } from "../../assets/Icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const randomColorGen = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b},0.7)`;
};
const randomColor = [1, 2, 3, 4, 5, 6].map(randomColorGen);

export const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: "left",
    labels: {
      boxWidth: 100,
    },
  },
};

export const countryData = {
  labels: ["India", "China", "USA", "UK", "Vietnam", "Japan"],
  datasets: [
    {
      label: "Usage by country",
      data: [28, 23, 18, 8, 15, 5],
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 1,
    },
  ],
};
export const deviceData = {
  labels: ["Andriod", "Iphone", "Windows", "Linux", "Mac", "Others"],
  datasets: [
    {
      label: "Usage by country",
      data: [40, 28, 24, 10, 5, 3],
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 1,
    },
  ],
};
export const genderData = {
  labels: ["Male", "Female", "Others"],
  datasets: [
    {
      label: "Usage by gender",
      data: [203, 150, 70],
      backgroundColor: ["#E7DCD7", "#52C2CF", "#FFBB71"],
      borderColor: ["#E7DCD7", "#52C2CF", "#FFBB71"],
      borderWidth: 1,
    },
  ],
};
const CountryPie = () => {
  const [contrain, setContrain] = useState("country");

  const handleChange = (e) => {
    setContrain(e.target.value);
  };
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 370,
          width: "70%",
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
            value={contrain}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"country"}>Country</MenuItem>
            <MenuItem value={"gender"}>Gender</MenuItem>
            <MenuItem value={"device"}>Device</MenuItem>
          </Select>
          <span>
            <CloseIcon height={"15px"} width={"15px"} color={"black"} />
          </span>
        </div>
        <div className="ab_center" width="100%" height="100%">
          <Pie
            data={
              contrain === "country"
                ? countryData
                : contrain === "gender"
                ? genderData
                : deviceData
            }
            width={300}
            height={300}
            options={options}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export default CountryPie;
