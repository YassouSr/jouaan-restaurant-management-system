import React, { useState } from "react";
import Button from "../../components/shared/Button";
import styles from "../../styles/pages/profile.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../styles/plugin/phone_input.css";
import sharedStyles from "../../styles/pages/pages.module.css";

const Profile = () => {
  const [value, setValue] = useState("undefined");

  return ( 
    <div>
      <h2 className={sharedStyles.heading}>Profile</h2>

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
              id="first_name"
              type="text"
              name="first_name"
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
              id="last_name"
              type="text"
              name="last_name"
            />
          </div>
        </div>

        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input className={styles.input} type="email" id="email" name="email" />

        <label className={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <PhoneInput country={"dz"} value={value} onChange={setValue} />

        <label className={styles.label} htmlFor="address">
          Address
        </label>
        <input
          className={styles.input}
          type="text"
          id="address"
          name="address"
        />

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          name="password"
        />

        <div className={`${styles.buttons} ${styles.row}`}>
          <Button
            class={sharedStyles.pageBtn}
            text="Update"
            color="var(--shade100)"
            bgColor="var(--warning)"
            type="submit"
          />
          <Button
            class={sharedStyles.pageBtn}
            text="Save Changes"
            color="var(--shade100)"
            bgColor="var(--success)"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
