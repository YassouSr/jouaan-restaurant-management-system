import Animation from "../../assets/imgs/delivery_animation.gif";
import Button from "../shared/Button";
import Container from "../shared/Container";
import styles from "../../styles/components/landing/delivery.module.css";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const navigate = useNavigate()
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
            onClick={() => {navigate('/signup')}}
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
