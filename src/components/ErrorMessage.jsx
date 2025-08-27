const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div style={{
      background: '#ffebee',
      color: '#c62828',
      padding: '12px 16px',
      borderRadius: '8px',
      margin: '16px 0',
      border: '1px solid #ef9a9a'
    }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
