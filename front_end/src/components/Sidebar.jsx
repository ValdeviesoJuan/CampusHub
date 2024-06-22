import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartLine, faUser, faCalendar, faChartPie, faCog, faSignOutAlt, faQuestionCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import admin1 from "../assets/admin1.jpg";
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true); // State to manage sidebar open/close
    const [barsRotated, setBarsRotated] = useState(false); // State to manage bars icon rotation
    const [isDropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility
    const [studentName, setStudentName] = useState('');
    const [userRole, setUserRole] = useState('');
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);

    useEffect(() => {
        const storedStudentName = localStorage.getItem('studentName');
        console.log(storedStudentName);
        const storedUserRole = localStorage.getItem('userRole');
        console.log(storedUserRole);
        if (storedStudentName) {
            setStudentName(storedStudentName);
        }
        if (storedUserRole) {
            setUserRole(storedUserRole);
            console.log(userRole);
        }

        async function fetchCsrfToken() {
            try {
                const { data } = await axiosInstance.get('/csrf-token');
                axiosInstance.defaults.headers['X-CSRF-TOKEN'] = data.csrf_token;
                console.log(data.csrf_token);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        }
        fetchCsrfToken();
    }, []);

    const toggleSidebar = () => {
        setOpen(!open);
        setBarsRotated(!barsRotated);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    }; 

    const adminMenus = [
        { title: "Dashboard", icon: faChartLine, path: "/admin/dashboard" },
        { title: "Assign Instructor", icon: faUser, gap: true, path: "/admin/instructor-assign" },
        { title: "Assign Schedule", icon: faChartPie, path: "/admin/schedules" },
        { title: "Settings", icon: faCog, gap: true, path: "/settings" },
        { title: "", gap: true, path: "/" },
        { title: "", gap: true, path: "/" },
        {
            title: (
                <li className="relative flex items-center" onClick={toggleDropdown}>
                    <div className='flex items-center'>
          <img src="../defa.jpg" alt="Student" className="mx-auto mb-4 absolute h-[130px] left-[5%] top-[8%] rounded-full border-2 border-slate-200" />
          <img src="../defa.jpg" alt="Student" className="mx-auto mb-4 absolute h-[130px] left-[5%] top-[8%] rounded-full border-2 border-slate-200" />
                        <img src="../defa.jpg" className="w-9 h-9 rounded-full mb-2 mr-2" alt="StudentPic" />
                        <a href="#" className="text-white hover:text-gray-400 flex relative">{studentName}</a>
                    </div>
                    {isDropdownVisible && (
                        <ul className="absolute bottom-0 left-0 mb-16 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Profile</span>
                            </li>
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Help</span>
                            </li>
                            <li onClick={onLogout} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Logout</span>
                            </li>
                        </ul>
                    )}
                </li>
            )
        }
    ];

    const studentMenus = [
        { title: "Dashboard", icon: faChartLine, path: "/student/dashboard" },
        { title: "Profile", icon: faUser, gap: true, path: "/student/profile" },
        { title: "Pseudo-Enrollment", icon: faUserPlus, path: "/student/pseudo-enrollment" },
        { title: "Schedule", icon: faCalendar, path: "/student/schedules" },
        { title: "Grades", icon: faChartPie, path: "/student/grades" },
        { title: "Settings", icon: faCog, gap: true, path: "/settings" },
        { title: "", gap: true, path: "/" },
        { title: "", gap: true, path: "/" },
        {
            title: (
                <li className="relative flex items-center" onClick={toggleDropdown}>
                    <div className='flex items-center'>
                        <img src="../defa.jpg"  className="w-9 h-9 rounded-full mb-2 mr-2" alt="StudentPic" />
                        <a href="#" className="text-white hover:text-gray-400 flex relative">{studentName}</a>
                    </div>
                    {isDropdownVisible && (
                        <ul className="absolute bottom-0 left-0 mb-16 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Profile</span>
                            </li>
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Help</span>
                            </li>
                            <li onClick={onLogout} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Logout</span>
                            </li>
                        </ul>
                    )}
                </li>
            )
        }
    ];

    const instructorMenus = [
        { title: "Dashboard", icon: faChartLine, gap: true, path: "/instructor/dashboard" },
        { title: "Pseudo-Enrollment", icon: faUserPlus, path: "/instructor/pseudo-enrollment" },
        { title: "Schedule", icon: faCalendar, path: "/instructor/schedules" },
        { title: "Grades", icon: faChartPie, path: "/instructor/grades" },
        { title: "Settings", icon: faCog, gap: true, path: "/settings" },
        { title: "", gap: true, path: "/" },
        { title: "", gap: true, path: "/" },
        {
            title: (
                <li className="relative flex items-center" onClick={toggleDropdown}>
                    <div className='flex items-center'>
                        <img src="../defa.jpg"  className="w-9 h-9 rounded-full mb-2 mr-2" alt="StudentPic" />
                        <a href="#" className="text-white hover:text-gray-400 flex relative">{studentName}</a>
                    </div>
                    {isDropdownVisible && (
                        <ul className="absolute bottom-0 left-0 mb-16 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Profile</span>
                            </li>
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Help</span>
                            </li>
                            <li onClick={onLogout} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg" />
                                <span className="text-l font-bold">Logout</span>
                            </li>
                        </ul>
                    )}
                </li>
            )
        }
    ];

    let Menus = [];
    if (userRole === 'admin') {
        Menus = adminMenus;
    } else if (userRole === 'instructor') {
        Menus = instructorMenus;
    } else if (userRole === 'student') {
        Menus = studentMenus;
    } else {
        console.log('Error, You have no Role in Life');
    }

    return (
        <div className="flex">
            <div
                className={`z-30 ${open ? "w-72" : "w-20"} bg-slate-900 h-full p-5 pt-8 relative duration-300`}
            >
                <FontAwesomeIcon
                    icon={faBars}
                    className={`text-white cursor-pointer top-9 w-9 size-9 transition-transform duration-500 ${barsRotated ? "rotate-[360deg]" : ""}`}
                    style={{
                        left: open ? 'calc(100% - 1.25rem)' : 'calc(100% - 2.75rem)',
                    }}
                    onClick={toggleSidebar}
                />
                <div className="flex gap-x-4 items-center">
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
                       
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-slate"}`}
                        >
                            <NavLink
                                to={Menu.path}
                                className="flex items-center gap-x-4 w-full"
                                //activeClassName="text-blue-500"
                            >
                                {({ isActive }) => (
                                    <>
                                        <FontAwesomeIcon icon={Menu.icon} className={isActive ? 'text-blue-500' : 'text-white'} />
                                        <span className={`${!open && "hidden"} origin-left duration-200 ${isActive ? 'text-blue-500' : 'text-white'}`}>
                                            {Menu.title}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
