import styles from "../../styles/components/dashboard/navbar.module.css";
import sharedStyles from "../../styles/components/landing/navbar.module.css";

import DefaultLogo from "../../assets/imgs/default_logo.svg";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ContextProvider, MainContext } from "../../contexts/MainContext";
import OrdersCard from "../dashboard/OrdersCard"
import { NavLink } from "react-router-dom";
 
const Navbar = (props) => { 
  const { openSidebar, setOpenSidebar, setScreenSize, screenSize } = useContext(MainContext);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // @ts-ignore
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
            <div className={`${sharedStyles.humbugger} ${styles.navBtn}`} onClick={handleOpenSidebar}>
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
            <span className={styles.navType}>{props.type} dashboard</span>
            <OrdersCard />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
