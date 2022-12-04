import Pizza from "../../assets/imgs/pizza_slider_square_1080.jpg";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import PlateCard from "./PlateCard";
import "../../styles/plugin/swiper_slider.css";
import { useNavigate } from "react-router-dom";

const Slider = (props) => {
  const navigate = useNavigate()
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
            <PlateCard
              image={Pizza}
              rating={plate.rating}
              title={plate.title}
              price={plate.price}
              callToAction="Order Now"
              btnColor="var(--primarySecond)"
              btnBgColor="var(--primaryFirst)"
              onClick={() => {navigate('/signup')}}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
