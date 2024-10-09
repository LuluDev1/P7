import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FaCaretDown } from "react-icons/fa";
import { Avatar } from "antd";

const Comment = ({ comment, index }) => {
  const [expandedComment, setExpandedComment] = useState(false); // Handle comment expansion

  return (
    <div
      key={index}
      className="comment"
      style={{
        height: expandedComment ? "220px" : "65px", // Set height based on state
      }}
      tabindex="0"
      onClick={() => setExpandedComment(true)} // Expand on click
      onBlur={() => setExpandedComment(false)} // Collapse on blur
    >
      <div className="profile">
        <Avatar size={24} icon={<UserOutlined />} />
        <p>email</p>
      </div>
      <div className="commentCtn">
        <p>{comment.comment}</p>

        <img
          src={comment.fileloc}
          alt=""
          style={{
            display: expandedComment ? "" : "none", // Conditionally display image
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
