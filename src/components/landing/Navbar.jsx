import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DefaultLogo from "../../assets/default_logo.svg";
import MobileLogo from "../../assets/logo_bg_light.svg";
import Button from "../shared/Button";
import Container from "../shared/Container";
import styles from "../../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [navBtn, setNavBtn] = useState(false);

  const toggleMobileMenu = () => {
    setNavBtn(!navBtn);
  };

  return (
    <Container>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            {!navBtn ? (
              <img src={DefaultLogo} alt="logo" />
            ) : (
              <img src={MobileLogo} alt="logo" />
            )}
          </Link>
        </div>

        <div className={styles.navMenu}>
          <ul>
            <li className={styles.listElement}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.listElement}>
              <HashLink smooth to="/#menu">
                Menu
              </HashLink>
            </li>
            <li className={styles.listElement}>
              <HashLink smooth to="/#location">
                Location
              </HashLink>
            </li>
            <li className={styles.listElement}>
              <HashLink smooth to="/#delivery">
                Delivery
              </HashLink>
            </li>
          </ul>
        </div>

        <Button
          className={styles.navBtn}
          text="Order Food"
          color="var(--primarySecond)"
          bgColor="var(--primaryFirst)"
          to='/signup'
        />

        <div className={styles.humbugger} onClick={toggleMobileMenu}>
          {!navBtn ? (
            <FontAwesomeIcon
              className={styles.icon__1}
              icon={solid("bars")}
              size={"xl"}
            />
          ) : (
            <FontAwesomeIcon
              className={styles.icon__2}
              icon={solid("xmark")}
              size={"2xl"}
            />
          )}
        </div>

        <div
          className={!navBtn ? `${styles.mobileMenu}` : `${styles.menuToggle}`}
        >
          <ul className={styles.list}>
            <li className={styles.listElement}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.listElement}>
              <HashLink smooth to="/#menu">
                Menu
              </HashLink>
            </li>
            <li className={styles.listElement}>
              <HashLink smooth to="/#location">
                Location
              </HashLink>
            </li>
            <li className={styles.listElement}>
              <HashLink smooth to="/#delivery">
                Delivery
              </HashLink>
            </li>
          </ul>

          <Button
            className={styles.mobileBtn}
            text="Order Food"
            color="var(--primarySecond)"
            bgColor="var(--primaryFirst)"
            to='/signup'
          />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
