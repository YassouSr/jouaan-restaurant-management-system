import React from "react";
import styles from "../../styles/pages/menu.module.css";
import sharedStyles from "../../styles/pages/pages.module.css";
import { PLATES_CATEGORIES, MENU_PLATES } from "../../assets/data/dummy";
import { useState } from "react";
import PlateCard from "../../components/shared/PlateCard";
import Pizza from "./../../assets/imgs/pizza_slider_square_1080.jpg";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";

const Menu = () => {
  const [activeLink, setActiveLink] = useState(PLATES_CATEGORIES[0]);
  const {counter, setCounter} = useContext(MainContext)
  
  return ( 
    <div className={styles.menu}>
      <h2 className={sharedStyles.heading}>Menu</h2>

      <h3 className={sharedStyles.subHeading}>Category</h3>
      <div className={styles.categories}>
        {PLATES_CATEGORIES.map((plate, i) => {
          return (
            <button
              key={i}
              className={
                activeLink === plate
                  ? `${styles.categoryBtn} ${styles.activeLink}`
                  : styles.categoryBtn
              }
              onClick={() => {
                setActiveLink(plate);
              }}
            >
              {plate}
            </button>
          );
        })}
      </div>

      <h3 className={sharedStyles.subHeading}>Category &gt; {activeLink} </h3>

      <div className={styles.plateCards}>
        {MENU_PLATES[activeLink].map((plate, i) => {
          return (
            <PlateCard
              key={i}
              myKey={i}
              image={Pizza}
              rating={plate.rating}
              title={plate.title}
              price={plate.price}
              callToAction="Order"
              btnColor="var(--primarySecond)"
              btnBgColor="var(--primaryFirst)"
              onClick={() => {setCounter(counter + 1)}}
            />
            
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
