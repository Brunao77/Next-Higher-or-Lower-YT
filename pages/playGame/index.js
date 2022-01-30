import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/Button'
import { colors } from '../../styles/theme'
import { VideoLayout } from '../../components/VideoLayout'

const url1 = 'https://i.ytimg.com/vi/UZspUjzm2ik/hqdefault.jpg'
const url2 = 'https://i.ytimg.com/vi/d1GRKO2fIrs/hqdefault.jpg'

// {new Intl.NumberFormat("en-US").format(lastVideo.statistics.viewCount)}

export default function PlayGame() {
  return (
    <>
      <AppLayout>
        <section>
          <VideoLayout img={url1}>
            <div>
              <strong>L-gante con khea cantando</strong>
              <Button>Higher</Button>
              <Button>Lower</Button>
              <text>viewers than RTVE</text>
            </div>
          </VideoLayout>
          <VideoLayout img={url2}>
            <div>
              <strong>Resumen del partido final</strong>
              <text>has</text>
              <strong className="views">1.2000.4</strong>
              <text>views</text>
            </div>
          </VideoLayout>
        </section>
        <footer>
          <text>High Score: 15</text>
          <text>Score: 0</text>
        </footer>
      </AppLayout>

      <style jsx>{`
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

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: relative;
          text-align: center;
        }

        .views {
          color: ${colors.primary};
          font-size: max(3vw, 25px);
        }

        strong {
          font-size: max(2vw, 18px);
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
          padding: 0 40px 40px 40px;
          font-weight: 700;
          font-size: max(1.3vw, 20px);
          line-height: 31px;
        }

        @media (max-width: 850px) {
          section {
            flex-direction: column;
          }

          footer {
            padding: 0;
            position: absolute;
            top: 48%;
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </>
  )
}
