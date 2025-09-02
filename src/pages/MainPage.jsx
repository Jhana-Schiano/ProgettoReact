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
            <EmptyState 
              title="Non ci sono ricette in tavola al momento"
              subtitle="Prova a cercare ricette vegetariane o vegane!"
              icon="🥗"
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
    </div>
    </>
  );
};

export default MainPage;

//TODOS
//  - valuta se usare le instruction o le analized instruction
//  - controlla l'app anche con il tema chiaro 
