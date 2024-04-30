import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'

const NewsletterToggle = ({ isChecked, onChange }) => {
    const [toggle, setToggle] = useState(false);

    const toggler = () => {
        setToggle(!toggle);
        onChange(!isChecked);
    };

    return (
        <label className="flex items-center cursor-pointer relative">
            <input type="checkbox" className="hidden" checked={isChecked} onChange={onChange} />
            <div className={`toggle__dot absolute -left-1 top-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isChecked ? 'translate-x-full bg-indigo-700' : ''}`}></div>
            <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
            <div className="ml-3 text-gray-700 font-medium">Subscribe to Newsletter</div>
        </label>
    );
};


const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

    const { userLoggedIn } = useAuth()

    // Function to handle newsletter toggle change
    const handleToggleChange = () => {
        setNewsletterSubscribed(!newsletterSubscribed);
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            if (password.length < 8) {
                setErrorMessage("Password must be at least 8 characters long.");
                setIsRegistering(false); // Reset isRegistering
                return;
            }
            if (password !== confirmPassword) {
                setErrorMessage("Password and confirm password do not match.");
                setIsRegistering(false); // Reset isRegistering
                return;
            }
            try {
                await doCreateUserWithEmailAndPassword(email, password, newsletterSubscribed);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsRegistering(false); // Reset isRegistering
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/HomePage'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-gray-100 outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-gray-100 outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-gray-100 outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div className="flex flex-col items-center">
                            <NewsletterToggle isChecked={newsletterSubscribed} onChange={handleToggleChange} />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register
