import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/Button'
import { colors } from '../../styles/theme'
import { VideoLayout } from '../../components/VideoLayout'
import { getRandomItems, selectRandomVideo } from '../../helpers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const get2RandomItems = getRandomItems(2)

export default function PlayGame({ videos }) {
  const [videosPlayed, setVideosPlayed] = useState(null)
  const [lost, setLost] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setVideosPlayed(get2RandomItems(videos))
  }, [])

  const handleClick = (higher) => {
    const viewsGuessOption = guessOption.statistics.viewCount
    const viewsThanOption = thanOption.statistics.viewCount
    higher
      ? viewsGuessOption >= viewsThanOption
        ? setVideosPlayed(selectRandomVideo(videos, videosPlayed))
        : router.push('/lostGame')
      : viewsGuessOption <= viewsThanOption
      ? setVideosPlayed(selectRandomVideo(videos, videosPlayed))
      : router.push('/lostGame')
  }

  if (!videosPlayed) return null
  const [guessOption, thanOption] = videosPlayed

  return (
    <>
      <AppLayout>
        <section>
          <VideoLayout img={guessOption.snippet.thumbnails.high.url}>
            <div>
              <strong>{guessOption.snippet.title}</strong>
              <Button onClick={() => handleClick(true)}>Higher</Button>
              <Button onClick={() => handleClick(false)}>Lower</Button>
              <text>viewers than RTVE</text>
            </div>
          </VideoLayout>
          <VideoLayout img={thanOption.snippet.thumbnails.high.url}>
            <div>
              <strong>{thanOption.snippet.title}</strong>
              <text>has</text>
              <strong className="views">
                {new Intl.NumberFormat('en-US').format(
                  thanOption.statistics.viewCount
                )}
              </strong>
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

export async function getStaticProps() {
  let videos = []
  let nextPageToken = ''
  let pages = 5
  do {
    const url = !nextPageToken
      ? `https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&chart=mostPopular&key=${process.env.API_KEY_YOUTUBE}&maxResults=200&regionCode=es`
      : `https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&chart=mostPopular&key=${process.env.API_KEY_YOUTUBE}&maxResults=200&regionCode=es&pageToken=${nextPageToken}`
    const res = await fetch(url)
    const snapshotVideos = await res.json()
    nextPageToken = snapshotVideos.nextPageToken
    videos = [...videos, ...snapshotVideos.items]
    pages--
  } while (pages > 0 && nextPageToken)
  return {
    props: { videos }
  }
}
