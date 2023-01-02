import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from '../../styles/components/shared/plate_card.module.css';

const PlateCard = (props) => {
  
  return (
    <div className={props.class} key={props.myKey}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={props.image} alt="" />
        <div className={styles.rating}>
          <FontAwesomeIcon className={styles.icon} icon={solid("star")} />
          <span className={styles.ratingStar}>{props.rating}</span>
        </div>
      </div>
      <div className={styles.textContainer}>
        <h3>{props.title}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{props.price}DA</span>
          <Button
            className={styles.priceBtn}
            text={props.callToAction}
            color={props.btnColor}
            bgColor={props.btnBgColor}
            onClick={props.onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PlateCard;
