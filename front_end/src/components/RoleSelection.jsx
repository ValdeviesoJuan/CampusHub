import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUserCog } from '@fortawesome/free-solid-svg-icons';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {    
        navigate(`/LoginForm`, { state: { role } });
    };

    return (
        <div className="relative flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat bg-slate-100" style={{backgroundImage: 'url("images/ustp.png")'}}>
            <div className="max-w-md w-full bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
                <div className="text-white mb-8">
                    <img src="images/logo.PNG" alt="CampusHub Logo" className="mb-5 w-25 h-25 rounded-full bg-transparent relative mx-auto" />
                    <h1 className="text-3xl mt-1 font-bold">Select Your Role</h1>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                        <button 
                            onClick={() => handleRoleSelect('student')} 
                            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                            Student
                        </button>
                    </div>
                    <div className="flex-shrink-0">
                        <button 
                            onClick={() => handleRoleSelect('admin')} 
                            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                        >
                            <FontAwesomeIcon icon={faUserCog} className="mr-2" />
                            Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
