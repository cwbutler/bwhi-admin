import ProvideReduxStore from '../components/ProvideReduxStore'
import App from '../components/App'
import '../amplify'
import '../styles/globals.css'

function BWHIApp({ Component, pageProps }) {
  return (
    <ProvideReduxStore>
      <App Component={Component} {...pageProps} />
    </ProvideReduxStore>
  )
}

export default BWHIApp
