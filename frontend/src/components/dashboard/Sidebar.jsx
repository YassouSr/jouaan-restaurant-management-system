import React, { useState } from "react";
import styles from "../../styles/components/dashboard/sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {SIDEBAR_LINKS} from '../../assets/data/dummy'
import { NavLink } from "react-router-dom";
 
const Sidebar = (props) => {
  const [isActive, setIsActive] = useState("menu");

  return ( 
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>{SIDEBAR_LINKS[props.type].title}</h2>

      <div className={styles.links}>
        <ul>
          {SIDEBAR_LINKS[props.type].links.map((link, index) => {
            return (
              <li key={index} className={styles.item}>
                <NavLink
                  onClick={(isActive) => {

                  }}
                  to={link.route}
                  className={({ isActive }) => (isActive ? `${styles.link} ${styles.activeLink}` : styles.link)}
                >
                  <FontAwesomeIcon className={styles.icon} icon={link.icon} />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
