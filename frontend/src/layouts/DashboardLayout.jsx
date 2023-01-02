import React, { useContext } from "react";

import Container from "../components/shared/Container";
import Footer from "../components/shared/Footer";
import { MainContext } from "../contexts/MainContext";
import Navbar from "../components/dashboard/Navbar";
import Notification from "../components/shared/Notification";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import styles from "../styles/dashboard_layout.module.css";

const DashboardLayout = (props) => {
  const { openSidebar } = useContext(MainContext);

  return (
    <React.Fragment>
      <Navbar username="Yasmine Souakri" type={props.type} />

      <main className={styles.main}>
        <Notification
          text="Operation has successfully finished"
          type="success"
        />
        <Container class={styles.content}>
          <div className={styles.aside}>
            {openSidebar && <Sidebar type={props.type} />}
          </div>

          <div className={styles.article}>
            <Outlet />
          </div>
        </Container>
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default DashboardLayout;
