import React, { useEffect, useState } from "react";
// AntD
import { Avatar } from "antd";
// Icons
import { UserOutlined } from "@ant-design/icons";
import { FaCaretDown, FaKaaba } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Comment = ({ comment, commentkey, indexnum, userid, messageApi }) => {
  // State Variables
  const [expandedComment, setExpandedComment] = useState(false);
  const [view, setView] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const fileType = () => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    const audioExtensions = ["mp3"];
    const mediaExtensions = ["mp4"];

    const fileExtension = comment.fileloc.slice(-3).toLowerCase();
    const fileExtensionFull = comment.fileloc.slice(-4).toLowerCase();

    if (
      imageExtensions.includes(fileExtension) ||
      imageExtensions.includes(fileExtensionFull)
    ) {
      return "image";
    } else if (audioExtensions.includes(fileExtension)) {
      return "audio";
    } else if (mediaExtensions.includes(fileExtension)) {
      return "media";
    } else {
      return null;
    }
  };

  // User Access Token
  const token = localStorage.getItem("token");

  /**
   * @async Get Current User Email
   */
  const getUser = async () => {
    try {
      // Fetch Request
      const response = await fetch(`/api/form/getUser/${userid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check Response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching user: ${errorText}`);
      }

      // If response OKAY Set State
      const data = await response.json();
      setUserEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @async Handle Deleting a Comment
   */
  const handleDelete = async () => {
    try {
      console.log("userid", userid);
      console.log("comment", commentkey);
      // Fetch Request
      const response = await fetch(`/api/form/deleteComment/${commentkey}`, {
        method: "POST",
        body: JSON.stringify({ userid }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check Response
      if (!response.ok) {
        setExpandedComment(false);
        const errorText = await response.json();
        messageApi.error(errorText.message);

        throw new Error(`Error fetching user: ${errorText}`);
      }

      messageApi.open({
        type: "loading",
        content: "Deleting Comment",
        duration: 0,
      });
      setTimeout(() => {
        messageApi.destroy;
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    if (userid) {
      getUser();
    }
  }, []);

  return (
    <div
      
      className="comment"
      style={{
        height: view ? "100px" : "50px",
        height: expandedComment && fileType() ? "280px" : "100px",
      }}
    >
      <div className="profile">
        <Avatar size={30} icon={<UserOutlined />} />
        <p>{userEmail.split("@")[0]}</p>
        <p
          onClick={(e) => {
            setView(!view);
          }}
        >
          View Comment
        </p>
      </div>
      <div
        className="commentCtn"
        style={{
          display: view ? "" : "none",
        }}
      >
        <p>{comment.comment}</p>

        {fileType() === "image" ? (
          <img
            src={comment.fileloc}
            alt=""
            style={{
              display: expandedComment ? "block" : "none",
              opacity: expandedComment ? "1" : 0,
            }}
          />
        ) : null}
        {fileType() === "media" ? (
          <video
            width="230"
            height="160"
            controls
            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate "
            style={{
              display: expandedComment ? "block" : "none",
              opacity: expandedComment ? "1" : 0,
            }}
          >
            <source src={comment.fileloc} type="video/mp4"></source>
            Your browser does not support the Media element.
          </video>
        ) : null}
        {fileType() === "audio" ? (
          <audio
            controls
            autoplay
            style={{
              display: expandedComment ? "block" : "none",
              opacity: expandedComment ? "1" : 0,
            }}
          >
            <source src={comment.fileloc} type="audio/mpeg"></source>
            Your browser does not support the audio element.
          </audio>
        ) : null}
      </div>

      {/* Menu Button to Collapse and Expand Comment */}
      {fileType() && view ? (
        <FaCaretDown
          className="icondown"
          color="white"
          onClick={() => {
            setExpandedComment(!expandedComment);
          }}
        />
      ) : null}
      {fileType() && view ? (
        <p
          className="show"
          onClick={() => {
            setExpandedComment(!expandedComment);
          }}
        >
          Show more
        </p>
      ) : null}
      {/* Delete Button to delete comment */}
      <MdDeleteOutline
        color="white"
        onClick={() => handleDelete()}
        size={18}
        style={{
          display: view ? "block" : "none",
        }}
      />
    </div>
  );
};

export default Comment;
