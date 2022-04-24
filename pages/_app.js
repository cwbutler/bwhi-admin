import { useEffect, useState } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import ProvideReduxStore from '../components/ProvideReduxStore'
import { setUser } from '../state/reducers/auth'
import '../amplify'
import '../styles/globals.css'

function BWHIApp({ Component, pageProps }) {
  return (
    <ProvideReduxStore>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <App Component={Component} {...pageProps} />
    </ProvideReduxStore>
  )
}

function App({ Component, ...pageProps }) {
  const [_, setAppLoading] = useState(true);
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => dispatch(setUser(getUserFromCognito(user))))
      .catch(err => router.push('/signin?url=\/'))
      .finally(() => setAppLoading(false))
    
    Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signIn') {
        dispatch(setUser(getUserFromCognito(payload.data)))
      }

      if (payload.event === 'signOut') {
        dispatch(setUser())
        router.push('/signin')
      }
    })
  }, []);

  return <Component { ...pageProps} />
}

function getUserFromCognito(cognitoUser) {
  return {
    ...cognitoUser.attributes,
    ...cognitoUser.signInUserSession
  }
}

export default BWHIApp
