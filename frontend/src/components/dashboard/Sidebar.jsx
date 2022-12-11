import React, { useContext, useState } from "react";
import styles from "../../styles/components/dashboard/sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {SIDEBAR_LINKS} from '../../assets/data/dummy'
import { NavLink } from "react-router-dom";
import axiosInstance from "../../axios";
 
const Sidebar = (props) => {
  const navigate = useNavigate();

  const handleLogout = (name) => {
    console.log(name)
    if (name === "logout") {
      const response = axiosInstance.post('customer/logout/', {
        refresh_token: localStorage.getItem('refresh_token'),
      });
      console.log(response)
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      console.log(axiosInstance)
      navigate('/login/');
    }
	};

  return ( 
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>{SIDEBAR_LINKS[props.type].title}</h2>

      <div className={styles.links}>
        <ul>
          {SIDEBAR_LINKS[props.type].links.map((link, index) => {
            return (
              <li key={index} className={styles.item}>
                <NavLink
                  onClick={(isActive) => {handleLogout(link.name)}}
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
