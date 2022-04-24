import store from '../state/store'
import { Provider } from 'react-redux'

export default function ProvideReduxStore({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}