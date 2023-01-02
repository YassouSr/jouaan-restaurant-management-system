import React, { useContext, useEffect, useState } from "react";

import HistoryCard from "../../components/dashboard/customer/HistoryCard";
import { MainContext } from "../../contexts/MainContext";
import { axiosInstance } from "../../axios";
import pagesStyle from "../../styles/pages/pages.module.css";
import styles from "../../styles/pages/customer_history.module.css";

const History = () => {
  const [apiUserOrdersData, setApiUserOrdersData] = useState([]);
  const { userId } = useContext(MainContext);

  useEffect(() => {
    const fetchOrders = async () => {
      axiosInstance
        .get(`orders/${userId}/`)
        .then((res) => {
          setApiUserOrdersData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchOrders();
  }, []);

  return (
    <React.Fragment>
      <h2 className={pagesStyle.heading}>History</h2>

      <div className={styles.historyOrders}>
        {apiUserOrdersData.length === 0 ? (
          <p>No orders to show.</p>
        ) : (
          apiUserOrdersData.map((order, i) => {
            return (
              <HistoryCard
                key={i + 1}
                myKey={i + 1}
                date={order.timestamp}
                plates={order.plates}
                payment={order.payment}
                price={order.price}
                status={order.status}
              />
            );
          })
        )}
      </div>
    </React.Fragment>
  );
};

export default History;
