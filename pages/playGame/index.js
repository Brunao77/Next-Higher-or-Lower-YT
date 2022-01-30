import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/Button'

const url1 = 'https://i.ytimg.com/vi/UZspUjzm2ik/hqdefault.jpg'
const url2 = 'https://i.ytimg.com/vi/d1GRKO2fIrs/hqdefault.jpg'

export default function PlayGame() {
  return (
    <>
      <AppLayout>
        <section>
          <div className="first-option">
            <div className="video-information">
              <strong>hola</strong>
              <Button>Higher</Button>
              <Button>Lower</Button>
              <text>viewers than RTVE</text>
            </div>
          </div>
          <div className="second-option">
            <div className="video-information">
              <strong>Resumen del partido final</strong>
              <text>has</text>
              <strong>1.2000.4</strong>
              <text>views</text>
            </div>
          </div>
        </section>
        <footer>
          <text>High Score: 15</text>
          <text>Score: 0</text>
        </footer>
      </AppLayout>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        section {
          display: flex;
          flex-direction: row;
          width: 100%;
          color: white;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }

        section::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.671);
        }

        .first-option {
          background-image: url(${url1});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        .second-option {
          background-image: url(${url2});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        .video-information {
          position: relative;
        }

        footer {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: white;
          height: 40px;
          width: 100%;
          padding: 0px 40px;
          font-weight: 700;
          font-size: 24px;
          line-height: 31px;
        }

        @media (max-width: 850px) {
          section {
            flex-direction: column;
          }

          .first-option {
            background-size: cover;
          }
          .second-option {
            background-size: cover;
          }
          footer {
            position: absolute;
            top: 45%;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}
