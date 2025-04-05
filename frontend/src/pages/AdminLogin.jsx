import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin, resetAdmin } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.admin
    );

    useEffect(() => {
        if (isError) {
            setTimeout(() => {
                toast.error(message);
            }, 100);
            setTimeout(() => {
                dispatch(resetAdmin());
            }, 1000);
        }

        if (isSuccess || admin) {
            navigate('/admin/dashboard');
            dispatch(resetAdmin());
        }
    }, [admin, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const adminData = { email, password };
        dispatch(adminLogin(adminData));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-3 text-sm text-gray-700">Verifying admin credentials...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                    {/* Admin-specific header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-5 px-8">
                        <div className="flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3m0 0l3-3m-3 3h6m3 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
                        </div>
                        <p className="text-blue-100 text-xs mt-1 text-center">Restricted access</p>
                    </div>
                    
                    <div className="p-8">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition duration-150"
                                    placeholder="admin@example.com"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Admin Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition duration-150"
                                    placeholder="••••••••"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Authenticating...
                                    </>
                                ) : 'Access Admin Dashboard'}
                            </button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                Unauthorized access is prohibited. All activities are monitored.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} System Administration</p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;