import React, { useEffect } from "react";
import styles from "../../styles/pages/menu.module.css";
import sharedStyles from "../../styles/pages/pages.module.css";
import { MENU_PLATES } from "../../assets/data/dummy";
import { useState } from "react";
import PlateCard from "../../components/shared/PlateCard";
import Pizza from "./../../assets/imgs/pizza_slider_square_1080.jpg";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";


const Menu = () => {
  const [activeLink, setActiveLink] = useState("pizza"); 
  // import to add pizza since it will throw error on map level, fix it by returning the id of first category from api
  const {counter, setCounter} = useContext(MainContext)
  
  const [plateCategories, setPlateCategories] = useState([])
  // const [menuPlates, setMenuPlates] = useState([])

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/categories/";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setPlateCategories(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  }, []);

  return ( 
    <div className={styles.menu}>
      <h2 className={sharedStyles.heading}>Menu</h2>

      <h3 className={sharedStyles.subHeading}>Category</h3>
      <div className={styles.categories}>
        {plateCategories.map((category) => {
          console.log(category.name)
          return (
            <button
              key={category.id}
              className={
                activeLink === category.name
                  ? `${styles.categoryBtn} ${styles.activeLink}`
                  : styles.categoryBtn
              }
              onClick={() => {
                setActiveLink(category.name);
                console.log('active link : ')
                console.log(activeLink)
              }}
            >
              {category.name}
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
