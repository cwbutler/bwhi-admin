import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import AuthLayout from '../../components/AuthLayout'
import { setUser } from '../../state/reducers/auth'

export default function ChangePassword() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const user = useSelector((state) => state.auth.user)
    const router = useRouter()
    const dispatch = useDispatch()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await Auth.completeNewPassword(user, password)
            dispatch(setUser(await Auth.currentAuthenticatedUser({ bypassCache: true })))
            router.replace('/')
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
            <h1 className="text-[32px] font-bold text-[#002E5C]">Change Password</h1>

            <div className="flex flex-col self-stretch">
                <label htmlFor="username" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
                    New Password
                </label>
                <input
                    type="password"
                    name="password"
                    className="mb-[24px] rounded-[8px] invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={5}
                    required
                />
            </div>

            <button
                className="self-stretch p-[12px] bg-[#002E5C] disabled:bg-slate-200 rounded-[8px]"
                disabled={password.length < 5}
                type="submit"
            >
                <span className="text-white text-[16px] font-dmSans font-medium">Change Password</span>
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
