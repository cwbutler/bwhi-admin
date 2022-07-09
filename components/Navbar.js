import { Auth } from 'aws-amplify'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const user = useSelector((state) => state.auth.user)

    return (
        <div className="flex flex-row w-screen h-[80px] bg-[#EDE0D4] py-[24px] px-[40px] items-center">
            <h1 className="font-medium">
                Welcome, {getName(user?.attributes)}
            </h1>

            <div className="flex-auto" />

            <button className="bg-black rounded-[20px] p-[8px] w-[117px]" onClick={() => Auth.signOut()}>
                <span className="font-medium text-white text-[16px]">Logout</span>
            </button>
        </div>
    )
}

function getName(user={}) {
    return (!user.given_name && !user.family_name) ? 
        user.email : `${user.given_name || ''} ${user.family_name || ''}`.trim()
}
