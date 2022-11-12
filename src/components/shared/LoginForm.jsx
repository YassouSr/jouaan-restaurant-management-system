import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/form.module.css";
import Button from "../shared/Button";

const LoginForm = () => {
  return (
    <div className={styles.pageForm}>
      <div className={styles.container}>
        <div>
          <h2>sign in</h2>
        </div>
        <div className={styles.form}>
          <form action="" method="post">
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
          </form>
        </div>
        <div className={styles.buttons}>
          <Button
            text="Sign In"
            color="var(--primaryFirst)"
            bgColor="var(--primarySecond)"
            to='/dashboard'
          />
          <div>
            <Link to='/'>Forget password ?</Link>
          </div>
        </div>
      </div>
      <div className={styles.message}>
        <p>
          You don't have an account ? <Link to='/signup'>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
