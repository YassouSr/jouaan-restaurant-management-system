import styles from '../../styles/location.module.css'
import Container from "../shared/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Location = () => {
  return ( 
    <div id='location' className={styles.location}>
      <Container>
        <div className={styles.bloc}>
          <div className={styles.address}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.icon} icon={solid("location-dot")} />
            </div>
            <div className={styles.locationContent}>
              <h2>Our location</h2>
              <address>
                Calle Remigio Sebastià, 17, 03002 Alacant, Alicante, Spain
              </address>
            </div>
          </div>

          <div className={styles.workTime}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.icon} icon={solid("clock")} />
            </div>
            <div className={styles.locationContent}>
              <h2>Working hours</h2>
              <p>Sunday to Thursday</p>
              <p>9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Location;
