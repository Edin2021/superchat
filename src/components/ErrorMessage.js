function ErrorMessage({ error }) {
  return (
    <>
      <div className={`alert-danger ${error && "active"}`}>
        <p>{error}</p>
      </div>
    </>
  );
}

export default ErrorMessage;
