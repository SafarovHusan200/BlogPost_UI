import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

function EditBlog() {
  const id = useParams().id;
  const navigate = useNavigate();

  // get blog Details
  const getBlogDetail = async (req, res) => {
    try {
      const { data } = await axios.get(
        `https://blogpost.husandev.uz/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("user", localStorage.getItem("userId"));
      const { data } = await axios.put(
        `https://blogpost.husandev.uz/api/v1/blog/update-blog/${id}`,
        formData
      );

      if (data?.success) {
        alert("Blog Updated");
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
            Update a Post
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
          />

          <Button
            type="submit"
            color="warning"
            variant="contained"
            style={{ marginTop: "25px" }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
}

export default EditBlog;
