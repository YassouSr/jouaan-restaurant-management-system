import React, { useContext } from "react";

import Button from "../../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../../styles/components/dashboard/customer_shopping_cart_model.module.css";
import { useNavigate } from "react-router-dom";

const ShoppingCartModel = () => {
  const navigate = useNavigate()
  const cartContext = useContext(ShoppingCartContext);
  const handleClick = () => {
    cartContext.openShoppingCartModel(false);
    navigate('/customer/checkout/')
  }

  return (
    <div className={styles.shoppingCartModel}>
      <div className={styles.title}>
        <h3>Shopping Cart</h3>
        <button
          className={styles.shoppingCartIconContainer}
          onClick={cartContext.closeShoppingCartModel}
        >
          <FontAwesomeIcon icon={solid("xmark")} size="xl" />
        </button>
      </div>
      {cartContext.listCustomerPlates.length === 0 ? (
        <p className={styles.noOrders}>No orders.</p>
      ) : (
        <React.Fragment>
          <div className={styles.content}>
            {cartContext.listCustomerPlates.map((order, i) => {
              return (
                <ShoppingCartItem
                  key={i}
                  id={order.id}
                  quantity={order.quantity}
                  price={order.price}
                  name={order.name}
                />
              );
            })}

            <div className={styles.totalPrice}>
              Total price : {cartContext.getTotalPrice()}
            </div>
          </div>
          <Button
            class={styles.callToAction}
            text="Proceed to checkout"
            color="var(--neutral)"
            bgColor="var(--success)"
            onClick={handleClick}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default ShoppingCartModel;
