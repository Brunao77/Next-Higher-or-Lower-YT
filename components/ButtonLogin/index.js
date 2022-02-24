export const ButtonLogin = ({ children, onClick, bg, color }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          width: 200px;
          justify-content: center;
          align-items: center;
          background: ${bg};
          border-radius: 5px;
          border: 0;
          color: ${color};
          cursor: pointer;
          display: flex;
          font-size: 15px;
          font-weight: 100;
          padding: 10px 10px;
          transition: opacity 0.3s ease;
          margin: 5px;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
        button:active {
          transform: scale(95%);
        }
        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
