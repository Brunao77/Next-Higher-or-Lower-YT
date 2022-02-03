export const ColumnTable = ({ children, margin }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: ${margin}px;
          }
        `}
      </style>
    </>
  )
}
