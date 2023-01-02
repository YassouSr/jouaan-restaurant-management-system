import Quantity from "./Quantity";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import styles from "../../../styles/components/dashboard/customer_shopping_cart_item.module.css";
import { useContext } from "react";

const ShoppingCartItem = (props) => {
  const cartContext = useContext(ShoppingCartContext)

  return (
    <div className={styles.ShoppingCartItem}>
      <div className={styles.row}>
        <h4>{props.name}</h4>
        <span className={styles.totalPrice}>{props.price}</span> 
      </div>
      <div className={styles.row}>
        <Quantity id={props.id} /> 
        <button onClick={() => cartContext.deletePlateFromCart(props.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
