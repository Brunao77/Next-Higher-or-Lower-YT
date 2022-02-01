import { colors } from '../../styles/theme'

export const Button = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>
        {`
          button {
            width: max(10vw, 120px);
            height: max(3vw, 40px);
            align-items: center;
            justify-content: center;
            background: transparent;
            border-radius: 9999px;
            border: 1px solid ${colors.white};
            color: ${colors.primary};
            cursor: pointer;
            display: flex;
            font-size: max(1.5vw, 20px);
            font-weight: 600;
            padding: 8px 24px;
            transition: 0.2s;
            user-select: none;
            margin: 3px 0;
          }
          button:active {
            transform: scale(95%);
          }
          button:hover {
            background: ${colors.white};
            color: ${colors.black};
          }
        `}
      </style>
    </>
  )
}
