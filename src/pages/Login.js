import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const { data } = await axios.post(
        "https://blogpost.husandev.uz/api/v1/auth/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        alert("User Login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={3}
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
            value={inputs.email}
          />
          <TextField
            placeholder="password"
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
            value={inputs.password}
          />

          <Button
            variant="contained"
            sx={{ borderRadius: 1, marginTop: 2 }}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button onClick={() => navigate("/register")}>
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Login;
