import Container from "../shared/Container";
import styles from "../../styles/footer.module.css";
import Logo from "../../assets/logo_bg_dark.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.links}>
            <h3 className={styles.heading}>Useful links</h3>
            <ul className={styles.list}>
              <li className={styles.listElement}>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.listElement}>
                <Link to="/">Languages</Link>
              </li>
              <li className={styles.listElement}>
                <Link to="/">Customer Support</Link>
              </li>
              <li className={styles.listElement}>
                <Link to="/">How It Works</Link>
              </li>
              <li className={styles.listElement}>
                <Link to="/">Careers</Link>
              </li>
            </ul>
          </div>

          <div className={styles.logo}>
            <img src={Logo} alt="Logo" />
          </div>

          <div className={styles.contact}>
            <h3 className={styles.heading}>Contact us</h3>

            <div className={styles.contactElement}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={solid("location-dot")}
                />
              </div>
              <p className={styles.footerParagraph}>Calle Remigio Sebastià</p>
            </div>

            <div className={styles.contactElement}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={solid("envelope")}
                />
              </div>
              <p className={styles.footerParagraph}>exemple@domain.com</p>
            </div>

            <div className={styles.contactElement}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={solid("phone")}
                />
              </div>
              <p className={styles.footerParagraph}>+213 854 77 45 79</p>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div>
            <p>Copyright &#169;2022 All rights reserved</p>
          </div>
          <div>
            <p>
              This website is made with{" "}
              <FontAwesomeIcon icon={solid("heart")} /> by{" "}
              <a
                href="https://www.linkedin.com/in/yasouakri/"
                style={{ color: "var(--primarySecond)" }}
              >
                Yassou
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
