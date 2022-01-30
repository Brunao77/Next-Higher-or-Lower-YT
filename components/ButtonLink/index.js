import { colors } from '../../styles/theme'
import Link from 'next/link'

export const ButtonLink = ({ children, onClick, href }) => {
  return (
    <>
      <Link href={href}>
        <a onClick={onClick}>{children}</a>
      </Link>
      <style jsx>
        {`
          a {
            width: max(12vw, 250px);
            height: max(3vw, 60px);
            text-align: center;
            align-items: center;
            justify-content: center;
            background: transparent;
            border-radius: 9999px;
            border: 1px solid ${colors.white};
            color: ${colors.primary};
            cursor: pointer;
            display: flex;
            font-size: max(1vw, 30px);
            font-weight: 600;
            padding: 8px 24px;
            transition: 0.2s;
            user-select: none;
            text-decoration: none;
            margin: 5px 10px;
          }
          a:active {
            transform: scale(95%);
          }
          a:hover {
            background: ${colors.white};
            color: ${colors.black};
          }
        `}
      </style>
    </>
  )
}
