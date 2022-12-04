import React, { useEffect, useState } from "react";
import Button from "../../components/shared/Button";
import { PAYMENTS, PAYMENT_CARDS } from "../../assets/data/dummy";
import styles from "../../styles/pages/payment.module.css";
import PaymentCard from "../../components/dashboard/PaymentCard";
import sharedStyles from "../../styles/pages/pages.module.css";

const Payment = () => {
  const [allowedPayments, setAllowedPayments] = useState([])

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/payments/";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setAllowedPayments(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  }, []);

  return ( 
    <div>
      <h2 className={sharedStyles.heading}>Payment</h2>

      <h3 className={sharedStyles.subHeading}>Supported methods</h3>

      <ul className={styles.paymentMethods}>
        {allowedPayments.map((payment) => {
          return (
            <li key={payment.id}>
              <img className={styles.icon} src={PAYMENTS[payment.name]} alt="payment" />
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
