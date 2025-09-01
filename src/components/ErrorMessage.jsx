const ErrorMessage = ({ message }) => {
  if (message) console.error(message);
  return (
    <div style={{
      background: '#ffebee',
      color: '#c62828',
      padding: '12px 16px',
      borderRadius: '8px',
      margin: '16px 0',
      border: '1px solid #ef9a9a'
    }}>
      Errore, risprova più tardi.
    </div>
  );
};

export default ErrorMessage;
