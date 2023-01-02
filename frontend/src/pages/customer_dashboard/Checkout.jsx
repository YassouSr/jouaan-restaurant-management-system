import { Link, useNavigate } from "react-router-dom";
import { ORDER_FEES_TO_ADD, PAYMENTS } from "../../assets/data";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, axiosInstanceNoAuthentication } from "../../axios";

import Button from "../../components/shared/Button";
import { MainContext } from "../../contexts/MainContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import ShoppingCartItem from "../../components/dashboard/customer/ShoppingCartItem";
import pagesStyle from "../../styles/pages/pages.module.css";
import styles from "../../styles/pages/customer_checkout.module.css";

const Checkout = () => {
  const cartContext = useContext(ShoppingCartContext);
  const mainContext = useContext(MainContext);
  const navigate = useNavigate()

  const totalOrderPrice = cartContext.getTotalPrice();
  const totalOrderPriceWithExtraFees =
    +totalOrderPrice + ORDER_FEES_TO_ADD.delivery + ORDER_FEES_TO_ADD.service;

  const paymentObject = Object.freeze({
    payments: [],
  });
  const [allowedPayments, setAllowedPayments] = useState(
    paymentObject.payments
  );

  const [verifyOrder, setVerifyOrder] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const [userDataSection, setUserDataSection] = useState(false);
  const [radioChecked, setRadioChecked] = useState(false);
  const [btnCheckOrderClicked, setBtnCheckOrderClicked] = useState(false);

  const handleVerifyOrder = () => {
    setMakePayment(true);
    setVerifyOrder(false);
    setBtnCheckOrderClicked(true);
  };

  const allowMakingPayment = async (e) => {
    e.preventDefault();

    const data_to_send = {
      total_price: totalOrderPriceWithExtraFees,
      payment_method: radioChecked,
      customer: mainContext.userId,
      plates: cartContext.listCustomerPlates.map((order) => {
        return order.id;
      }),
      quantity: cartContext.listCustomerPlates.map((order) => {
        return {
          "plate_id": order.id,
          "plate_quantity": order.quantity
        }
      })
    }

    axiosInstance
      .post("create-order/", data_to_send)
      .then((res) => {
        console.log("your order has been sent and is currently under preparation.");
        cartContext.getListCustomerPlates([])
        navigate('/customer/history/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setRadioChecked(event.target.value);
  };

  useEffect(() => {
    const checkUserData = () => {
      console.log("mainContext.userAddressURL : " + mainContext.userAddressURL)
      console.log("mainContext.userAddressMap.latitude  : " + mainContext.userAddressMap.latitude )
      console.log("mainContext.userPhoneNumber  : " + mainContext.userPhoneNumber )
      
      
      console.log("mainContext.userPhoneNumber === undefined : " + (mainContext.userPhoneNumber === undefined))
      console.log("second cond : " + (mainContext.userAddressURL === null || mainContext.userAddressMap.latitude === null))

      
      console.log("full cond2 : " + (mainContext.userPhoneNumber === undefined && (mainContext.userAddressURL === null || mainContext.userAddressMap.latitude === null)))
      
      if (mainContext.userPhoneNumber === undefined && (mainContext.userAddressURL === null || mainContext.userAddressMap.latitude === null)) {
        console.log("inside true")
        setUserDataSection(true);
        setVerifyOrder(false);
        setMakePayment(false);
      } else {
        console.log("inside false")
        setUserDataSection(false);
        setVerifyOrder(true);
        setMakePayment(false);
      }
    };

    const fetchAllowedPayments = async () => {
      axiosInstanceNoAuthentication
        .get(`payments/`)
        .then((res) => {
          setAllowedPayments(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    checkUserData();
    fetchAllowedPayments();
  }, []);

  return (
    <div className={styles.checkout}>
      <h2 className={pagesStyle.heading}>Checkout</h2>

      {userDataSection ? (
        <div className={styles.row}>
          <div className={`${styles.title} ${styles.focus}`}>
            <h3>Add address and phone number</h3>
          </div>
          <div className={styles.collapse}>
            <p>
              An <b>address</b> and <b>phone number</b> are necessary to
              proceed.
            </p>
            <p>
              Please visit your{" "}
              <Link to={"/customer/profile/"}>Profile page</Link> and update
              your information.
            </p>
          </div>
        </div>
      ) : null}

      <div className={styles.row}>
        <div
          className={
            verifyOrder ? `${styles.title} ${styles.focus}` : styles.title
          }
        >
          <h3>Verify your order</h3>
        </div>
        <div
          className={styles.collapse}
          style={verifyOrder ? { display: "block" } : { display: "none" }}
        >
          {cartContext.listCustomerPlates.length === 0 ? (
            <p>You haven't ordered yet.</p>
          ) : (
            <React.Fragment>
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
              <div className={styles.priceSection}>
                <div>
                  <p>
                    <span>Sub total :</span>
                    <span>{totalOrderPrice}</span>
                  </p>
                  <p>
                    <span>Fees of delivery :</span>
                    <span>{ORDER_FEES_TO_ADD.delivery}</span>
                  </p>
                  <p>
                    <span>Fees of service :</span>
                    <span>{ORDER_FEES_TO_ADD.service}</span>
                  </p>
                  <p>
                    <span>Total price :</span>
                    <span>{totalOrderPriceWithExtraFees}</span>
                  </p>
                </div>
              </div>
              <div className={styles.btn}>
                <Button
                  text="Verify Order"
                  color="var(--neutral)"
                  bgColor="var(--success)"
                  onClick={handleVerifyOrder}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div
          className={
            makePayment ? `${styles.title} ${styles.focus}` : styles.title
          }
        >
          <h3>Payment method</h3>
        </div>
        <div
          className={styles.collapse}
          style={
            makePayment && btnCheckOrderClicked
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <form action="get">
            {allowedPayments.map((payment, i) => {
              return (
                <div key={i} className={styles.formItem}>
                  <div
                    className={styles.formItemContainer}
                    style={
                      radioChecked === payment.name
                        ? {
                            background: "white",
                            border: "1px solid var(--primarySecond)",
                          }
                        : {}
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={payment.id}
                      className={styles.formRadio}
                      onChange={handleChange}
                    />
                    <div className={styles.formLabel}>
                      <img
                        className={styles.icon}
                        src={PAYMENTS[payment.name]}
                        alt="payment"
                      />
                      {payment.id === 1 ? (
                        <span>cash on delivery</span>
                      ) : (
                        <span>{payment.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.btn}>
              <Button
                text="Make Payment"
                color="var(--neutral)"
                bgColor="var(--success)"
                onClick={allowMakingPayment}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
