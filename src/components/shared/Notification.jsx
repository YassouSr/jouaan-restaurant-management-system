import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../../styles/components/shared/notification.module.css";
import Container from "./Container";
import {
  faCircleInfo,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const Notification = ({ text, type }) => {
  const [clicked, setClicked] = useState(false);
  const closeNotification = () => {
    setClicked(true);
  };

  var types = {
    error: {
      icon: faCircleExclamation,
      color: "var(--error)",
    },
    warning: {
      icon: faTriangleExclamation,
      color: "var(--warning)",
    },
    success: {
      icon: faCircleCheck,
      color: "var(--success)",
    },
    info: {
      icon: faCircleInfo,
      color: "var(--info)",
    },
  };

  return (
    <div
      className={styles.notification}
      style={
        clicked
          ? { display: "none" }
          : { display: "block", backgroundColor: types[type].color }
      }
    >
      <Container>
        <div className={styles.content}>
          <div className={styles.message}>
            <FontAwesomeIcon icon={types[type].icon} />
            <p>{text}</p>
          </div>
          <FontAwesomeIcon
            className={styles.icon}
            icon={solid("xmark")}
            onClick={closeNotification}
          />
        </div>
      </Container>
    </div>
  );
};

export default Notification;
