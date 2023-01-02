import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SIDEBAR_LINKS } from "../../assets/data";
import { axiosInstance } from "../../axios";
import styles from "../../styles/components/dashboard/sidebar.module.css";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const handleLogout = (name) => {
    if (name === "logout") {
      axiosInstance
        .post("user/logout/", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then((res) => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          axiosInstance.defaults.headers["Authorization"] = null;
          navigate("/login/");
        })
        .catch((error) => {
          console.log(error);
        });
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
                  onClick={(isActive) => {
                    handleLogout(link.name);
                  }}
                  to={link.route}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link} ${styles.activeLink}`
                      : styles.link
                  }
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
