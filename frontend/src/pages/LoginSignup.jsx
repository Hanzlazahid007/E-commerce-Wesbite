import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Log in");
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  // const login = async () => {
  //   console.log("login executed");
  //   console.log(formData);
  //   let responseData;
  //   await fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => (responseData = data));

  //   if (responseData.success) {
  //     localStorage.setItem("auth-token", responseData.token);
  //     window.location.replace("/");
  //   } else {
  //     console.log("error");
  //   }
  // };
  // =====
  // const login = async (formData) => {
  //   console.log("LOG in executed");
  //   console.log(formData);
  //   let responseData;
  //   await fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => (responseData = data));

  //   if (responseData.success) {
  //     localStorage.setItem("auth-token", responseData.token);
  //     // window.location.replace("/");
  //   } else {
  //     alert(responseData.errors);
  //   }
  // };

  // try {
  //   console.log("login executed");
  //   const response = await fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to login");
  //   }

  //   const responseData = await response.json();

  //   if (responseData.success) {
  //     localStorage.setItem("auth-token", responseData.token);
  //     window.location.replace("/");
  //   } else {
  //     console.log("Login failed: ", responseData.message);
  //   }
  // } catch (errors) {
  //   console.error("Error during login:", errors);
  // }

  // ======
  const login = async () => {
    console.log("Login executed");
    console.log(formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data))
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      if (responseData.isNewUser) {
        // Handle new signup case if needed
      } else {
        // Redirect or perform necessary actions for successful login
        window.location.replace("/");
      }
    } else {
      alert(responseData.errors);
    }
  };

  const signUp = async () => {
    console.log("signup executed");
    console.log(formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      // window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  // const signUp = async () => {
  //   console.log("signup executed");
  //   console.log(formData);
  //   let responceData;
  //   await fetch("http://localhost:4000/signup", {
  //     method: "POST",
  //     headers: {
  //       Acccept: "application/form-data",
  //       "Content-Type": "applicatipn/json",
  //     },

  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => (responceData = data));

  //   if (responceData.success) {
  //     localStorage.setItem("auth-token", responceData.token);
  //     window.location.replace("/");
  //   } else {
  //     console.log("error");
  //   }
  // };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign up" ? (
            <input
              onChange={changeHandler}
              type="text"
              name="username"
              value={formData.username}
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            onChange={changeHandler}
            value={formData.email}
            type="email"
            placeholder="Your email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Your password"
          />
        </div>
        <button onClick={() => (state === "Login" ? login() : signUp())}>
          Continue
        </button>
        {state === "Sign up" ? (
          <p className="loginsignup-login">
            Already have an account{" "}
            <span onClick={() => setState("Login")}>Login</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account
            <span onClick={() => setState("Sign up")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>BY continue , i agree to the term of use and priovacy policiy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
