import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../styles/components/dashboard/orders_card.module.css"

const OrdersCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const counter = 1;
 
  return (
    <div
      className={styles.shoppingCart}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Link to={"/customer/history"}>
        <FontAwesomeIcon
          className={styles.shoppingCartIcon}
          icon={solid("cart-shopping")}
          color={isHovered ? "var(--secondary)" : "var(--primaryFirst)"}
        />
        <span>{counter}</span>
      </Link>
    </div>
  );
};

export default OrdersCard;

