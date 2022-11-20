import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ORDERS_HISTORY } from "../../assets/data/dummy";
import styles from "../../styles/pages/history.module.css";
import HistoryCard from "../../components/dashboard/HistoryCard";
import sharedStyles from "../../styles/pages/pages.module.css";

const History = () => {
  return (
    <div>
      <h2 className={sharedStyles.heading}>History</h2>

      <div className={styles.searchBar}>
        <form action="get">
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by data, plates or payment method"
          />
        </form>
      </div>

      <div className={styles.historyOrders}>
        {ORDERS_HISTORY.map((order, i) => {
          return (
            <HistoryCard
              key={i}
              myKey={i}
              index={i}
              date={order.date}
              plates={order.plates}
              payment={order.payment}
              price={order.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default History;
