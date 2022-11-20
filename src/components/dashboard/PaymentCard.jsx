import React from "react";
import styles from "../../styles/components/dashboard/payment_card.module.css";
import Button from "../shared/Button";

const PaymentCard = (props) => {
  return (   
    <div key={props.myKey} className={`${styles.paymentCard} ${props.class}`}>
      <div className={styles.iconContainer}>
        <img src={props.icon} alt="payment icon" />
      </div>
      <div className={styles.description}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.data}>{props.data}</p>
        <div className={styles.buttons}>
          <Button text="Update" color="var(--neutral)" bgColor="var(--warning)" />
          <Button text="Delete" color="var(--neutral)" bgColor="var(--error)" />
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
