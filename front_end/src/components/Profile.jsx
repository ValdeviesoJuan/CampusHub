import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import BlackLoadingSpinner from './BlackLoadingSpinner';
import axiosInstance from '../axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: {
        student_id: '',
        full_name: '',
        birthdate: '',
        age: '',
        phone_number: '',
        email: '',
        section_name: '',
        course: '',
        department: '',
      },
      loading: true,
      error: null,
      studentId: null,
      isEnrolled: false,
    };
  }

  componentDidMount() {
    this.checkEnrollment();
  }

  checkEnrollment = async () => {
    try {
      const response = await axiosInstance.get('/api/students/enrolled'); 
      const { isEnrolled, studentId } = response.data;
      console.log(response.data);
      if (isEnrolled) {
        this.setState({ isEnrolled, studentId });
        this.fetchStudentInformation(studentId);
      } else {
        alert('You are not enrolled as a student.');
        // Handle redirect or display message for non-enrolled user
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
      alert('Error checking enrollment. Please check console for details.');
    }
  };

  fetchStudentInformation = async (studentId) => {
    try {
      const response = await axiosInstance.get(`/api/students/${studentId}`);
      console.log(response.data.studentInfo);
      this.setState({ studentData: response.data.studentInfo, 
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching enrolled subjects:', error);
      alert('Error fetching enrolled subjects. Please check console for details.');
    }
  };
  
  render() {
    const { studentData, loading } = this.state;

    if (loading) {
      return  <div className='relative flex align-middle justify-center text-center mx-auto my-auto'> <BlackLoadingSpinner /> </div>
    }

    return (
      <div className="flex flex-col bg-white bg-custom-image bg-cover bg-center h-full max-h-screen relative overflow-hidden">
        <div class='profile' className='bg-slate-800 h-[200px] w-[295px] rounded-md relative top-[10%] left-[5%] shadow-2xl'>
          <img src="shoyo.jpg" alt="Student" className="absolute top-[-25%] left-[3%] border-4 border-slate-800 rounded-full h-[140px]"></img>
          <button className="absolute left-[39%] top-[30%] bg-transparent border-none outline-none p-0 m-0">
            <FontAwesomeIcon icon={faSquarePen} className="text-white text-[28px]" style={{ width: '25px', height: '25px' }} />
          </button>
          <p className='text-white text-xl absolute left-[5%] top-[50%] '>Student Name: {studentData.full_name}</p>
          <p className='text-white text-lg absolute  left-[5%] top-[80%]'> Student ID: {studentData.student_id}</p>
        </div>

        <div className='bg-slate-800 h-[280px] w-[300px] rounded-md relative top-[15%] left-[5%] shadow-2xl'>
          <p className='text-white text-lg absolute left-[4%] top-[5%] text-[20px]'>CURRENTLY ENROLLED IN </p>
          <p className='bg-slate-100 pt-2 pl-2 pb-8 w-[300px] text-slate-900 text-xl absolute top-[20%]'>Section: {studentData.section_name}</p>
          <br />
          <p className='bg-slate-100 pb-8 pl-2 w-[300px] text-slate-900 text-xl absolute top-[40%]'>Course: {studentData.course}</p>
          <br />
          <p className='bg-slate-100 pb-24 pl-2 rounded-b-lg w-[300px] text-slate-900 text-xl absolute top-[58%]'>Department: {studentData.department}</p>
          <br />        
        </div>


        <div class='profile' className='rounded-md w-[50%] h-[20%] relative top-[-27.5%] left-[30%] justify-center'>
        <table class="table-fixed border-collapse border-spacing-0 shadow-2xl rounded-lg">
        <caption class="caption-top bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-5 w-full rounded-lg shadow-md">
        The information of students is strictly confidential and will not be disclosed outside the school.
        </caption>
            <thead>
              <tr>
                <th className='bg-slate-800 rounded-tl-lg text-white'>General Info</th>
                <th className='bg-slate-800 rounded-tr-lg'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-slate-100'>
                <td>Birthdate:</td>
                <td>{studentData.birthdate}</td>
              </tr>
              <tr className='bg-slate-100'>
                <td>Age:</td>
                <td>{studentData.age}</td>
              </tr>
              <tr className='bg-slate-100'>
                <td>Phone number:</td>
                <td>{studentData.phone_number}</td>
              </tr>
              <tr className='bg-slate-100'>
                <td>Email:</td>
                <td>{studentData.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
