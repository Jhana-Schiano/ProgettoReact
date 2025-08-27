import RicettaCard from '../components/RicettaCard';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../store/searchSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MainPage = () => {
  const dispatch = useDispatch();
  const { query, results, loading, error } = useSelector(state => state.search);

  const handleSearch = () => {
    dispatch(fetchRecipes());
  };

  const handleCardClick = (id) => {
    console.log('Ricetta cliccata id:', id);
  };

  return (
    <div className={styles.ricetteContainer}>
      <Search
        placeholder="Cerca ricette..."
        onSearch={handleSearch}
      />

      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          marginTop: '8px'
        }}>
        
        {!loading && results?.length === 0 && query && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Nessun risultato trovato.</p>
        )}

        {results.map(r => (
          <RicettaCard
            key={r.id}
            img={r.image}
            titolo={r.title}
            onClick={() => handleCardClick(r.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

//TODOS
//  - result card deve salvare la key per poi utilizzarla quando chiamerò il dettaglio
//  - fetchRecipes in search slice è completamente da rifare
//  - verifica che error message e loading spinner funzionino e vedi se si può fare un file unico jsx e css
//  - togli l'utilizzo (a riga 39) della query 
//  - crea un messaggio personalizzato se la api ritorna null 
