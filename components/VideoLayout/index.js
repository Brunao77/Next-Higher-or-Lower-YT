export const VideoLayout = ({ children, img }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          background-image: url(${img});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        @media (max-width: 850px) {
          background-size: cover;
        }
      `}</style>
    </>
  )
}
