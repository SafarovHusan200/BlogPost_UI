import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  // state
  const [inputs, setInputs] = useState({
    name: "",
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
    try {
      const { data } = await axios.post(
        "https://blogpost.husandev.uz/api/v1/auth/register",
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );
      console.log(data.message);
      if (data.success) {
        alert("User Register Successfully");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials or User already exist");
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
            Register
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            margin="normal"
            type={"text"}
            required
            onChange={handleChange}
            value={inputs.name}
          />
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
          <Button onClick={() => navigate("/login")}>
            Already Register? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Register;
