import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import Button from "../shared/Button";
import { MainContext } from "../../contexts/MainContext";
import { axiosInstance, axiosInstanceHTTPOnlyCookie } from "../../axios";
import styles from "../../styles/components/shared/form.module.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const mainContext = useContext(MainContext)
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

    axiosInstance
      .post(`customer/signin/`, { 
        email: formData.email, 
        password: formData.password,
      })
      .then((res) => {
        console.log("login : ")
        console.log(res)
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
        mainContext.setLastName(res.data.user.last_name)
        mainContext.setFirstName(res.data.user.first_name)
        mainContext.setUserId(res.data.user.id)
        mainContext.setUserEmail(res.data.user.email)
        mainContext.setPhoneNumber(res.data.user.phone_number)
        mainContext.setUserAddressURL(res.data.user.address_url)
        
        if (res.data.user.address_map !== undefined) {
          mainContext.setUserAddressMap(res.data.user.address_map)
        } else {
          mainContext.setUserAddressMap({"longitude": null, "latitude":null})
        }
        
				navigate('/customer/menu/');
			})
      .catch((error) => {
        console.log(error);
      })
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    await axiosInstanceHTTPOnlyCookie
      .post(`auth/httponly/login/`, { 
        email: formData.email, 
        password: formData.password,
      },
      { withCredentials: true }
      )
      .then((res) => {
        console.log("login : ")
        console.log(res)
			})
      .catch((error) => {
        console.log(error);
      })
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
