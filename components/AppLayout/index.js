import { fonts } from '../../styles/theme'

export const AppLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <style jsx global>{`
        main {
          display: flex;
          align-items: center;
          height: 100vh;
          flex-direction: column;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${fonts.base};
          background-color: black;
          color: white;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}
