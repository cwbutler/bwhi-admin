import Amplify, { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import config from '../awsconfiguration.json'
import Head from 'next/head'
import '../styles/globals.css'
import { useEffect, useState } from 'react'

Amplify.configure(config)

function MyApp({ Component, pageProps }) {
  const [_, setAppLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => console.log({ user }))
      .catch(err => router.push('/signin?url=\/'))
      .finally(() => setAppLoading(false)) 
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
