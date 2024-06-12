import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Logo = () => {
    return (
        <Link to="/" className="">
            <img id='logo' src="logo1.png" alt="logo" />
        </Link>
    );
};

export default Logo;
