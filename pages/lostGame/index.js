import { AppLayout } from '../../components/AppLayout'
import { ButtonLink } from '../../components/ButtonLink'
import { Logo } from '../../components/Logo'
import { colors } from '../../styles/theme'

export default function LostGame() {
  return (
    <>
      <AppLayout>
        <Logo />
        <text>You scored:</text>
        <strong>11</strong>
        <div>
          <ButtonLink href="/playGame">PLAY AGAIN</ButtonLink>
          <ButtonLink href="/">RETURN</ButtonLink>
        </div>
      </AppLayout>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: row;
          }
          text {
            font-size: max(2vw, 30px);
            font-weight: 600;
            margin-top: -20;
            padding: 0;
          }
          strong {
            margin-bottom: 20px;
            color: ${colors.primary};
            font-size: max(4vw, 60px);
          }
          @media (max-width: 850px) {
            div {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  )
}
