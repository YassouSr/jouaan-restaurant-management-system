import { ADDRESS, WORKING_DAYS, WORKING_HOURS } from '../../assets/data';

import Container from "../shared/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from '../../styles/components/landing/location.module.css';

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
                {ADDRESS}
              </address>
            </div>
          </div>

          <div className={styles.workTime}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.icon} icon={solid("clock")} />
            </div>
            <div className={styles.locationContent}>
              <h2>Working hours</h2>
              <p>{WORKING_DAYS[0]} to {WORKING_DAYS[1]}</p>
              <p>{WORKING_HOURS[0]} - {WORKING_HOURS[1]}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Location;
