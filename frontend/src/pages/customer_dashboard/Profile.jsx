import "react-phone-input-2/lib/style.css";
import "../../styles/plugin/phone_input.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/shared/Button";
import CustomerMap from "../../components/shared/CustomerMap";
import { MainContext } from "../../contexts/MainContext";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import { axiosInstance } from "../../axios";
import mapboxgl from "mapbox-gl";
import pagesStyle from "../../styles/pages/pages.module.css";
import styles from "../../styles/pages/customer_profile.module.css";
import swalStyles from "../../styles/plugin/swal.module.css";
import withReactContent from "sweetalert2-react-content";

const MapModelSwal = withReactContent(Swal);

const Profile = () => {
  const mainContext = useContext(MainContext);
  const initialFormData = Object.freeze({
    first_name: mainContext.firstName,
    last_name: mainContext.lastName,
    email: mainContext.userEmail,
    address_url: mainContext.userAddressURL,
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [mapboxEnabled, checkMapboxEnabled] = useState(true);
  const [addressFromMap, setAddressFromMap] = useState(false);
  const navigate = useNavigate();
  const userAddressMapRef = React.useRef(
    mainContext.userAddressMap.latitude === null
      ? { longitude: 1.6596, latitude: 28.0339 } // Algeria coords
      : mainContext.userAddressMap
  );

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    let update_request_data = {};

    if (mapboxEnabled) {
      if (addressFromMap === false && mainContext.userAddressMap.latitude === null) {
        Swal.fire({
          text: "You must choose your location from Map.",
          icon: "error",
          target: "main",
          confirmButtonColor: "var(--success)",
          customClass: {
            confirmButton: `${swalStyles.swal2Btn}`,
          },
        });
      } else {
        update_request_data = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: mainContext.phoneNumber,
          address_map: {
            customer: mainContext.userId,
            ...mainContext.userAddressMap,
          },
        };
        
        axiosInstance
          .put(`customer/${mainContext.userId}/`, update_request_data)
          .then((res) => {
            mainContext.setFirstName(res.data.first_name);
            mainContext.setLastName(res.data.last_name);
            mainContext.setUserEmail(res.data.email);
            mainContext.setPhoneNumber(res.data.phone_number);
            mainContext.setUserAddressMap(res.data.address_map);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      update_request_data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: mainContext.phoneNumber,
        address_url: formData.address_url,
      };

      axiosInstance
        .put(`customer/${mainContext.userId}/`, update_request_data)
        .then((res) => {
          mainContext.setFirstName(res.data.first_name);
          mainContext.setLastName(res.data.last_name);
          mainContext.setUserEmail(res.data.email);
          mainContext.setPhoneNumber(res.data.phone_number);
          mainContext.setUserAddressURL(res.data.address_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      titleText: "Are you sure ?",
      text: "Your account will be deleted for good.",
      icon: "warning",
      target: "main",
      confirmButtonText: "Delete",
      confirmButtonColor: "var(--error)",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "var(--success)",
      customClass: {
        confirmButton: `${swalStyles.swal2Btn}`,
        cancelButton: `${swalStyles.swal2Btn}`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`customer/${mainContext.userId}/`)
          .then((res) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            axiosInstance.defaults.headers["Authorization"] = null;
            console.log(res);
            navigate("/signup/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleCustomerAddress = (e) => {
    e.preventDefault();
    
    // initialize map
    MapModelSwal.fire({
      html: <CustomerMap userAddressMapRef={userAddressMapRef} />,
      target: "main",
      confirmButtonText: "Confirm",
      confirmButtonColor: "var(--success)",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "var(--error)",
      grow: "fullscreen",
      customClass: {
        popup: `${swalStyles.swal2Title}`,
        htmlContainer: `${swalStyles.swal2Container}`,
        confirmButton: `${swalStyles.swal2Btn}`,
        cancelButton: `${swalStyles.swal2Btn}`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setAddressFromMap(true);
        // update user address with new coords
        mainContext.setUserAddressMap(userAddressMapRef.current);
      } else {
        setAddressFromMap(false);
        Swal.fire({
          text: "You must choose your location from Map.",
          icon: "error",
          target: "main",
          confirmButtonColor: "var(--success)",
          customClass: {
            confirmButton: `${swalStyles.swal2Btn}`,
          },
        });
      }
    });
  };

  useEffect(() => {
    if (mapboxgl.supported()) {
      // Supported
      checkMapboxEnabled(true);
    } else {
      // Not Supported
      checkMapboxEnabled(false);
    }
  }, []);

  return (
    <React.Fragment>
      <h2 className={pagesStyle.heading}>Profile</h2>

      <form action="post">
        <div className={styles.row}>
          <div className={styles.col}>
            <label
              className={styles.label}
              htmlFor="first_name"
              style={{ width: "100%" }}
            >
              First Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="first_name"
              onChange={handleChange}
              defaultValue={mainContext.firstName}
            />
          </div>

          <div className={styles.col}>
            <label
              className={styles.label}
              htmlFor="last_name"
              style={{ width: "100%" }}
            >
              Last Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="last_name"
              onChange={handleChange}
              defaultValue={mainContext.lastName}
            />
          </div>
        </div>

        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          onChange={handleChange}
          defaultValue={mainContext.userEmail}
        />

        <label className={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <PhoneInput
          country={"dz"}
          value={mainContext.phoneNumber}
          onChange={mainContext.setPhoneNumber}
        />

        <label className={styles.label} htmlFor="address">
          Address
        </label>
        {mapboxEnabled ? (
          mainContext.userAddressMap.latitude != null ? (
            <React.Fragment>
              <p>
                <a
                  href={`https://www.google.com/maps/place/${
                    mainContext.userAddressMap.latitude
                  }+${mainContext.userAddressMap.longitude}/@${
                    mainContext.userAddressMap.latitude
                  },${
                    mainContext.userAddressMap.longitude
                  },${15}z/data=!3m1!1e3`}
                  target="_blank"
                  rel="noreferrer"
                >
                  See your location on Google Map ...
                </a>
              </p>
              <button
                className={styles.btnLink}
                onClick={handleCustomerAddress}
              >
                Choose another address from map ...
              </button>
            </React.Fragment>
          ) : (
            <div>
              <button
                className={styles.btnLink}
                onClick={handleCustomerAddress}
              >
                Choose your address from map ...
              </button>
            </div>
          )
        ) : (
          <React.Fragment>
            {mainContext.userAddressURL ? null : <p>
              Please enter a google map link to your address. If you are not
              familiar with Google Maps, read the{" "}
              <Link to="/how-it-works" target={"_blank"}>
                How It Works
              </Link>{" "}
              page to proceed.
            </p> }
            <input
              className={styles.input}
              type="url"
              name="address_url"
              onChange={handleChange}
              defaultValue={mainContext.userAddressURL}
              placeholder="https://goo.gl/maps/aAaAAqAd"
            />
          </React.Fragment>
        )}

        <div className={`${styles.buttons} ${styles.row}`}>
          <Button
            class={pagesStyle.pageBtn}
            text="Update"
            color="var(--neutral)"
            bgColor="var(--warning)"
            type="submit"
            onClick={handleUpdateSubmit}
          />
          <Button
            class={pagesStyle.pageBtn}
            text="Delete account"
            color="var(--neutral)"
            bgColor="var(--error)"
            type="submit"
            onClick={handleDeleteSubmit}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Profile;
