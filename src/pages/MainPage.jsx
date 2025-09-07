import RicettaCard from '../components/RicettaCard';
import Search from '../components/Search';
import TopBar from '../components/TopBar';
import EmptyState from '../components/EmptyState';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cercaRicette } from '../store/ricetteSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Pagina principale per cercare e visualizzare le ricette
 */
const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { risultatiRicerca: results, caricamentoRicerca: loading, erroreRicerca: error, queryRicerca: currentQuery, offsetRicerca: offset, hasMoreResults } = useSelector(state => state.ricette);

  /**
   * Gestisce la ricerca di nuove ricette
   */
  const handleSearch = (searchTerm) => {
    dispatch(cercaRicette({ query: searchTerm }));
  };

  /**
   * Carica più ricette per la ricerca corrente
   */
  const handleLoadMore = () => {
    if (currentQuery && !loading) {
      dispatch(cercaRicette({ query: currentQuery, offset, appendResults: true }));
    }
  };

  /**
   * Gestiisce il click su una card di ricetta navigando alla pagina di dettaglio
   */
  const handleCardClick = (id) => {
    navigate(`/ricetta/${id}`);
  };

  return (
    <>
      <TopBar />
      <div className={styles.ricetteContainer}>
        <Search
          placeholder="Cerca ricette..."
          onSearch={handleSearch}
        />

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}
        <div className={styles.ricetteGrid}>
          
          {!loading && results.length === 0 && !error && (
            <EmptyState 
              title="Non ci sono ricette in tavola al momento"
              subtitle="Prova a cercare ricette vegetariane o vegane!"
            />
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
      
        {results.length > 0 && hasMoreResults && !loading && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            style={{
              margin: '2rem auto',
              padding: '12px 24px',
              backgroundColor: loading ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {loading ? 'Caricamento...' : 'Carica altro'}
          </button>
        )}
    </div>
    </>
  );
};

export default MainPage;