export const ColumnTable = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}
