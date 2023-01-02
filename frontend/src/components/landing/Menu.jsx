import Container from '../shared/Container';
import { PLATES } from '../../assets/data';
import Slider from '../shared/Slider';
import styles from '../../styles/components/landing/menu.module.css';

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
