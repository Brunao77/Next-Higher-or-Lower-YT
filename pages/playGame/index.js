import { AppLayout } from '../../components/AppLayout'

const url1 = 'https://i.ytimg.com/vi/UZspUjzm2ik/hqdefault.jpg'
const url2 = 'https://i.ytimg.com/vi/d1GRKO2fIrs/hqdefault.jpg'

export default function PlayGame() {
  return (
    <>
      <AppLayout>
        <section>
          <div className="firstOption">
            <text>hola</text>
          </div>
          <div className="secondOption">
            <text>chau</text>
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
        }

        .firstOption {
          background-image: url(${url1});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        .secondOption {
          background-image: url(${url2});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: white;
          height: 3vw;
          width: 100%;
          padding: 0px 40px;
          font-weight: 700;
          font-size: 24px;
          line-height: 31px;
        }
      `}</style>
    </>
  )
}
