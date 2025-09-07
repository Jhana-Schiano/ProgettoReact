/**
 * Mostra un messaggio di errore stilizzato
 * 
 * @param {string} message - Messaggio di errore da loggare nella console (opzionale)
 */
const ErrorMessage = ({ message }) => {
  if (message) console.error(message);
  
  // Rileva se il tema scuro è attivo
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const errorStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    margin: '16px 0',
    fontWeight: '500',
    textAlign: 'center',
    ...(isDarkMode ? {
      // Tema scuro
      background: '#4a1e1e',
      color: '#ffebee',
      border: '1px solid #8d4949',
    } : {
      // Tema chiaro
      background: '#ffebee',
      color: '#c62828',
      border: '1px solid #ef9a9a',
    })
  };

  return (
    <div style={errorStyle}>
      Errore, riprova più tardi.
    </div>
  );
};

export default ErrorMessage;
