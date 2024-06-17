import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCalendarDays, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axios';

class Dashboard_admin extends Component {
  
  render() {

    return (
        <div className="flex flex-col justify-center items-center p-10 h-full max-h-screen bg-slate-100 relative overflow-hidden">
                    
        <div className="bannerimage">
          <img id="sakura" src="../sakura2.jpg" className="absolute left-[60%] top-[-1%] h-[695px] w-[640px] z-0" alt="Sakura" />
        </div>

        <div className='bg-slate-100 h-[880px] w-[350px] absolute left-[43%] top-[-10%] -rotate-12 shadow-right-custom-rotated'></div>

        <div className="banner mb-6 text-center bg-[rgb(30,41,59)] h-[199px] w-[700px] relative -top-[85px] left-[-21.6%] rounded-[12px] shadow-2xl">
          <img src="../shoyo.jpg" alt="Student" className="mx-auto mb-4 absolute h-[130px] left-[5%] top-[8%] rounded-full border-2 border-slate-200" />
          <img src="../stripes.png" className="absolute h-[199px] left-[49.5%] rounded-r-lg" alt="Stripes" />
          <label className="text-white italic text-3xl block absolute top-[8%] left-[70%] text-[28px]">CAMPUSHUB</label>
          <p className="text-white text-xl absolute top-[79%] left-[4%] text-[27px]">Welcome,</p>
        </div>

        <div className="boxes flex space-x-24 relative -top-[1%] left-[-21.6%] mx-auto">
          <Link to="/admin/instructor-assign" className="bg-custom-image2 box flex items-center justify-center shadow-md w-[280px] h-[180px] bg-slate-800 bg-no-repeat cursor-pointer rounded-[15px] transition ease duration-300 hover:bg-[rgb(51,65,85)]">
            <FontAwesomeIcon icon={faAddressCard} className="text-white text-[100px]" />
          </Link>
          <Link to="/admin/schedules" className="bg-custom-image3 box flex items-center justify-center shadow-md w-[280px] h-[180px] bg-slate-800 cursor-pointer rounded-[15px] transition ease duration-300 hover:bg-[rgb(51,65,85)]">
            <FontAwesomeIcon icon={faCalendarDays} className="text-white text-[100px]" />
          </Link> 
        </div>
      </div>
    );
  }
}

export default Dashboard_admin;