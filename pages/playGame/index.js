import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/Button'
import { colors } from '../../styles/theme'
import { VideoLayout } from '../../components/VideoLayout'
import { getRandomItems, selectRandomVideo } from '../../helpers'
import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'next/router'
import { UserInfo } from '../../components/UserInfo'
import {
  getUserData,
  updateHighScore,
  setHighScore
} from '../../firebase/client'

const get2RandomItems = getRandomItems(2)

export default function PlayGame({ videos }) {
  const [videosPlayed, setVideosPlayed] = useState(null)
  const [score, setScore] = useState(0)
  const [userData, setUserData] = useState(null)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    setVideosPlayed(get2RandomItems(videos))
  }, [])

  useEffect(() => {
    user && getUserData(user.uid).then(setUserData)
  }, [user])

  const executeIfWin = () => {
    setScore(score + 1)
    setVideosPlayed(selectRandomVideo(videos, videosPlayed))
  }

  const executeIfLost = () => {
    user
      ? userData
        ? score > userData.highScore
          ? updateHighScore(user.uid, score).then(() => {
              router.replace('/lostGame')
            })
          : router.replace('/lostGame')
        : setHighScore({
            avatar: user.avatar,
            userName: user.userName,
            highScore: score,
            uid: user.uid
          }).then(() => {
            router.replace('/lostGame')
          })
      : router.replace('/lostGame')
  }

  const handleClick = (higher) => {
    const viewsGuessOption = parseInt(guessOption.statistics.viewCount)
    const viewsThanOption = parseInt(thanOption.statistics.viewCount)
    higher
      ? viewsGuessOption >= viewsThanOption
        ? executeIfWin()
        : executeIfLost()
      : viewsGuessOption <= viewsThanOption
      ? executeIfWin()
      : executeIfLost()
  }

  if (!videosPlayed) return null
  const [guessOption, thanOption] = videosPlayed

  if (!userData) return null

  return (
    <>
      <AppLayout>
        {user && (
          <UserInfo
            avatar={user.avatar}
            userName={user.userName}
            position="absolute"
          />
        )}
        <section>
          <div className="content-animation">
            <div className="animation-center">
              <h3>VS</h3>
            </div>
          </div>
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
          <text className="score-text">High Score: {userData.highScore}</text>
          <text className="score-text">Score: {score}</text>
        </footer>
      </AppLayout>

      <style jsx>{`
        .content-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .animation-center {
          background-color: white;
          color: black;
          border-radius: 100%;
          position: absolute;
          width: 50px;
          height: 50px;
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
          font-size: max(1.5vw, 15px);
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
        }

        .score-text {
          font-weight: 700;
          font-size: max(1.3vw, 15px);
          line-height: 31px;
        }

        text {
          font-size: max(1vw, 10px);
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
