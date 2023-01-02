import React, { useContext, useEffect, useState } from "react";

import Pizza from "./../../assets/imgs/pizza_slider_square_1080.jpg";
import PlateCard from "../../components/shared/PlateCard";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { axiosInstanceNoAuthentication } from "../../axios";
import pagesStyle from "../../styles/pages/pages.module.css";
import styles from "../../styles/pages/customer_menu.module.css";

const Menu = () => {
  const [activeLink, setActiveLink] = useState("pizza"); // important
  const cartContext = useContext(ShoppingCartContext)
  const categoriesObject = Object.freeze({
    categories: [],
    plates: [],
  });

  const [plateCategories, setPlateCategories] = useState(
    categoriesObject.categories
  );
  const [plates, setPlates] = useState(categoriesObject.plates);

  useEffect(() => {
    const fetchCategories = async () => {
      axiosInstanceNoAuthentication
        .get(`categories/`)
        .then((res) => {
          setPlateCategories(res.data);
          setActiveLink(res.data[0].name);
          getCategoryPlates(res.data[0].id); // list plates without clicking on first category link
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCategories();
  }, []);

  const getCategoryPlates = (category) => {
    axiosInstanceNoAuthentication
      .get(`plates/${category}/`)
      .then((res) => {
        setPlates(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <h2 className={pagesStyle.heading}>Menu</h2>

      <h3 className={pagesStyle.subHeading}>Category</h3>
      <div className={styles.categories}>
        {plateCategories.map((category) => {
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
                getCategoryPlates(category.id);
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
        
      <h3 className={pagesStyle.subHeading}>Category &gt; {activeLink} </h3>

      <div className={styles.plateCards}>
        {plates.length === 0 ? (
          <p>No plates yet.</p>
        ) : (
          plates.map((plate, i) => {
            return (
              <PlateCard
                key={i}
                myKey={i}
                image={Pizza}
                rating={plate.rating}
                title={plate.name}
                price={plate.price}
                callToAction="Order"
                btnColor="var(--primarySecond)"
                btnBgColor="var(--primaryFirst)"
                onClick={() => {cartContext.addOnePlateToCart(plate.id, plate.name, plate.price)}}
              />
            );
          })
        )}
      </div>
    </React.Fragment>
  );
};

export default Menu;
