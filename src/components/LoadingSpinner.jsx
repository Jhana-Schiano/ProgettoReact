import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinner} aria-label="Caricamento" />
  </div>
);

export default LoadingSpinner;
