import Container from '../shared/Container'
import Slider from './Slider'
import styles from '../../styles/menu.module.css'

const Menu = () => {
  var plates = [
    {
      id: 1,
      rating: "5.0",
      title: "Chicken",
      price: 300,
    },
    {
      id: 2,
      rating: "4.0",
      title: "Egg Omelet",
      price: 200,
    },
    {
      id: 3,
      rating: "4.5",
      title: "Sandwich",
      price: 180,
    },
    {
      id: 4,
      rating: "5.0",
      title: "Coffee with Brownie",
      price: 300,
    },
    {
      id: 5,
      rating: "5.0",
      title: "Panini",
      price: 400,
    },
  ];

  return (
    <div id='menu' className={styles.menu}>
      <Container>
        <h2>Menu</h2>
        <Slider class={styles.slider} data={plates} />
      </Container>
    </div>
  );
};

export default Menu;
