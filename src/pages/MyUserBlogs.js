import React, { useState, useEffect } from "react";
import axios from "axios";
import UserBlogCard from "../components/UserBlogCart";

function MyUserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");

  // get user blog
  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `https://blogpost.husandev.uz/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setUser(data?.user.username);
        setBlogs(data?.user.blogs);
        console.log(blogs);
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, [blogs]);

  return (
    <div>
      <h1>User Blog</h1>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 ">
                <UserBlogCard
                  id={blog._id}
                  isUser={true}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={user}
                  time={blog.createdAt}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2>You havent Created a blog</h2>
      )}
    </div>
  );
}

export default MyUserBlogs;
