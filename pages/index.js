import { useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import image from '../public/images/login_image.jpeg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e) {
    //e.preventDefault();
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
          <label htmlFor="email" className="font-dmSans text-[13px] mb-[16px] text-[#8F92A1]">
            Email address
          </label>
          <input
            type="email"
            className="mb-[24px] rounded-[8px]"
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
            className="mb-[16px] rounded-[8px] border-[#8F92A1]" 
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
      </form>
    </Layout>
  )
}
