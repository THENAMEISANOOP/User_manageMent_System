import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <h1 
                            className="text-2xl font-bold cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={handleHomeClick}
                        >
                            User Management
                        </h1>
                    </div>
                    {user && (
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleProfileClick}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition"
                            >
                                <span className="text-lg">👤</span>
                                <span className="text-black font-semibold truncate max-w-[150px] overflow-hidden">{user.name}</span>

                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
