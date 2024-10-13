import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import "../styles/Home.scss";
import { message, Avatar } from "antd";
import Comment from "../components/Comment";
import { UserOutlined } from "@ant-design/icons";
import image from "../assets/icon-left-font-monochrome-white.webp";

function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [comments, setComments] = useState([]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("textarea", data.textarea);
    formData.append("email", email);

    try {
      const response = await fetch("/api/form/addComment", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        reset();
        messageApi.open({ type: "success", content: "Added comment!" });
        getAllComments();
      } else {
        throw new Error("Network Error: " + response.statusText);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const getAllComments = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/form/getAllComments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error fetching comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="homePage">
        {/* TODO Add navigation to page to delete and or logout user */}
        <div className="userprofile">
          <Avatar size={32} icon={<UserOutlined />} />
          <p>Go to Account</p>
        </div>
        <img src={image} alt="App Logo" className="app_logo" />
        <div className="searchbar">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <button type="submit">
              <CiCirclePlus size={24} className="searchIcon" />
            </button>
            <div className="inputs">
              <input
                type="file"
                {...register("file")}
                accept="image/*,video/*,audio/*"
              />
              <textarea
                {...register("textarea")}
                placeholder="Share Today"
                required
                autoFocus
                minLength={3}
              />
            </div>
          </form>
        </div>
        <div className="comments">
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} userid={comment.userid} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
