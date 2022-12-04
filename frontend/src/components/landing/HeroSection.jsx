import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Egg from "../../assets/imgs/egg_hero.jpg";
import Pizza from "../../assets/imgs/pizza_hero.jpg";
import Button from "../shared/Button";
import styles from '../../styles/components/landing/hero_section.module.css'
import { useNavigate } from "react-router-dom";

const HeroSection = () => { 
  const navigate = useNavigate()
  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <h1>are you hungry and with less money ? </h1>
        <h4>
          No problem we've got you covered. All what you crave in one place.
        </h4>
        <h4>Pick, tweak and order your dish.</h4>

        <div className={styles.buttons}>
          <Button 
            text="Know More"
            color="var(--primaryFirst)"
            bgColor="var(--shade5)"
            onClick={() => {navigate('/#menu')}}
          />

          <Button 
            text="Order Now"
            color="var(--primarySecond)"
            bgColor="var(--primaryFirst)"
            onClick={() => {navigate('/signup')}}
          />
        </div>
      </div>

      <div className={styles.images}>
        <div className={`${styles.box} ${styles.box1}`}></div>

        <div className={`${styles.box} ${styles.box2}`}>
          <img src={Egg} alt="egg omelet" />
        </div>

        <div className={`${styles.box} ${styles.box3}`}>
          <img src={Pizza} alt="pizza" />
        </div>
      </div>

      <div className={styles.icons}>
        <div className={`${styles.iconContainer} ${styles.icon1}`}>
          <FontAwesomeIcon className={styles.icon} icon={solid("mug-hot")} />
        </div>
        <div className={`${styles.iconContainer} ${styles.icon2}`}>
          <FontAwesomeIcon className={styles.icon} icon={solid("burger")} />
        </div>
        <div className={`${styles.iconContainer} ${styles.icon3}`}>
          <FontAwesomeIcon className={styles.icon} icon={solid("utensils")} />
        </div>
        <div className={`${styles.iconContainer} ${styles.icon4}`}>
          <FontAwesomeIcon className={styles.icon} icon={solid("pizza-slice")} />
        </div>
        <div className={`${styles.iconContainer} ${styles.icon5}`}>
          <FontAwesomeIcon className={styles.icon} icon={solid("bacon")} />
        </div>
        <div className={`${styles.iconContainer} ${styles.icon6}`}>
          <FontAwesomeIcon
            icon={solid("hotdog")}
            className={styles.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
