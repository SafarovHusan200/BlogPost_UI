import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

function CreateBlog() {
  const navigate = useNavigate();
  // state
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("user", localStorage.getItem("userId"));
    try {
      const { data } = await axios.post(
        "https://blogpost.husandev.uz/api/v1/blog/create-blog",
        formData
      );

      if (data?.success) {
        alert("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"70%"}
          border={1}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color={"gray"}
          >
            Create a Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>
          <TextField
            type="file"
            name="image"
            onChange={handleChangeImage}
            variant="outlined"
            required
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "25px" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default CreateBlog;
