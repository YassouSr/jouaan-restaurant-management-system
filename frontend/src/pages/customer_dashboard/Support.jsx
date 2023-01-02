import React, { useContext, useState } from "react";

import Button from "../../components/shared/Button";
import { MainContext } from "../../contexts/MainContext";
import { axiosInstance } from "../../axios";
import pagesStyle from "../../styles/pages/pages.module.css";

const Support = () => {
  const { userEmail } = useContext(MainContext);
  const initialFormData = Object.freeze({
    description: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState(false)

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
      .post(`support/`, {
        description: formData.description,
        email: userEmail,
      })
      .then((res) => {
        setSuccessMessage(true)
        console.log(res)
      })
      .catch((err) => {
        setSuccessMessage(false)
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <h2 className={pagesStyle.heading}>Customer Support</h2>

      <p>How can we help you ?</p>

      <form action="post">
        <textarea
          className={pagesStyle.textarea}
          name="description"
          placeholder="Write your issue ..."
          onChange={handleChange}
        />
        <Button
          class={pagesStyle.pageBtn}
          text={successMessage ? "Send another message" : "Send"}
          color="var(--neutral)"
          bgColor="var(--success)"
          type="submit"
          onClick={handleSubmit}
        />
      </form>

      {successMessage && <p>Your message has been sent. We will contact you as soon as possible.</p>}
    </React.Fragment>
  );
};

export default Support;
