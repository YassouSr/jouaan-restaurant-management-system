import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/components/shared/form.module.css";
import Button from "../shared/Button";
import axiosInstance from "../../axios.js";

const SignupForm = () => {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    last_name: "",
    first_name: "",
    password: "",
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`customer/signup/`, {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      })
      .then((res) => {
        navigate("/login");
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className={styles.pageForm}>
      <div className={styles.container}>
        <div>
          <h2>sign up</h2>
        </div>
        <div className={styles.form}>
          <form action="" method="post">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <div className={styles.buttons}>
              <Button
                text="Sign up"
                color="var(--primaryFirst)"
                bgColor="var(--primarySecond)"
                onClick={handleSubmit}
              />
              <div>
                <Link to="/">Forget password ?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.message}>
        <p>
          You already have an account ? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
