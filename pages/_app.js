import Head from 'next/head'
import ProvideReduxStore from '../components/ProvideReduxStore'
import App from '../components/App'
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

export default BWHIApp
