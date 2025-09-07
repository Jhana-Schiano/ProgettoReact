import styles from './Search.module.css';

/**
 * Barra di ricerca con icona per la ricerca delle ricette
 */
const Search = ({ placeholder = "Cerca ricette...", onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (value && onSearch) onSearch(value);
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <svg 
          className={styles.searchIcon} 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            cx="11" 
            cy="11" 
            r="8" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="m21 21-4.35-4.35" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <input
          name="search"
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Campo ricerca ricette"
        />
      </div>
    </form>
  );
};

export default Search;
