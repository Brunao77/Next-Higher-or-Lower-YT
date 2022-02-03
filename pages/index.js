import Head from 'next/head'
import { useUser } from '../hooks/useUser'
import { AppLayout } from '../components/AppLayout'
import { ButtonLink } from '../components/ButtonLink'
import { Logo } from '../components/Logo'
import { loginWithGitHub, getHighScores } from '../firebase/client'
import { GitHub } from '../components/Icons/GitHub'
import { ButtonLogin } from '../components/ButtonLogin'
import { UserInfo } from '../components/UserInfo'
import { useState, useEffect } from 'react'
import { ColumnTable } from '../components/ColumnTable'

export default function Home() {
  const user = useUser()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    getHighScores().then(setLeaderboard)
  }, [])

  const handleClick = () => {
    loginWithGitHub().catch((error) => console.log(error))
  }

  return (
    <>
      <Head>
        <title>Higher or Lower YT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Logo />
        <ButtonLink href="/playGame">PLAY</ButtonLink>
        {user === null ? (
          <ButtonLogin onClick={() => handleClick()} bg="#3d3d3d" color="#ffff">
            <GitHub fill="#fff" width={24} height={24} />
            Sign in with GitHub
          </ButtonLogin>
        ) : user === undefined ? null : (
          <UserInfo
            avatar={user.avatar}
            userName={user.userName}
            position="relative"
          />
        )}
      </AppLayout>
      <AppLayout>
        <h1>Leaderboard</h1>
        <section>
          <ColumnTable margin="100">
            <h1>Username</h1>
            {leaderboard.map((person) => (
              <div key={person.id}>
                <img src={person.avatar} width="20px" height="20px" />
                <strong>{person.userName}</strong>
              </div>
            ))}
          </ColumnTable>
          <ColumnTable margin="100">
            <h1>Score</h1>
            {leaderboard.map((person) => (
              <strong key={person.id}>{person.highScore}</strong>
            ))}
          </ColumnTable>
          <ColumnTable margin="00">
            <h1>Date</h1>
            {leaderboard.map((person) => (
              <strong key={person.id}>{person.createdAt}</strong>
            ))}
          </ColumnTable>
        </section>
      </AppLayout>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: row;
          }
          section {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
