import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/history.module.css";
import HistoryCard from "../../components/dashboard/HistoryCard";
import sharedStyles from "../../styles/pages/pages.module.css";

const History = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/orders/";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setOrders(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  }, []);

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
        {orders.map((order) => {
          return (
            <HistoryCard
              key={order.id}
              myKey={order.id}
              date={order.date_time}
              plates={order.plates}
              payment={order.payment_method}
              price={order.total_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default History;
