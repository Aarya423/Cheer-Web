import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <div className='flex flex-row gap-x-2 w-full z-20 left-0 h-12 place-content-center items-center rounded-md'>
            {
                userLoggedIn
                    ?
                    <>
                        <button2 onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-black underline px-2 py-1 border border-purple-600 rounded-md hover:bg-purple-300'>Logout</button2>
                    </>
                    :
                    <>
                        <Link className='text-sm text-black underline px-2 py-1 border border-purple-600 rounded-md hover:bg-purple-300' to={'/login'}>Login</Link>
                        <Link className='text-sm text-black underline px-2 py-1 border border-purple-600 rounded-md hover:bg-purple-300' to={'/register'}>Register New Account</Link>
                    </>
            }

        </div>
    )
}

export default Header
