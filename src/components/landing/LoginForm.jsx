import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/components/shared/form.module.css";
import Button from "../shared/Button";

const LoginForm = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.pageForm}>
      <div className={styles.container}>
        <div>
          <h2>sign in</h2>
        </div>
        <div className={styles.form}>
          <form action="" method="post">
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
          </form>
        </div>
        <div className={styles.buttons}>
          <Button
            text="Sign In"
            color="var(--primaryFirst)"
            bgColor="var(--primarySecond)"
            onClick={() => {navigate('/customer/menu')}}
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
