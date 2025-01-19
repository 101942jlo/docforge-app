import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const { handleLogout, currentUser } = useAuth()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSignOut = () => {
        setIsOpen(false)
        handleLogout()
        navigate('/sign-in')
    }

    return (
        <div className="flex justify-center items-center">
            <div onClick={() => setIsOpen((prev) => !prev)} className="bg-blue-200  rounded-full h-10 w-10 flex items-center justify-center cursor-pointer">{currentUser?.initials}</div>
            <h2 className="mx-3">{currentUser?.first_name} {currentUser?.last_name}</h2>
            {isOpen && (
                <div className='bg-white rounded-lg p-2 absolute flex flex-col top-[72px]  border drop-shadow-xl'>
                    <div className='p-1 flex flex-col gap-2 text-sm'>
                        <h3 onClick={() => setIsOpen(false)} className='transition duration-150 p-2 cursor-pointer rounded-md hover:bg-slate-200'>Change Password</h3>
                        <h3 onClick={onSignOut} className='transition duration-150 p-2 rounded-sm hover:bg-slate-200 cursor-pointer'>Sign Out</h3>
                    </div>
                </div>
            )}
        </div>
    )
}