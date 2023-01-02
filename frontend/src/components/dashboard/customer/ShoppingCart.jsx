import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../../styles/components/dashboard/customer_shopping_cart.module.css";

const ShoppingCart = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartContext = useContext(ShoppingCartContext)
  const ordersCount = cartContext.listCustomerPlates.reduce((sum, plate) => sum + plate.quantity, 0);

  return (
    <div
      className={styles.shoppingCart}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      style={props.style}
    >
      <button onClick={cartContext.toggleShoppingCartModel} className={styles.shoppingCartBtn}>
        <FontAwesomeIcon
          className={styles.shoppingCartIcon}
          icon={solid("cart-shopping")}
          color={isHovered ? "var(--secondary)" : "var(--primaryFirst)"}
        />
        <span className={styles.shoppingCartCounter}> {ordersCount} </span>
      </button>
    </div>
  );
};

export default ShoppingCart;
