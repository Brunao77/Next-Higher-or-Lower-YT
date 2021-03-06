export const Leaderboard = ({ leaderboard }) => {
  return (
    <>
      <div>
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((person, index) => (
              <tr key={person.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={person.avatar} width="20px" height="20px" />
                  <strong>{person.userName}</strong>
                </td>
                <td>{person.highScore}</td>
                <td>{person.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-spacing: 0 0;
          background: #213b4c;
          color: white;
          box-shadow: 0 0 20px #1e3344;
          border-radius: 20px;
          overflow: hidden;
        }
        th {
          background: #0c1e28;
          border: none;
          margin: 0;
          padding: 0;
          text-align: center;
          padding: 20px 0px 20px 0px;
          width: 100px;
        }
        th:first-of-type {
          padding: 0 30px;
          text-align: center;
        }
        th:last-of-type {
          padding: 0 30px;
        }
        th:nth-child(2) {
          width: max(12vw, 100px);
        }
        td {
          text-align: center;
          padding: 10px 0px;
        }
        td:nth-child(1) {
          padding: 10px 30px 10px 30px;
        }
        td:nth-child(2) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        img {
          margin-right: 5px;
          border-radius: 999px;
        }
      `}</style>
    </>
  )
}
