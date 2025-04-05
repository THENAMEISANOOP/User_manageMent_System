import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            const errorMessage = typeof message === 'string' ? message : message?.message || 'An error occurred';
            toast.error(errorMessage);
            setTimeout(() => {
                dispatch(reset());
            }, 1000);
        }

        if (isSuccess || user) {
            navigate('/');
            dispatch(reset());
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]{4,}$/;
        return name.trim() !== '' && nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validateName(name)) {
            toast.error('Name should be at least 4 characters long and contain only letters');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Password must be at least 6 characters and include uppercase, lowercase, number, and special character');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const userData = { name, email, password, confirmPassword };
        dispatch(signup(userData));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-3 text-sm text-gray-700">Creating your account...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xs">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
                    {/* Decorative header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-4 px-6">
                        <h1 className="text-xl font-bold text-white">Create Account</h1>
                        <p className="text-amber-100 text-xs mt-1">Join our community</p>
                    </div>
                    
                    <div className="p-6">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 transition duration-150"
                                    placeholder="John Doe"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 transition duration-150"
                                    placeholder="you@example.com"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 transition duration-150"
                                    placeholder="••••••••"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Must include uppercase, lowercase, number, and special character
                                </p>
                            </div>
                            
                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-600 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    required
                                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 transition duration-150"
                                    placeholder="••••••••"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition duration-150 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : 'Sign Up'}
                            </button>
                        </form>
                        
                        <div className="mt-5">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 bg-white text-gray-400">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => navigate('/login')}
                                className="mt-4 w-full bg-white text-sm text-amber-600 border border-amber-300 font-medium py-2 px-4 rounded-md shadow-sm hover:bg-amber-50 transition duration-150"
                            >
                                Login instead
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Anoop. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Signup;