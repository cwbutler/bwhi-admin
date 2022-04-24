import { useState } from 'react'
import { Auth } from 'aws-amplify'
import Layout from '../components/Layout'
import Image from 'next/image'
import image from '../public/images/login_image.jpeg'
import { useRouter } from 'next/router'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState();
    const router = useRouter()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const user = await Auth.signIn(email, password);
            const params = new URLSearchParams(location.search);
            const nextURL = params.get('url') || '/'
            router.replace(nextURL)
        } catch (error) {
            setError('Error signing in with credentials provided. Please try again.')
        }
    }

  return (
    <Layout
      title="BWHI Admin | Login"
      description="Login into BWHI admin"
      className="flex flex-row"
    >
        <div className="relative flex flex-1">
        <Image
            priority
            alt="BWHI Sign In"
            src={image}
            layout="fill"
        />
        </div>

        <form className="w-full max-w-[520px] pt-[240px] px-[55px] flex flex-col items-center" onSubmit={onSubmit}>
            <h1 className="text-[32px] font-bold text-[#002E5C]">Sign In</h1>

            <div className="flex flex-col self-stretch">
                <label htmlFor="username" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
                    Email address
                </label>
                <input
                    type="email"
                    name="username"
                    className="mb-[24px] rounded-[8px] invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                    className="mb-[16px] rounded-[8px] border-[#8F92A1] invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={5}
                    required
                />
                <a className="mb-[44px] text-[12px] text-[#002E5C]">Forgot Password?</a>
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
    </Layout>
  )
}
