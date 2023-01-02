import styles from "../../../styles/components/dashboard/customer_history_card.module.css";

const HistoryCard = (props) => {
  return (
    <div key={props.myKey} className={styles.order}>
      <p className={styles.title}>Order #{props.myKey}</p>
      <p className={styles.dateTime}>{props.date}</p>
      <div className={styles.plates}> 
        <p>Plates : </p>
        <div>
          {props.plates.map((plate, i) => {
            return <span key={i}>{plate.plate_name} ({plate.plate_quantity})</span>;
          })}
        </div>
      </div>
      <p className={styles.payment}>Payment method : {props.payment}</p>
      <p className={styles.payment}>Status : {props.status}</p>
      <p className={styles.price}> Total : {props.price} DA</p>
    </div>
  );
};

export default HistoryCard;
