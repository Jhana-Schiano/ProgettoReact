const LoadingSpinner = () => {

  if (!document.querySelector('#spinner-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spinner-keyframes';
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        style={{
          width: '42px',
          height: '42px',
          border: window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? '5px solid rgba(255,255,255,0.1)' 
            : '5px solid rgba(0,0,0,0.1)',
          borderTopColor: window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? '#66BB6A' 
            : '#4CAF50',
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite'
        }}
        aria-label="Caricamento"
      />
    </div>
  );
};

export default LoadingSpinner;
