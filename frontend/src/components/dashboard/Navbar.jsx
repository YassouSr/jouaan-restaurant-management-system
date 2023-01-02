import { useContext, useEffect, useState } from "react";

import Container from "../shared/Container";
import DefaultLogo from "../../assets/imgs/default_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainContext } from "../../contexts/MainContext";
import { NavLink } from "react-router-dom";
import ShoppingCart from "./customer/ShoppingCart";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import ShoppingCartModel from "./customer/ShoppingCartModel";
import sharedStyles from "../../styles/components/landing/navbar.module.css";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../styles/components/dashboard/navbar.module.css";

const Navbar = (props) => {
  const {
    openSidebar,
    setOpenSidebar,
    setScreenSize,
    screenSize,
    lastName,
    firstName,
  } = useContext(MainContext);
  const [isHovered, setIsHovered] = useState(false);
  const cartContext = useContext(ShoppingCartContext)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 768) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  }, [screenSize]);

  const handleOpenSidebar = () => setOpenSidebar(!openSidebar);

  return (
    <nav className={styles.nav}>
      <Container>
        <div className={sharedStyles.navbar}>
          <div className={styles.navItem}>
            <div
              className={sharedStyles.humbugger}
              style={{marginRight: "16px"}}
              onClick={handleOpenSidebar}
            >
              <FontAwesomeIcon
                className={sharedStyles.icon__1}
                icon={solid("bars")}
                size={"xl"}
              />
            </div>
            <div className={sharedStyles.logo}>
              <NavLink to="/">
                <img src={DefaultLogo} alt="logo" />
              </NavLink>
            </div>
          </div>

          <div className={styles.navItem}>
            <div className={styles.navType}>
              Welcome {firstName} {lastName}
            </div>
            <button
              className={styles.navBtn}
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              style={{marginLeft: "16px"}}
            >
              <FontAwesomeIcon
                className={styles.navIcon}
                icon={solid("language")}
                color={isHovered ? "var(--secondary)" : "var(--primaryFirst)"}
              />
            </button>
            <ShoppingCart style={{marginLeft: "16px"}} />
          </div>
        </div>
        
        {cartContext.shoppingCartModelState && <ShoppingCartModel />}
      </Container>
    </nav>
  );
};

export default Navbar;
