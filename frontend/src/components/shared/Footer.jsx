import Container from "../shared/Container";
import styles from "../../styles/components/shared/footer.module.css";
import Logo from "../../assets/imgs/logo_bg_dark.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { SHORT_ADDRESS, EMAIL, TEL } from "../../assets/data/dummy";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.links}>
            <h3 className={styles.heading}>Useful links</h3>
            <ul className={styles.list}>
              <li className={styles.listElement}>
                <NavLink to="/">home</NavLink>
              </li>
              <li className={styles.listElement}>
                <NavLink to="/">how it works</NavLink>
              </li>
              <li className={styles.listElement}>
                <NavLink to="/">customer support</NavLink>
              </li>
              <li className={styles.listElement}>
                <NavLink to="/">languages</NavLink>
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
              <p className={styles.footerParagraph}>{SHORT_ADDRESS}</p>
            </div>

            <div className={styles.contactElement}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={solid("envelope")}
                />
              </div>
              <p className={styles.footerParagraph}>{EMAIL}</p>
            </div>

            <div className={styles.contactElement}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={solid("phone")}
                />
              </div>
              <p className={styles.footerParagraph}>{TEL}</p>
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
