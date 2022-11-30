import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux'
import { auth } from './firebase';

export default function Navbar() {
    const user = useSelector((state) => state.auth.user)

    return (
        <div className="flex flex-row w-screen h-[80px] bg-[#EDE0D4] py-[24px] px-[40px] items-center">
            <h1 className="font-medium">
                Welcome, {getName(user)}
            </h1>

            <div className="flex-auto" />

            <button className="bg-black rounded-[20px] p-[8px] w-[117px]" onClick={() => signOut(auth)}>
                <span className="font-medium text-white text-[16px]">Logout</span>
            </button>
        </div>
    )
}

function getName(user={}) {
    return (!user.displayName) ? user.email : user.displayName;
}
