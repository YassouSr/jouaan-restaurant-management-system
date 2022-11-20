import Container from '../shared/Container'
import Slider from '../shared/Slider'
import styles from '../../styles/components/landing/menu.module.css'
import {PLATES} from '../../assets/data/dummy'

const Menu = () => {
  return (
    <div id='menu' className={styles.menu}>
      <Container>
        <h2>Menu</h2>
        <Slider class={styles.slider} data={PLATES} />
      </Container>
    </div>
  );
};

export default Menu;
