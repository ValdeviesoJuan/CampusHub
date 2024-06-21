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
      file: null, // State for storing selected file
      imagePreview: null, // State for image preview
    };
  }

  componentDidMount() {
    this.checkEnrollment();
  }

  checkEnrollment = async () => {
    try {
      const response = await axiosInstance.get('/api/students/enrolled');
      const { isEnrolled, studentId } = response.data;
      if (isEnrolled) {
        this.setState({ isEnrolled, studentId });
        this.fetchStudentInformation(studentId);
      } else {
        alert('You are not enrolled as a student.');
        this.setState({ loading: false });
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
      this.setState({
        studentData: response.data.studentInfo,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching student information:', error);
      alert('Error fetching student information. Please check console for details.');
    }
  };

  // Function to handle file selection
  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreview: reader.result, // Base64 string for preview
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle image upload
  handleImageUpload = async () => {
    const { file, studentId } = this.state;
    if (!file) {
      alert('Please select an image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('studentId', studentId); // Assuming you need to send studentId to associate image

      const response = await axiosInstance.post('/api/students/upload-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      console.log('Image uploaded successfully:', response.data);
      alert('Profile picture updated successfully.');

      // Update state and refresh profile information
      this.fetchStudentInformation(studentId);
      this.setState({ file: null, imagePreview: null });

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please check console for details.');
    }
  };

  render() {
    const { studentData, loading, imagePreview } = this.state;

    if (loading) {
      return <BlackLoadingSpinner />;
    }

    return (
      <div className="flex flex-col bg-white bg-custom-image bg-cover bg-center h-full max-h-screen relative overflow-hidden">
        <div className="bg-slate-800 h-[200px] w-[295px] rounded-md relative top-[10%] left-[5%] shadow-2xl">
          {imagePreview ? (
            <img src={imagePreview} alt="Student" className="absolute top-[-25%] left-[3%] border-4 border-slate-800 rounded-full h-[140px]" />
          ) : (
            <img src="../shoyo.jpg" alt="Student" className="absolute top-[-25%] left-[3%] border-4 border-slate-800 rounded-full h-[140px]" />
          )}
          <label htmlFor="fileUpload" className="absolute left-[39%] top-[30%] bg-transparent border-none outline-none p-0 m-0">
            <FontAwesomeIcon icon={faSquarePen} className="text-white text-[28px]" style={{ width: '25px', height: '25px' }} />
          </label>
          {/* Hidden file input for image selection */}
          <input
            id="fileUpload"
            type="file"
            style={{ display: 'none' }}
            onChange={this.handleFileChange}
          />
          <button
            onClick={this.handleImageUpload}
            className="absolute left-[39%] top-[30%] bg-transparent border-none outline-none p-0 m-0"
          >
            {/* Icon for upload button */}
            <FontAwesomeIcon
              icon={faSquarePen}
              className="text-white text-[28px]"
              style={{ width: '25px', height: '25px' }}
            />
          </button>
          <p className="text-white text-xl absolute left-[5%] top-[50%]">
            Student Name: {studentData.full_name}
          </p>
          <p className="text-white text-lg absolute left-[5%] top-[80%]">
            Student ID: {studentData.student_id}
          </p>
        </div>

        <div className="bg-slate-800 h-[280px] w-[300px] rounded-md relative top-[15%] left-[5%] shadow-2xl">
          <p className="text-white text-lg absolute left-[4%] top-[5%] text-[20px]">
            Currently Enrolled In
          </p>
          <p className="bg-slate-100 pt-2 pl-2 pb-8 w-[300px] text-slate-900 text-xl absolute top-[20%]">
            Section: {studentData.section_name}
          </p>
          <br />
          <p className="bg-slate-100 pb-8 pl-2 w-[300px] text-slate-900 text-xl absolute top-[40%]">
            Course: {studentData.course}
          </p>
          <br />
          <p className="bg-slate-100 pb-24 pl-2 rounded-b-lg w-[300px] text-slate-900 text-xl absolute top-[58%]">
            Department: {studentData.department}
          </p>
          <br />
        </div>

        <div className="rounded-md w-[50%] h-[20%] relative top-[-25%] left-[30%] justify-center">
          <table className="table-fixed border-collapse border-spacing-0 shadow-2xl rounded-lg">
            <caption className="caption-top bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-5 w-full rounded-lg shadow-md">
              The information of students is strictly confidential and will not be disclosed outside the school.
            </caption>
            <thead>
              <tr>
                <th className="bg-slate-800 rounded-tl-lg text-white text-lg font">Student Information</th>
                <th className="bg-slate-800 rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-100">
                <td>Birthdate:</td>
                <td>{studentData.birthdate}</td>
              </tr>
              <tr className="bg-slate-100">
                <td>Age:</td>
                <td>{studentData.age}</td>
              </tr>
              <tr className="bg-slate-100">
                <td>Phone number:</td>
                <td>{studentData.phone_number}</td>
              </tr>
              <tr className="bg-slate-100">
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
