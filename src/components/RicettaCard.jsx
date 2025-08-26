import styles from './RicettaCard.module.css';

const RicettaCard = ({ img, titolo, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img 
          src={img} 
          alt={titolo} 
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{titolo}</h3>
      </div>
    </div>
  );
};

export default RicettaCard;
