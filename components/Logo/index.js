export const Logo = () => {
  return (
    <>
      <img src="/logoWhite.png" />
      <style jsx>{`
        img {
          user-select: none;
          width: max(30vw, 300px);
          height: max(20vw, 200px);
          margin-top: max(1vw, 40px);
        }
      `}</style>
    </>
  )
}
