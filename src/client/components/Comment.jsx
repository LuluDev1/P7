import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FaCaretDown } from "react-icons/fa";
import { Avatar } from "antd";

const Comment = ({ comment, index, userid }) => {
  const [expandedComment, setExpandedComment] = useState(false); // Handle comment expansion
  const [userEmail, setUserEmail] = useState("");

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/form/getUser/${userid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the error response as text
        throw new Error(`Error fetching user: ${errorText}`);
      }

      const data = await response.json();

      setUserEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userid) {
      getUser();
    }
  }, [userid]);

  return (
    <div
      key={index}
      className="comment"
      style={{
        height: expandedComment ? "220px" : "65px", // Set height based on state
      }}
      tabIndex="0"
      onClick={() => setExpandedComment(!expandedComment)} // Toggle expansion on click
      onBlur={() => setExpandedComment(false)} // Collapse on blur
    >
      <div className="profile">
        <Avatar size={24} icon={<UserOutlined />} />
        <p>{userEmail}</p>
      </div>
      <div className="commentCtn">
        <p>{comment.comment}</p>

        <img
          src={comment.fileloc}
          alt=""
          style={{
            display: expandedComment ? "block" : "none", // Conditionally display image
            opacity: expandedComment ? "1" : 0,
          }}
        />
      </div>
      <FaCaretDown
        className="icondown"
        color="white"
        onClick={() => setExpandedComment(!expandedComment)} // Toggle expansion
      />
    </div>
  );
};

export default Comment;
