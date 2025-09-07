/**
 * Mostra un messaggio quando non ci sono risultati o la pagina è vuota
 * 
 * @param {string} title - Titolo principale del messaggio (opzionale)
 * @param {string} subtitle - Sottotitolo descrittivo (opzionale) 
  * @param {string} icon - Icona da visualizzare (opzionale, default: 🥬)
 */
const EmptyState = ({ 
  title = "Non ci sono ricette in tavola al momento", 
  subtitle, 
  icon = "🥬"
}) => {
  // Rileva se l'utente sta usando il tema scuro del sistema
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const containerStyle = {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 2rem',
    textAlign: 'center',
    margin: '2rem 0',
    ...(isDarkMode ? {
      color: '#e0e0e0',
    } : {
      color: '#495057',
    })
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: 0.6
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    ...(isDarkMode ? {
      color: '#e0e0e0'
    } : {
      color: '#495057'
    })
  };

  const subtitleStyle = {
    fontSize: '1rem',
    margin: '0',
    opacity: 0.8
  };

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>{icon}</div>
      <h3 style={titleStyle}>{title}</h3>
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
    </div>
  );
};

export default EmptyState;
