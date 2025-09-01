
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetail } from '../store/searchSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from './DettaglioPage.module.css';

const DettaglioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedRecipe, detailLoading, detailError } = useSelector(state => state.search);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetail(id));
    }
  }, [id, dispatch]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (detailLoading) return <LoadingSpinner />;
  if (detailError) return <ErrorMessage message={detailError} />;
  if (!selectedRecipe) return <div>Ricetta non trovata</div>;

  return (
    <div className={styles.container}>
      <button onClick={handleBackClick} className={styles.backButton}>
        ← Torna indietro
      </button>
      
      <div className={styles.headerRicetta}>
        <img 
          src={selectedRecipe.image} 
          alt={selectedRecipe.title}
          className={styles.imgRicetta}
        />
        <div className={styles.infoContainer}>
          <h1 className={styles.titolo}>{selectedRecipe.title}</h1>
          <div className={styles.tags}>
            {selectedRecipe.vegetarian && <span className={styles.tag}>🌱 Vegetariano</span>}
            {selectedRecipe.vegan && <span className={styles.tag}>🥬 Vegano</span>}
            {selectedRecipe.glutenFree && <span className={styles.tag}>🌾 Gluten Free</span>}
          </div>
          <div className={styles.info}>
            <span>⏱️ {selectedRecipe.readyInMinutes} min</span>
            <span>👥 {selectedRecipe.servings} porzioni</span>
            {selectedRecipe.pricePerServing && (
              <span>💰 ${(selectedRecipe.pricePerServing / 100).toFixed(2)} per porzione</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {selectedRecipe.summary && (
          <section >
            <h2>Descrizione</h2>
            <div 
              className={styles.descrizione}
              dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }} 
            />
          </section>
        )}

        {selectedRecipe.extendedIngredients && selectedRecipe.extendedIngredients.length > 0 && (
          <section>
            <h2>Ingredienti</h2>
            <ul className={styles.listaIngredienti}>
              {selectedRecipe.extendedIngredients.map(ingrediente => (
                <li key={ingrediente.id} className={styles.ingrediente}>
                  {ingrediente.original}
                </li>
              ))}
            </ul>
          </section>
        )}

        {selectedRecipe.instructions && (
          <section>
            <h2>Preparazione</h2>
            <div 
              className={styles.descrizione}
              dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} 
            />
          </section>
        )}

        {selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions.length > 0 && (
          <section>
            <h2>Passaggi</h2>
            <ol className={styles.passaggi}>
              {selectedRecipe.analyzedInstructions[0]?.steps?.map((step, index) => (
                <li key={index} className={styles.step}>
                  {step.step}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
};

export default DettaglioPage;
