import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from '../../../styles/components/dashboard/customer_quantity.module.css';
import { useContext } from "react";

const Quantity = (props) => {
  const cartContext = useContext(ShoppingCartContext);

  return (
    <div className={styles.quantity}>
      <div className={styles.iconContainer} onClick={() => {cartContext.addOnePlateToCart(props.id)}}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={solid("plus")}
          color={"var(--primarySecond)"}
        />
      </div>
      <span>{cartContext.getPlateQuantity(props.id)}</span>
      <div className={styles.iconContainer} onClick={() => {cartContext.removeOnePlateFromCart(props.id)}}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={solid("minus")}
          color={"var(--primarySecond)"}
        />
      </div>
    </div>
  );
};

export default Quantity;
