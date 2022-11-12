import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/form.module.css";
import Button from "../shared/Button";

const SignupForm = () => {
  return (
    <div className={styles.pageForm}>
      <div className={styles.container}>
        <div>
          <h2>sign up</h2>
        </div>
        <div className={styles.form}>
          <form action="" method="post">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
          </form>
        </div>
        <div className={styles.buttons}>
          <Button
            text="Sign up"
            color="var(--primaryFirst)"
            bgColor="var(--primarySecond)"
            to='/dashboard'
          />
          <div>
            <Link to="/">Forget password ?</Link>
          </div>
        </div>
      </div>
      <div className={styles.message}>
        <p>
          You already have an account ? <Link to='/login'>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
