import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/Button'
import { colors } from '../../styles/theme'
import { VideoLayout } from '../../components/VideoLayout'
import { getRandomItems, selectRandomVideo } from '../../helpers'
import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'next/router'
import { UserInfo } from '../../components/UserInfo'
import { controlDataBase, getUserData } from '../../firebase/client'
import Head from 'next/head'
import { BsCheckLg } from 'react-icons/bs'

const get2RandomItems = getRandomItems(2)

export default function PlayGame({ videos }) {
  const [videosPlayed, setVideosPlayed] = useState(null)
  const [score, setScore] = useState(0)
  const [animationCenter, setAnimationCenter] = useState('vs')
  const user = useUser()
  const router = useRouter()
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    setVideosPlayed(get2RandomItems(videos))
  }, [])

  useEffect(() => {
    user &&
      getUserData(user.uid).then((user) => user && setHighScore(user.highScore))
  }, [user])

  const executeIfWin = () => {
    setAnimationCenter('win')
    setTimeout(() => {
      setAnimationCenter('vs')
      setScore(score + 1)
      setVideosPlayed(selectRandomVideo(videos, videosPlayed))
    }, 3000)
  }

  const executeIfLost = () => {
    setAnimationCenter('lost')
    localStorage.setItem('score', JSON.stringify(score))
    setTimeout(() => {
      user
        ? controlDataBase(user, score).then(router.replace('/lostGame'))
        : router.replace('/lostGame')
    }, 3000)
  }

  const handleClick = (higher) => {
    const viewsGuessOption = parseInt(guessOption.views)
    const viewsThanOption = parseInt(thanOption.views)
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

  return (
    <>
      <Head>
        <title>Higher or Lower YT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logoWhite.ico" />
      </Head>
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
            {animationCenter === 'vs' ? (
              <div className="animation-center">
                <h3>VS</h3>
              </div>
            ) : animationCenter === 'win' ? (
              <div className="animation-center center-win">
                <BsCheckLg />
              </div>
            ) : (
              <div className="animation-center center-lost">
                <h3>X</h3>
              </div>
            )}
          </div>
          <VideoLayout img={thanOption.img}>
            <div>
              <strong>{thanOption.title}</strong>
              <text>has</text>
              <strong className="views">
                {new Intl.NumberFormat('en-US').format(thanOption.views)}
              </strong>
              <text>views</text>
            </div>
          </VideoLayout>
          <VideoLayout img={guessOption.img}>
            <div>
              <strong>{guessOption.title}</strong>
              {animationCenter === 'vs' ? (
                <>
                  <Button onClick={() => handleClick(true)}>Higher</Button>
                  <Button onClick={() => handleClick(false)}>Lower</Button>
                </>
              ) : (
                <strong className="views-guess">
                  {new Intl.NumberFormat('en-US').format(guessOption.views)}
                </strong>
              )}
              <text>views than {thanOption.channel}</text>
            </div>
          </VideoLayout>
        </section>
        <footer>
          <text className="score-text">High Score: {highScore}</text>
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
          width: 60px;
          height: 60px;
          user-select: none;
        }
        .center-lost {
          animation: mymoveLost 3s;
          color: #fff;
        }
        @keyframes mymoveLost {
          from {
            background-color: white;
          }
          to {
            background-color: #ff5252;
          }
        }
        .center-win {
          animation: mymoveWin 3s;
          color: #fff;
        }
        @keyframes mymoveWin {
          from {
            background-color: white;
          }
          to {
            background-color: #84ff52;
          }
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
          width: max(40vw, 280px);
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
        .views-guess {
          color: ${colors.primary};
          font-size: max(3vw, 25px);
          animation: fadeIn 2s;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @media (max-width: 850px) {
          section {
            flex-direction: column;
          }
          footer {
            padding: 15px;
            position: absolute;
            top: 0%;
            justify-content: space-between;
            flex-direction: row;
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
  videos = videos.map((video) => {
    return {
      img: video.snippet.thumbnails.high.url,
      title: video.snippet.title,
      views: video.statistics.viewCount,
      channel: video.snippet.channelTitle
    }
  })
  return {
    props: { videos }
  }
}
