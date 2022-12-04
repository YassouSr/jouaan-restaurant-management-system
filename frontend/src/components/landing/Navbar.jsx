import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DefaultLogo from "../../assets/imgs/default_logo.svg";
import MobileLogo from "../../assets/imgs/logo_bg_light.svg";
import Button from "../shared/Button";
import Container from "../shared/Container";
import styles from "../../styles/components/landing/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { NAVBAR_LINKS } from "../../assets/data/dummy";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [navBtn, setNavBtn] = useState(false);
  const navigate = useNavigate()
  const toggleMobileMenu = () => {
    setNavBtn(!navBtn);
  };

  return (
    <Container>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <NavLink to="/">
            {!navBtn ? (
              <img src={DefaultLogo} alt="logo" />
            ) : (
              <img src={MobileLogo} alt="logo" />
            )}
          </NavLink>
        </div>

        <div className={styles.navMenu}>
          <ul>
            {NAVBAR_LINKS.map((elm, index) => {
              return (
                <li key={index} className={styles.listElement}>
                  {elm.link === "/" ? (
                    <NavLink to={elm.link}>{elm.name}</NavLink>
                  ) : (
                    <HashLink smooth to={elm.link}>
                      {elm.name}
                    </HashLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <Button
          class={styles.navBtn}
          text="Order Food"
          color="var(--primarySecond)"
          bgColor="var(--primaryFirst)"
          onClick={() => {navigate('/signup')}}
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
            {NAVBAR_LINKS.map((elm, index) => {
              return (
                <li key={index} className={styles.listElement}>
                  {elm.link === "/" ? (
                    <NavLink to={elm.link}>{elm.name}</NavLink>
                  ) : (
                    <HashLink smooth to={elm.link}>
                      {elm.name}
                    </HashLink>
                  )}
                </li>
              );
            })}
          </ul>

          <Button
            class={styles.mobileBtn}
            text="Order Food"
            color="var(--primarySecond)"
            bgColor="var(--primaryFirst)"
            onClick={() => {navigate('/signup')}}
          />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
