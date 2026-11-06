export default function Button({ children, handleClick, className }) {
  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
}
