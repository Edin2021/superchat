function ErrorMessage({ error }) {
  return (
    <>
      <div className={`alert-danger ${error && "active"}`}>
        <p>{error ? error : null}</p>
      </div>
    </>
  );
}

export default ErrorMessage;
