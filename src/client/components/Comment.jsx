import React, { useEffect, useState } from "react";
// AntD
import { Avatar } from "antd";
// Icons
import { UserOutlined } from "@ant-design/icons";
import { FaCaretDown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Comment = ({ comment, commentkey, index, userid }) => {
  // State Variables
  const [expandedComment, setExpandedComment] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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
      console.log(userid);
      // Fetch Request
      const response = await fetch(`/api/form/deleteComment/${commentkey}`, {
        method: "POST",
        body: JSON.stringify({ userid }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check Response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching user: ${errorText}`);
      }

      // If no Error, Log and Realod
      console.log("Deleted Comment");
      window.location.reload();
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
        height: expandedComment ? "250px" : "65px", // Set height based on state
      }}
      tabIndex="0"
      onClick={() => setExpandedComment(!expandedComment)} // Toggle expansion on click
      onBlur={() => setExpandedComment(false)}
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

      {/* Menu Button to Collapse and Expand Comment */}
      <FaCaretDown
        className="icondown"
        color="white"
        onClick={() => setExpandedComment(!expandedComment)} // Toggle expansion
      />
      {/* Delete Button to delete comment */}
      <MdDeleteOutline
        color="white"
        onClick={() => handleDelete()}
        size={18}
        style={{
          display: expandedComment ? "block" : "none",
        }}
      />
    </div>
  );
};

export default Comment;
