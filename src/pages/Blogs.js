import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";
function Blogs() {
  const [blogs, setBlogs] = useState([]);

  // get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blogpost.husandev.uz/api/v1/blog/all-blog"
      );
      if (data?.success) {
        setBlogs(data?.blogs);
        console.log(blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [blogs]);

  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 ">
                <BlogCard
                  id={blog._id}
                  isUser={localStorage.getItem("userId") === blog.user._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={blog.user.username}
                  time={blog.createdAt}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Blogs;
