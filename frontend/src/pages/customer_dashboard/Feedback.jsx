import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/shared/Button";
import { MainContext } from "../../contexts/MainContext";
import Swal from 'sweetalert2';
import { axiosInstance } from "../../axios";
import pagesStyle from "../../styles/pages/pages.module.css";
import profileStyles from "../../styles/pages/customer_profile.module.css";
import swalStyles from '../../styles/plugin/swal.module.css'

const Feedback = () => {
  const { userId } = useContext(MainContext);
  const initialFormData = Object.freeze({
    description: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [userHasFeedback, setHasFeedback] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleCreateFeedback = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`feedback/`, {
        description: formData.description,
        customer: userId,
      })
      .then((res) => {
        setHasFeedback(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateFeedback = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`feedback/${userId}/`, {
        description: formData.description,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteFeedback = (e) => {
    e.preventDefault();

      Swal.fire({
        titleText: "Are you sure ?",
      text: "Your feedback will be deleted for good.",
      icon: "warning",
      target: 'main',
      confirmButtonText: 'Delete',
      confirmButtonColor: 'var(--error)',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'var(--success)',
      returnFocus: false,
      focusCancel: true,
      customClass: {
        confirmButton: `${swalStyles.swal2Btn}`,
        cancelButton: `${swalStyles.swal2Btn}`
      }
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .delete(`feedback/${userId}/`)
            .then((res) => {
              setHasFeedback(false);
              updateFormData({ description: "" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
  };

  useEffect(() => {
    const checkIfUserHasFeedback = async () => {
      console.log("inside check user feedback")
      axiosInstance
        .get(`feedback/${userId}/`)
        .then((res) => {        
          // Customer has feedback
          updateFormData(res.data.description);
          setHasFeedback(true);
        })
        .catch((err) => {
          setHasFeedback(false);
        });
    };

    checkIfUserHasFeedback();

  }, []);

  return (
    <React.Fragment>
      <h2 className={pagesStyle.heading}>Feedback</h2>

      {userHasFeedback ? (
        <React.Fragment>
          <p>Update your feedback.</p>
          <form action="put">
            <textarea
              className={pagesStyle.textarea}
              name="description"
              onChange={handleChange}
            >{formData.description}</textarea>
            <div className={`${profileStyles.buttons} ${profileStyles.row}`}>
              <Button
                class={pagesStyle.pageBtn}
                text="Update"
                color="var(--neutral)"
                bgColor="var(--warning)"
                type="submit"
                onClick={handleUpdateFeedback}
              />
              <Button
                class={pagesStyle.pageBtn}
                text="Delete"
                color="var(--neutral)"
                bgColor="var(--error)"
                type="submit"
                onClick={handleDeleteFeedback}
              />
            </div>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>We'd love to hear from you what you’ve experienced with us.</p>
          <form action="post">
            <textarea
              className={pagesStyle.textarea}
              name="description"
              placeholder="Write your feedback ..."
              onChange={handleChange}
            />
            <Button
              class={pagesStyle.pageBtn}
              text="Send"
              color="var(--shade100)"
              bgColor="var(--success)"
              type="submit"
              onClick={handleCreateFeedback}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Feedback;
