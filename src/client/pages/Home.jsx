import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import "../styles/Home.scss";

function Home() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("textarea", data.textarea);

      const response = await fetch("/api/form/data", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        reset();
      } else {
        throw new Error("Network Error", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
     
  },[]);

  return (
    <div className="homePage">
      <h1>GroupMania Team Connect</h1>
      <div className="searchbar">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
