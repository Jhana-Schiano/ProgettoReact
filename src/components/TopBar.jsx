import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h1 className={styles.title}>GreenGourmet</h1>
          <p className={styles.slogan}>Gourmet. Green. Good.</p>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
