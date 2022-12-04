import React from "react";
import styles from "../../styles/components/dashboard/history_card.module.css";

const HistoryCard = ({ date, plates, payment, price, myKey }) => {
  return (
    <div key={myKey} className={styles.order}>
      <p className={styles.title}>Order #{myKey}</p>
      <p className={styles.dateTime}>{date}</p>
      <div className={styles.plates}> 
        <p>Plates : </p>
        <div>
          {plates.map((plate, i) => {
            return <span key={i}>{plate}</span>;
          })}
        </div>
      </div>
      <p className={styles.payment}>Payment method : {payment}</p>
      <p className={styles.price}> Total : {price} DA</p>
    </div>
  );
};

export default HistoryCard;
