import { colors } from '../../styles/theme'

export const Button = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>
        {`
          button {
            align-items: center;
            background: transparent;
            border-radius: 9999px;
            border: 1px solid ${colors.white};
            color: ${colors.primary};
            cursor: pointer;
            display: flex;
            font-size: 16px;
            font-weight: 800;
            padding: 8px 24px;
            transition: 0.2s;
            user-select: none;
          }
          button:active {
            transform: scale(95%);
          }
          button > :global(svg) {
            margin-right: 8px;
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
