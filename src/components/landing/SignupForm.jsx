import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/components/shared/form.module.css";
import Button from "../shared/Button";

const SignupForm = () => {
  const navigate = useNavigate()
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
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
          </form>
        </div>
        <div className={styles.buttons}>
          <Button
            text="Sign up"
            color="var(--primaryFirst)"
            bgColor="var(--primarySecond)"
            onClick={() => {navigate('/customer/menu')}}
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
