import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://blog-application-b.onrender.com/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
 
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={
              localStorage.getItem("userId") === (blog.user && blog.user._id)
            } // Added null check for blog.user
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user ? blog.user.name : ""} // Added null check for blog.user
          />
        ))}
    </div>
  );
};

export default Blogs;
