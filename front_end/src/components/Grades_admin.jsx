import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axios';

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      subjects: [],
      sections: [],
      schoolYears: [],
      selectedSubject: '',
      selectedSection: '',
      selectedSchoolYear: '',
      editIndex: -1,
      editMode: false,
      currentPage: 1,
      gradesPerPage: 5,
      searchQuery: '',
      editedStudents: {}, // Store edited student data
      selectedSubjectId: null // Track selected subject ID
    };
  }

  componentDidMount() {
    this.fetchDropdownData();
    this.fetchStudents();
  }

  fetchDropdownData = () => {
    axiosInstance.get('/api/subjects').then(response => this.setState({ subjects: response.data }));
    axiosInstance.get('/api/sections').then(response => this.setState({ sections: response.data }));
    axiosInstance.get('/api/school_years').then(response => this.setState({ schoolYears: response.data }));
  };

  fetchStudents = () => {
    const { selectedSubject, selectedSection, selectedSchoolYear } = this.state;
    axiosInstance.get('/api/students-by-instructor', {
      params: {
        subject_id: selectedSubject,
        section_id: selectedSection,
        school_year_id: selectedSchoolYear,
      }
    }).then(response => {
      const students = response.data.map(student => ({
        student_id: student.student.id,
        student_name: `${student.student.first_name} ${student.student.last_name}`,
        subject_code: student.subject.subject_code,
        title: student.subject.title,
        credit_unit: student.subject.credit_unit,
        section_name: student.student.section.name,
        midterm_grade: student.midterm_grade,
        final_grade: student.final_grade,
        remarks: student.remarks,
        subject_id: student.subject.id,
        subject_enrolled_id: student.id,
      }));
      this.setState({ students });
    });
  };

  handleEditChange = (e, studentId) => {
    const { name, value } = e.target;
    const { editedStudents } = this.state;
    const updatedStudent = { ...editedStudents[studentId], [name]: value };
    this.setState({
      editedStudents: {
        ...editedStudents,
        [studentId]: updatedStudent,
      },
    });
  };

  handleEditClick = (studentId, subjectEnrolledId) => {
    this.setState({ editIndex: studentId, editMode: true, selectedSubjectId: subjectEnrolledId });
  };

  handleSaveClick = (studentId) => {
    const { editedStudents, selectedSubjectId } = this.state;
    const editedStudent = editedStudents[studentId];

    // Send edited data to server using Axios (assuming endpoint /api/update-grade)
    axiosInstance.put(`/api/update-grade/${selectedSubjectId}`, editedStudent)
      .then(response => {
        console.log('Grade updated successfully:', response.data);

        const updatedStudents = this.state.students.map(student => {
          if (student.student_id === studentId) {
            return {
              ...student,
              midterm_grade: editedStudent.midterm_grade || student.midterm_grade,
              final_grade: editedStudent.final_grade || student.final_grade,
              remarks: editedStudent.remarks || student.remarks
            };
          }
          return student;
        });

        this.setState({
          editIndex: -1,
          editMode: false,
          editedStudents: {
            ...editedStudents,
            [studentId]: undefined,
          },
          students: updatedStudents
        });
      })
      .catch(error => {
        console.error('Error updating grade:', error);
      });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchClick = () => {
    this.setState({ currentPage: 1 });
  };

  renderPagination = (totalPages) => {
    const { currentPage } = this.state;
    return (
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => this.handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  renderGradesTable = () => {
    const { students, currentPage, gradesPerPage, editIndex, editMode, searchQuery, editedStudents } = this.state;
    let filteredStudents = students;

    if (searchQuery) {
      filteredStudents = filteredStudents.filter((student) =>
        student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const indexOfLastStudent = currentPage * gradesPerPage;
    const indexOfFirstStudent = indexOfLastStudent - gradesPerPage;
    const currentStudents = Array.isArray(filteredStudents) ? filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent) : [];

    const totalPages = Math.ceil(filteredStudents.length / gradesPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      this.setState({ currentPage: totalPages });
    }

    return (
      <div className="shadow-md sm:rounded-lg w-full mb-4">
        <table className="w-full text-sm text-left text-black border-4 border-gray-900">
          <thead className="text-xs uppercase dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">Student ID</th>
              <th scope="col" className="px-6 py-3">Student Name</th>
              <th scope="col" className="px-6 py-3">Subject Code</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Units</th>
              <th scope="col" className="px-6 py-3">Section</th>
              <th scope="col" className="px-6 py-3">Midterm</th>
              <th scope="col" className="px-6 py-3">Final</th>
              <th scope="col" className="px-6 py-3">Remarks</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student.student_id} className="border-b bg-white border-gray-900">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{student.student_id}</th>
                <td className="px-6 py-4">{student.student_name}</td>
                <td className="px-6 py-4">{student.subject_code}</td>
                <td className="px-6 py-4">{student.title}</td>
                <td className="px-6 py-4">{student.credit_unit}</td>
                <td className="px-6 py-4">{student.section_name}</td>
                <td className="px-6 py-4">
                  {editMode && editIndex === student.student_id ? (
                    <input
                      type="text"
                      name="midterm_grade"
                      value={editedStudents[student.student_id]?.midterm_grade || student.midterm_grade}
                      onChange={(e) => this.handleEditChange(e, student.student_id)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    />
                  ) : (
                    student.midterm_grade
                  )}
                </td>
                <td className="px-6 py-4">
                  {editMode && editIndex === student.student_id ? (
                    <input
                      type="text"
                      name="final_grade"
                      value={editedStudents[student.student_id]?.final_grade || student.final_grade}
                      onChange={(e) => this.handleEditChange(e, student.student_id)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    />
                  ) : (
                    student.final_grade
                  )}
                </td>
                <td className="px-6 py-4">
                  {editMode && editIndex === student.student_id ? (
                    <select
                      name="remarks"
                      value={editedStudents[student.student_id]?.remarks || student.remarks}
                      onChange={(e) => this.handleEditChange(e, student.student_id)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    >
                      <option value="">Select Remark</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                      <option value="Incomplete">Incomplete</option>
                      <option value="Not Yet Posted">Not Yet Posted</option>
                    </select>
                  ) : (
                    student.remarks
                  )}
                </td>
                <td className="px-6 py-4">
                  {editMode && editIndex === student.student_id ? (
                    <button onClick={() => this.handleSaveClick(student.student_id)} className="text-blue-600 hover:text-blue-800 mx-2">
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  ) : (
                    <button onClick={() => this.handleEditClick(student.student_id, student.subject_enrolled_id)} className="text-blue-600 hover:text-blue-800 mx-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.renderPagination(totalPages)}
      </div>
    );
  };

  render() {
    const { subjects, sections, schoolYears, selectedSubject, selectedSection, selectedSchoolYear, searchQuery } = this.state;

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

        {/* <div className="mb-4">
          <label className="mr-2">Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => this.setState({ selectedSubject: e.target.value })}
            className="p-2 border-2 border-gray-900 rounded-lg bg-white"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.title}</option>
            ))}
          </select>

          <label className="mr-2 ml-4">Section:</label>
          <select
            value={selectedSection}
            onChange={(e) => this.setState({ selectedSection: e.target.value })}
            className="p-2 border-2 border-gray-900 rounded-lg bg-white"
          >
            <option value="">Select Section</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>{section.name}</option>
            ))}
          </select>

          <label className="mr-2 ml-4">School Year:</label>
          <select
            value={selectedSchoolYear}
            onChange={(e) => this.setState({ selectedSchoolYear: e.target.value })}
            className="p-2 border-2 border-gray-900 rounded-lg bg-white"
          >
            <option value="">Select School Year</option>
            {schoolYears.map(schoolYear => (
              <option key={schoolYear.id} value={schoolYear.id}>{schoolYear.name}</option>
            ))}
          </select>

          <button
            onClick={this.fetchStudents}
            className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Filter
          </button>
        </div> */}

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search by student name"
            className="p-2 border-2 border-gray-900 rounded-lg w-50"
          />
          {/* <button
            onClick={this.handleSearchClick}
            className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button> */}
        </div>

        {this.renderGradesTable()}
      </div>
    );
  }
}

export default Grades;
