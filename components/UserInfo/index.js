export const UserInfo = ({ avatar, userName, position }) => {
  return (
    <>
      <section>
        <img src={avatar} height="20px" width="20px" />
        <text>{userName}</text>
      </section>
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #dbdbdb;
          border-radius: 10px;
          position: ${position};
          color: black;
          padding: 10px;
          font-weight: 600;
          margin-top: 20px;
          z-index: 100;
        }
        img {
          margin-right: 10px;
          border-radius: 999px;
        }
      `}</style>
    </>
  )
}
