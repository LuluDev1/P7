import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import "../styles/Home.scss";
import { message } from "antd";
import Comment from "../components/Comment";
function Home() {
  //
  const { register, handleSubmit, reset } = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [comments, setComments] = useState([]);

  //
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("textarea", data.textarea);
      formData.append("email", email);

      const response = await fetch("/api/form/addComment", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        reset();
        messageApi.open({
          type: "success",
          content: "Added comment!",
        });
        getAllComments();
      } else {
        throw new Error("Network Error", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/form/getAllComments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  // Log comments after they have been updated
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <>
      {contextHolder}
      <div className="homePage">
        <h1>GroupMania Team Connect</h1>
        <div className="searchbar">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            onSubmitFiledr
          >
            <button type="submit">
              <CiCirclePlus size={24} className="searchIcon" />
            </button>
            <div className="inputs">
              <input type="file" {...register("file")} accept="image/*" />
              <textarea
                {...register("textarea")}
                placeholder="Share Today"
                required={true}
                autoFocus
                minLength={3}
              />
            </div>
          </form>
        </div>

        <div className="comments">
          {comments.map((comment, index) => (
            <Comment comment={comment} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
