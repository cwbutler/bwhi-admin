import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { setUser } from '../state/reducers/auth'
import Landing from './Landing'

export default function App({ Component, ...pageProps }) {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch()
  
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setUser(undefined))
                router.push('/auth/signin?url=\/')
            }
        });
        setIsAppLoading(false);
    }, [])
  
    return (isAppLoading) ? <Landing /> : <Component { ...pageProps} />
}
