import React from "react";
import Button from "../../components/shared/Button";
import { PAYMENTS, PAYMENT_CARDS } from "../../assets/data/dummy";
import styles from "../../styles/pages/payment.module.css";
import PaymentCard from "../../components/dashboard/PaymentCard";
import sharedStyles from "../../styles/pages/pages.module.css";

const Payment = () => {
  return ( 
    <div>
      <h2 className={sharedStyles.heading}>Payment</h2>

      <h3 className={sharedStyles.subHeading}>Supported methods</h3>

      <ul className={styles.paymentMethods}>
        {PAYMENTS.map((payment, index) => {
          return (
            <li key={index}>
              <img className={styles.icon} src={payment.icon} alt="payment" />
              <span>{payment.name}</span>
            </li>
          );
        })}
      </ul>

      <h3 className={sharedStyles.subHeading}>My cards</h3>

      <div className={styles.paymentCards}>
        {PAYMENT_CARDS.map((card, i) => {
          return (
            <PaymentCard
              key={i}
              myKey={i}
              class={styles.card}
              icon={card.icon}
              title={card.name}
              data={card.data}
            />
          );
        })}
      </div>

      <Button
        class={sharedStyles.pageBtn}
        text="Add New Card"
        color="var(--shade100)"
        bgColor="var(--success)"
      />
    </div>
  );
};

export default Payment;
