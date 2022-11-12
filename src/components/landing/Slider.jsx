import Pizza from "../../assets/pizza_slider_square_1080.jpg";
import Button from "../shared/Button";
import styles from '../../styles/slider.module.css'
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigation } from "swiper";
import '../../styles/swiper_slider.css'
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = (props) => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      loop={false}
      grabCursor={true}
      navigation={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      modules={[Navigation]}
      className={props.class}
    >
      {props.data.map((plate) => {
        return (
          <SwiperSlide key={plate.id}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={Pizza} alt="" />
              <div className={styles.rating}>
                <FontAwesomeIcon className={styles.icon} icon={solid("star")} />
                <span className={styles.ratingStar}>{plate.rating}</span>
              </div>
            </div>
            <div className={styles.textContainer}>
              <h3>{plate.title}</h3>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{plate.price}DA</span>
                <Button className={styles.priceBtn}
                  text="Order Now"
                  color="var(--primarySecond)"
                  bgColor="var(--primaryFirst)"
                  to='/signup'
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
