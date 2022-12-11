import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import styles from "../../styles/components/shared/form.module.css";
import Button from "../shared/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
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
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				navigate('/customer/menu/');
				console.log(res);
				console.log(res.data);
			});
  };

  return (
    <div className={styles.pageForm}>
      <div className={styles.container}>
        <div>
          <h2>sign in</h2>
        </div>
        <div className={styles.form}>
          <form>
            <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <div className={styles.buttons}>
              <Button
                text="Sign In"
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
          You don't have an account ? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
