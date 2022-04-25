import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Auth, Hub } from 'aws-amplify'
import { setUser } from '../state/reducers/auth'

export default function App({ Component, ...pageProps }) {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch()
  
    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then((user) => dispatch(setUser(user)))
            .catch((err) => {
                console.log(err)
                router.push('/auth/signin?url=\/')
            })
            .finally(() => setIsAppLoading(false))
      
        Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
                case 'signOut':
                    dispatch(setUser(undefined))
                    router.push('/auth/signin?url=\/')
                    break;
            }
        })
    }, [])
  
    return <Component { ...pageProps} />
}
