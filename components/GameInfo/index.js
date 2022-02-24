export const GameInfo = ({ children, handleClose }) => {
  return (
    <>
      <div>
        <header>
          <h1>Info</h1>
          <span onClick={handleClose}>X</span>
        </header>
        <section>{children}</section>
      </div>
      <style jsx>{`
        div {
          background: rgb(73, 73, 73, 0.97);
          z-index: 110;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: max(30vw, 300px);
          height: max(30vh, 200px);
          border-radius: 10px;
        }
        h1 {
          margin: 0;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          padding: 0 20px;
          height: max(20%, 40px);
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff7777;
          border-radius: 999px;
          width: 30px;
          height: 30px;
          cursor: pointer;
          user-select: none;
        }
        section {
          display: flex;
          justify-content: center;
          align-items: center;
          height: max(80%, 150px);
        }
      `}</style>
    </>
  )
}
