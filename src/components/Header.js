import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import axios from "axios";

function Header() {
  // global state
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [value, setValue] = useState();

  function handleLogout() {
    try {
      localStorage.clear("userId");
      dispatch(authActions.logout());
      alert("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  const getUserById = async () => {
    const id = localStorage.getItem("userId");
    if (id) {
      const { data } = await axios.get(
        `https://blogpost.husandev.uz/api/v1/auth/${id}`
      );

      if (data?.success) {
        console.log(data);
        dispatch(authActions.login());
      } else {
        console.log("user not found");
      }
    }
  };
  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" LinkComponent={Link} to="/">
            My Blog App
          </Typography>

          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
