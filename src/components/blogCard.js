import * as React from "react";
// import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const baseUrl = "https://blogpost.husandev.uz/";
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://blogpost.husandev.uz/api/v1/blog/delete-blog/${id}`
      );
      if (data?.success) {
        alert("Blog delete Successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dateF = dateFormat(time);
  return (
    <>
      <div class="card mt-3">
        <div class="card-header p-0 m-0">
          <div className="row d-flex">
            {isUser && (
              <Box display={"flex"}>
                <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                  <ModeEditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={handleDelete} />
                </IconButton>
              </Box>
            )}

            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
              }
              title={username}
              subheader={dateF}
            />
          </div>
        </div>
        <div class="card-body ">
          <div className="text-center">
            <img
              src={baseUrl + image}
              className="img-fluid text-center"
              alt=""
            />
          </div>
          <div className="card-footer p-0 m-0">
            <CardContent>
              <Typography variant="h6" color="primary">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </div>
        </div>
      </div>
    </>
  );
}
