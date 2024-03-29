import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import AuthLayout from '../../components/AuthLayout'
import { setUser } from '../../state/reducers/auth'
import Link from 'next/link'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const router = useRouter()
    const dispatch = useDispatch()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    dispatch(setUser(user));
                    router.push(router.query.url || '/')
                })
                .catch((error) => {
                    console.log("Error loggin in: ", error);
                    const errorMessage = error.message;
                    setError(errorMessage);
                });
        } catch (error) {
            console.log(error)
            setError('Error signing in with credentials provided. Please try again.')
        }
    }

  return (
    <AuthLayout
      title="BWHI Admin | Login"
      description="Login into BWHI admin"
      className="flex flex-row"
    >
        <form className="w-full max-w-[520px] pt-[240px] px-[55px] flex flex-col items-center" onSubmit={onSubmit}>
            <h1 className="text-[32px] font-bold text-[#002E5C]">Sign In</h1>

            <div className="flex flex-col self-stretch">
                <label htmlFor="username" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
                    Email address
                </label>
                <input
                    type="email"
                    name="username"
                    className={classnames("mb-[24px] rounded-[8px]", {
                        "invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500": email?.length > 4 
                    })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col self-stretch">
                <label htmlFor="password" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
                    Password
                </label>
                <input 
                    type="password" 
                    name="password"
                    className={classnames("mb-[16px] rounded-[8px] border-[#8F92A1]", {
                        "invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500": password.length > 2
                    })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={5}
                    required
                />
                <Link href="/auth/forgotpassword">
                    <a className="mb-[44px] text-[12px] text-[#002E5C]">Forgot Password?</a>
                </Link>
            </div>

            <button
                className="self-stretch p-[12px] bg-[#002E5C] disabled:bg-slate-200 rounded-[8px]"
                disabled={email.length < 6 || password.length < 5}
                type="submit"
            >
                <span className="text-white text-[16px] font-dmSans font-medium">Sign In</span>
            </button>

            {error && (
                <div className="bg-red-500 mt-12 p-3 w-full rounded">
                    <span className="text-white">{error}</span>
                </div>
            )}
        </form>
    </AuthLayout>
  )
}
