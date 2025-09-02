import RicettaCard from '../components/RicettaCard';
import Search from '../components/Search';
import TopBar from '../components/TopBar';
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
    </>
  );
};

export default MainPage;

//TODOS
//  - valuta se usare le instruction o le analized instruction
//  - crea un component per indicare che non c'è nessuna ricetta (da sostituire all'attuale messaggio "Non ci sono ricette in tavola al momento")
//  - controlla l'app anche con il tema chiaro 
