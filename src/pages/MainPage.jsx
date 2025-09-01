import RicettaCard from '../components/RicettaCard';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cercaRicette } from '../store/ricetteSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { risultatiRicerca: results, caricamentoRicerca: loading, erroreRicerca: error } = useSelector(state => state.ricette);

  const handleSearch = (searchTerm) => {
    dispatch(cercaRicette({ query: searchTerm }));
  };

  const handleCardClick = (id) => {
    navigate(`/ricetta/${id}`);
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
        
        {!loading && results.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Non ci sono ricette in tavola al momento</p>
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
//  - crea la pagina di dettaglio 
//  - converti il prezzo da cent e dollari direttamente nella api e non nella pagina dettaglio
//  - valuta se usare le instruction o le analized instruction   
//  - implementa chiamata api per il dettaglio 
//  - crea e aggiungi la top bar 
//  - verifica che error message e loading spinner funzionino e vedi se si può fare un file unico jsx e css
//  - crea un component per indicare che non c'è nessuna ricetta (da sostituire all'attuale messaggio "Non ci sono ricette in tavola al momento")
