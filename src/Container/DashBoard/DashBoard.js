import React, { useState, useEffect } from "react";
import { Button, Grid, Popover } from "@mui/material";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { CloseIcon } from "../../assets/Icons";
import { MAUChart } from "../../components/Charts/Chart";
import CountryPie from "../../components/Charts/Pie";
import Topuser from "../../components/TopUser/Topuser";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Plus } from "../../assets/Icons";
import { setDashboard } from "../../app/userSlice";
// import Navbar from '../Navbar/Navbar'

function DashBoard() {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const addTile = async (type) => {
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
            label: type,
            value: true,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      dispatch(setDashboard({ dashboard: data.dashboard }));
      setAnchorEl(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user && user.dashboard ? (
        <div>
          <Navbar />
          <div className="dash_board_tiles" style={{ padding: "15px 0 0 0" }}>
            <Container>
              <Grid container spacing={2}>
                {user && user.dashboard && user.dashboard.usagechart ? (
                  <MAUChart />
                ) : null}

                {user && user.dashboard && user.dashboard.usagePie ? (
                  <CountryPie />
                ) : null}

                {user && user.dashboard && user.dashboard.topUsage ? (
                  <Topuser />
                ) : null}
              </Grid>
              <div
                className="ab_center"
                style={{ width: "100%", margin: "20px 0 0 20px" }}
              >
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                >
                  <Plus height={"20px"} width={"20px"} color={"white"} />
                </Button>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div style={{ padding: "5px" }}>
                    {user &&
                    user.dashboard &&
                    user.dashboard.usagechart ? null : (
                      <h4
                        onClick={() => {
                          addTile("usagechart");
                        }}
                      >
                        Add Graph
                      </h4>
                    )}

                    {user &&
                    user.dashboard &&
                    user.dashboard.usagePie ? null : (
                      <h4
                        onClick={() => {
                          addTile("usagePie");
                        }}
                      >
                        Add Piechart
                      </h4>
                    )}

                    {user &&
                    user.dashboard &&
                    user.dashboard.topUsage ? null : (
                      <h4
                        onClick={() => {
                          addTile("topUsage");
                        }}
                      >
                        Add Top user
                      </h4>
                    )}
                    {user &&
                    user.dashboard &&
                    user.dashboard.topUsage &&
                    user.dashboard.usagePie &&
                    user.dashboard.usagechart ? (
                      <h4
                        onClick={() => {
                          setAnchorEl(null);
                        }}
                      >
                        Nothing to add
                      </h4>
                    ) : null}
                  </div>
                </Popover>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <div className="ab_center">
          <h2>
            you session expaired please <Link to={"/"}>Login</Link>
          </h2>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
