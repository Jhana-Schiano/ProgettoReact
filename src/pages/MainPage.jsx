import RicettaCard from '../components/RicettaCard';
import styles from './MainPage.module.css';

const MainPage = () => {
  const handleCardClick = () => {
    console.log('Card ricetta cliccata!');
  };

  return (
    <div className={styles.ricetteContainer}>
      <RicettaCard 
        img="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop"
        titolo="Ricetta di esempio"
        onClick={handleCardClick}
      />
    </div>
  );
};

export default MainPage;
