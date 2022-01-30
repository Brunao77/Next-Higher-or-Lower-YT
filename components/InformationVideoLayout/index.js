export const InformationVideoLayout = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          position: relative;
        }

        @media (max-width: 850px) {
          background-size: cover;
        }
      `}</style>
    </>
  )
}
