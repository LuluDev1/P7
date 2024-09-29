import { useState } from "react";
import "../styles/Login.scss";
import image from "../assets/icon-left-font-monochrome-white.webp";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLogIn, setIsLogIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stateForm, setStateForm] = useState("login");

  const handleLogin = async (data) => {
    const { email, password } = data;
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login Successful");
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleSignup = async (data) => {
    const { email, password } = data;
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Signup Successful:");
      navigate("/home");
    } catch (error) {
      console.error("Signup Error:", error.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="loginPage">
      <div className="form_container">
        <img src={image} alt="Logo" className="logo" />
        <div className="options">
          <ul>
            <li
              style={{
                borderBottomWidth: "2px",
                borderBottomColor:
                  stateForm === "login" ? "grey" : "transparent",
              }}
            >
              <a
                onClick={() => {
                  setIsLogIn(true);
                  setStateForm("login");
                }}
              >
                Login
              </a>
            </li>
            <li
              style={{
                borderBottomColor:
                  stateForm === "signup" ? "grey" : "transparent",
              }}
            >
              <a
                onClick={() => {
                  setIsLogIn(false);
                  setStateForm("signup");
                }}
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>

        {isLogIn ? (
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="input_container">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className="input_container">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                  required: "Password is required",
                })}
              />
            </div>
            <button type="submit" id="login_btn" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="input_container">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className="input_container">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                  required: "Password is required",
                })}
              />
            </div>
            <button type="submit" id="sign_up" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
