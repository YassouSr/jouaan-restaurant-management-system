import Button from "../shared/Button";
import Container from "../shared/Container";
import styles from "../../styles/delivery.module.css";
import Animation from "../../assets/delivery_animation.gif";
const Delivery = () => {

  return (
    <Container>
      <div id='delivery' className={styles.delivery}>
        <div className={styles.content}>
          <h2>Delivery service</h2>
          <p>
            Order whatever you want and whenever you want, we will deliver your
            food to your house at a glance.
          </p>
          <Button
            text="Order Now"
            color="var(--primaryFirst)"
            bgColor="var(--primarySecond)"
            to='/signup'
          />
        </div>

        <div className={styles.animation}>
          <img src={Animation} alt="Delivery animation" />
        </div>
      </div>
    </Container>
  );
};

export default Delivery;
