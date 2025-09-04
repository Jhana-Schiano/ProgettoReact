const EmptyState = ({ title = "Non ci sono ricette in tavola al momento", subtitle, icon = "🍽️" }) => {
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
