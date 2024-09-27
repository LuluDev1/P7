import "../styles/Login.scss";
import image from "../assets/icon-left-font-monochrome-white.webp";
import React from "react";

const Login = () => {
  return (
    <div className="loginPage">
      <div className="form_container">
        <img src={image} alt="" className="logo" />
        <form action="">
          <div className="input_container">
            <input type="email" name="" id="" placeholder="Email" />
          </div>
          <div className="input_container">
            <input type="password" name="" id="" placeholder="password" />
          </div>
          <button id="login_btn">Login</button>

          <button id="sign_up">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
