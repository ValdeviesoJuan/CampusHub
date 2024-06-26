import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axios';

class ConfirmationModal extends Component {
  render() {
    const { message, onCancel, onConfirm } = this.props;

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8">
          <p className="text-lg mb-4">{message}</p>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2" onClick={onCancel}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

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
      selectedSubjectId: null, // Track selected subject ID
      allowGradeSubmission: false,
      confirmSubmitGrades: false,
      confirmNoEditAfterSubmit: false,
      confirmSave: false, // New state for confirming the save action
    };
  }

  componentDidMount() {
    this.fetchDropdownData();
    this.fetchStudents();
    this.fetchAdminSettings();
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
        is_midterm_submitted: student.is_midterm_submitted,
        is_final_submitted: student.is_final_submitted
      }));
      this.setState({ students });
    });
  };

  fetchAdminSettings = () => {
    axiosInstance.get('/api/admin-settings').then(response => {
      const { allowGradeSubmission } = response.data;
      console.log(response.data);
      this.setState({ allowGradeSubmission: allowGradeSubmission || false });
      console.log('Admin settings fetched successfully:', allowGradeSubmission);
    })
    .catch(error => {
      console.error('Error fetching admin settings:', error);
      // Optionally handle error state or retry logic here
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

    // Trigger the first confirmation modal
    this.setState({ confirmSubmitGrades: true });
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

  handleConfirmSubmitGrades = () => {
    // Close the first modal and proceed to the second modal
    this.setState({ confirmSubmitGrades: false, confirmNoEditAfterSubmit: true });
  };

  handleConfirmNoEditAfterSubmit = () => {
    // Close the second modal and proceed to saving grades
    this.setState({ confirmNoEditAfterSubmit: false, confirmSave: true });
  };

  handleConfirmSave = () => {
    // Close the save confirmation modal and actually save the grades
    this.setState({ confirmSave: false });
    this.saveGrades();
  };

  saveGrades = () => {
    const { editedStudents, selectedSubjectId } = this.state;
    const studentId = this.state.editIndex; // Assuming editIndex is the studentId

    const editedStudent = editedStudents[studentId];

    axiosInstance.put(`/api/update-grade/${selectedSubjectId}`, editedStudent)
      .then(response => {
        console.log('Grade updated successfully:', response.data);

        const updatedStudents = this.state.students.map(student => {
          if (student.student_id === studentId) {
            return {
              ...student,
              midterm_grade: editedStudent.midterm_grade || student.midterm_grade,
              final_grade: editedStudent.final_grade || student.final_grade,
              remarks: editedStudent.remarks || student.remarks,
              is_midterm_submitted: editedStudent.midterm_grade ? true : student.is_midterm_submitted,
              is_final_submitted: editedStudent.final_grade ? true : student.is_final_submitted
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
          students: updatedStudents,
        });
      })
      .catch(error => {
        console.error('Error updating grade:', error);
      });
  };

  renderConfirmationModal = () => {
    const { confirmSubmitGrades, confirmNoEditAfterSubmit, confirmSave } = this.state;

    if (confirmSubmitGrades) {
      return (
        <ConfirmationModal
          message="Are you sure you want to submit the grades?"
          onCancel={() => this.setState({ confirmSubmitGrades: false })}
          onConfirm={this.handleConfirmSubmitGrades}
        />
      );
    }

    if (confirmNoEditAfterSubmit) {
      return (
        <ConfirmationModal
          message="You cannot edit grades after submission. Are you sure?"
          onCancel={() => this.setState({ confirmNoEditAfterSubmit: false })}
          onConfirm={this.handleConfirmNoEditAfterSubmit}
        />
      );
    }

    if (confirmSave) {
      return (
        <ConfirmationModal
          message="Are you sure you want to save the changes?"
          onCancel={() => this.setState({ confirmSave: false })}
          onConfirm={this.handleConfirmSave}
        />
      );
    }

    return null;
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
    const { students, currentPage, gradesPerPage, editIndex, editMode, searchQuery, editedStudents, allowGradeSubmission } = this.state;
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
        {this.renderConfirmationModal()} {/* Render confirmation modals */}
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
                      disabled={!allowGradeSubmission || student.is_midterm_submitted} 
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
                      disabled={!allowGradeSubmission || student.is_final_submitted} 
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
                      disabled={!allowGradeSubmission} // Disable input if grade submission is closed
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
    const { subjects, sections, schoolYears, selectedSubject, selectedSection, selectedSchoolYear, searchQuery, allowGradeSubmission } = this.state;

    console.log(allowGradeSubmission);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search by student name"
            className="p-2 border-2 border-gray-900 rounded-lg w-50"
          />
        </div>

        {this.renderGradesTable()}
      </div>
    );
  }
}

export default Grades;

