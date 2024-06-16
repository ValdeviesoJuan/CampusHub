import React, { Component } from 'react';
import axiosInstance from '../axios';
import BlackLoadingSpinner from './BlackLoadingSpinner';

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolledSubjects: [],
      averageGrade: 'B+',
      studentId: null,
      isEnrolled: false,
      studentName: '', 
      loading: true,
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
        this.fetchEnrolledSubjects(studentId);
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

  fetchEnrolledSubjects = async (studentId) => {
    try {
      const response = await axiosInstance.get(`/api/students/${studentId}/subjects`);
      this.setState({ 
        enrolledSubjects: response.data.enrolledSubjects,
        studentName: response.data.studentName,
        loading: false,  
      });
    } catch (error) {
      console.error('Error fetching enrolled subjects:', error);
      alert('Error fetching enrolled subjects. Please check console for details.');
      this.setState({ loading: false });
    }
  };

  handlePrint = () => {
    window.print();
  }

  render() {
    const { enrolledSubjects, averageGrade, studentName, loading } = this.state;

    return (
      <main className="relative flex flex-col items-center p-8">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-left text-black">Grades</h1>
          <select className="form-control input-sm menu-select bg-white text-black border-2 border-gray-900">
            <option value="Year1">2023-2024 2nd Semester</option>
            <option value="Year2">2023-2024 1st Semester</option>
            <option value="Year3">2022-2023 2nd Semester</option>
            <option value="Year4">2022-2023 1st Semester</option>
          </select>
        </div>
        <div className="w-full flex justify-between items-center mb-6">
          <button onClick={this.handlePrint} className="p-2 bg-white border-black text-black rounded-lg">Print Grades</button>
          <div className="p-4 bg-gray-200 border-2 border-gray-900 rounded-lg">
            <h2 className="text-lg font-bold text-black">Average Grade <br></br> B+</h2>
            <p className="text-xl text-black"></p>
          </div>
        </div>
        <div className="shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-black border-4 border-gray-900">
            <thead className="text-xs uppercase dark:text-black">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Subject Code</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Units</th>
                <th scope="col" className="px-6 py-3">Section</th>
                <th scope="col" className="px-6 py-3">Midterm</th>
                <th scope="col" className="px-6 py-3">Final</th>
                <th scope="col" className="px-6 py-3">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                        <tr>
                          <td colSpan="12" className="text-center">
                            <BlackLoadingSpinner />
                          </td>
                        </tr>
                      ) : (
                enrolledSubjects.map((subject, index) => (
                  <tr className="border-b bg-white border-gray-900" key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{subject.subject.subject_code}</td>
                    <td className="px-6 py-4">{subject.subject.title}</td>
                    <td className="px-6 py-4">{subject.subject.credit_unit}</td>
                    <td className="px-6 py-4">{subject.student.section.name}</td>
                    <td className="px-6 py-4">{subject.midterm_grade}</td>
                    <td className="px-6 py-4">{subject.final_grade}</td>
                    <td className="px-6 py-4">{subject.remarks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <br />
        <div className="mt-4 text-left w-full">
          <p className="text-black font-medium">Student Name: {studentName}</p>
        </div>
      </main>
    );
  }
}

export default Grades;