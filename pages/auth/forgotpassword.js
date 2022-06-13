import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import AuthLayout from '../../components/AuthLayout'

export default function ChangePassword() {
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const router = useRouter()

    async function onSubmit(e) {
        e.preventDefault();
        if (isEmailSubmitted) {

        } else {
            const result = await Auth.forgotPassword(email)
            console.log(result)
            setIsEmailSubmitted(true)
        }
    }

  return (
    <AuthLayout
      title="Forgot Password | BWHI Admin"
      description="Forgot password for BWHI admin"
      className="flex flex-row"
    >
        <form className="w-full max-w-[520px] pt-[240px] px-[55px] flex flex-col items-center">
            <h1 className="text-[32px] font-bold text-[#002E5C]">Forgot Password</h1>

            <div className="flex flex-col self-stretch">
                <label htmlFor="username" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    className="mb-[24px] rounded-[8px] invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    minLength={5}
                    required
                />
            </div>

            {isEmailSubmitted && (
                <div className="flex flex-col self-stretch">
                    <label htmlFor="username" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
                        Password
                    </label>
                    <input
                        type="text"
                        name="code"
                        className="mb-[24px] rounded-[8px] invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        minLength={5}
                        required
                    />
                </div>
            )}

            <button
                className="self-stretch p-[12px] bg-[#002E5C] disabled:bg-slate-200 rounded-[8px]"
                type="submit"
                onClick={onSubmit}
            >
                <span className="text-white text-[16px] font-dmSans font-medium">
                    {(isEmailSubmitted) ? 'Verify Code' : 'Send Code'}
                </span>
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
