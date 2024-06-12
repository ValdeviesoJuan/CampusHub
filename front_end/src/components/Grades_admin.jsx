import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semesters: {
        "2023-2024 2nd Semester": [
          { id: 1, studentName: 'Josiah Joshua D. Ratunil', subjectCode: 'Studious Person ni', description: 'Studious Person ni', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
          { id: 2, studentName: 'Kent Paul Vicente', subjectCode: 'Studious Person ni', description: 'Cake and Flowers for you', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
          { id: 3, studentName: 'Gelo Pagutayao', subjectCode: 'Shotganon bi!', description: 'Studious Person ni', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
          { id: 4, studentName: 'Juan Carlos Valdevieso', subjectCode: 'Litsi na maestro jud to oh', description: 'Studious Person ni', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
          { id: 5, studentName: 'Joshua Amper', subjectCode: 'Yawa akong likod', description: 'Studious Person ni', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
          { id: 6, studentName: 'Kenshi Yonezu', subjectCode: 'Music is virtue', description: 'Studious Person ni', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
          { id: 7, studentName: 'Lisa Manoban', subjectCode: 'Yeahhhh', description: 'Studious Person ni', units: '3', section: 'A', midterm: 'B', final: 'A', reExam: 'None', remarks: 'Good' },
        ],
        "2023-2024 1st Semester": [
          { id: 1, studentName: 'Student One', subjectCode: 'Subject One', description: 'Description One', units: '3', section: 'A', midterm: 'A', final: 'A', reExam: 'None', remarks: 'Excellent' },
          { id: 2, studentName: 'Student Two', subjectCode: 'Subject Two', description: 'Description Two', units: '3', section: 'B', midterm: 'C', final: 'B', reExam: 'None', remarks: 'Average' },
        ],
        "2022-2023 2nd Semester": [
          { id: 1, studentName: 'Student Three', subjectCode: 'Subject Three', description: 'Description Three', units: '4', section: 'A', midterm: 'B', final: 'B', reExam: 'None', remarks: 'Good' },
        ],
        "2022-2023 1st Semester": [
          { id: 1, studentName: 'Student Four', subjectCode: 'Subject Four', description: 'Description Four', units: '2', section: 'C', midterm: 'A', final: 'A', reExam: 'None', remarks: 'Excellent' },
        ],
      },
      currentSemester: "2023-2024 2nd Semester",
      editIndex: -1,
      currentPage: 1,
      gradesPerPage: 5,
      searchQuery: '', // Add searchQuery to the state
    };
  }

  handleEditChange = (e, index) => {
    const { name, value } = e.target;
    const updatedGrades = [...this.state.semesters[this.state.currentSemester]];
    updatedGrades[index][name] = value;
    this.setState({
      semesters: {
        ...this.state.semesters,
        [this.state.currentSemester]: updatedGrades,
      },
    });
  };

  handleEditClick = (index) => {
    this.setState({ editIndex: index });
  };

  handleSaveClick = () => {
    this.setState({ editIndex: -1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSemesterChange = (e) => {
    this.setState({ currentSemester: e.target.value, currentPage: 1 });
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
    const { semesters, currentSemester, currentPage, gradesPerPage, editIndex, searchQuery } = this.state;
    let grades = semesters[currentSemester];

    if (searchQuery) {
      grades = grades.filter((grade) =>
        grade.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const indexOfLastGrade = currentPage * gradesPerPage;
    const indexOfFirstGrade = indexOfLastGrade - gradesPerPage;
    const currentGrades = grades.slice(indexOfFirstGrade, indexOfLastGrade);

    const totalPages = Math.ceil(grades.length / gradesPerPage);

    // Adjust current page if out of range
    if (currentPage > totalPages && totalPages > 0) {
      this.setState({ currentPage: totalPages });
    }

    return (
      <div className="shadow-md sm:rounded-lg w-full mb-4">
        <table className="w-full text-sm text-left text-black border-4 border-gray-900">
          <thead className="text-xs uppercase dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Student Name</th>
              <th scope="col" className="px-6 py-3">Subject Code</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Units</th>
              <th scope="col" className="px-6 py-3">Section</th>
              <th scope="col" className="px-6 py-3">Midterm</th>
              <th scope="col" className="px-6 py-3">Final</th>
              <th scope="col" className="px-6 py-3">Re-exam</th>
              <th scope="col" className="px-6 py-3">Remarks</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGrades.map((grade, index) => (
              <tr key={grade.id} className="border-b bg-white border-gray-900">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{grade.id}</th>
                <td className="px-6 py-4">{grade.studentName}</td>
                <td className="px-6 py-4">{grade.subjectCode}</td>
                <td className="px-6 py-4">{grade.description}</td>
                <td className="px-6 py-4">{grade.units}</td>
                <td className="px-6 py-4">{grade.section}</td>
                <td className="px-6 py-4">
                  {editIndex === indexOfFirstGrade + index ? (
                    <input
                      type="text"
                      name="midterm"
                      value={grade.midterm}
                      onChange={(e) => this.handleEditChange(e, indexOfFirstGrade + index)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    />
                  ) : (
                    grade.midterm
                  )}
                </td>
                <td className="px-6 py-4">
                  {editIndex === indexOfFirstGrade + index ? (
                    <input
                      type="text"
                      name="final"
                      value={grade.final}
                      onChange={(e) => this.handleEditChange(e, indexOfFirstGrade + index)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    />
                  ) : (
                    grade.final
                  )}
                </td>
                <td className="px-6 py-4">
                  {editIndex === indexOfFirstGrade + index ? (
                    <select
                      name="reExam"
                      value={grade.reExam}
                      onChange={(e) => this.handleEditChange(e, indexOfFirstGrade + index)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    >
                      <option value="None">None</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  ) : (
                    grade.reExam
                  )}
                </td>
                <td className="px-6 py-4">
                  {editIndex === indexOfFirstGrade + index ? (
                    <select
                      name="remarks"
                      value={grade.remarks}
                      onChange={(e) => this.handleEditChange(e, indexOfFirstGrade + index)}
                      className="p-2 border-2 border-gray-900 rounded-lg w-full bg-white"
                    >
                      <option value="None">None</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Poor">Poor</option>
                    </select>
                  ) : (
                    grade.remarks
                  )}
                </td>
                <td className="px-6 py-4">
                  {editIndex === indexOfFirstGrade + index ? (
                    <button onClick={this.handleSaveClick} className="text-green-600 hover:text-green-800 mx-2">
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  ) : (
                    <button onClick={() => this.handleEditClick(indexOfFirstGrade + index)} className="text-blue-600 hover:text-blue-800 mx-2">
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
    return (
      <main className="relative flex flex-col items-center p-8">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-left text-black">Grades</h1>
          <select
            className="form-control input-sm menu-select bg-white text-black border-2 border-gray-900"
            value={this.state.currentSemester}
            onChange={this.handleSemesterChange}
          >
            {Object.keys(this.state.semesters).map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <input
              type="text"
              placeholder="Search by student name"
              value={this.state.searchQuery} // Bind the input to searchQuery
              onChange={this.handleSearchChange}
              className="p-2 border-2 border-gray-900 rounded-lg mb-4 md:mb-0"
            />
          </div>
          <div className="flex space-x-8">
            <div className="p-4 bg-gray-200 border-2 border-gray-900 rounded-lg">
              <h2 className="text-lg font-bold text-black">Total Students</h2>
              <p className="text-xl text-black">50</p>
            </div>
            <div className="p-4 bg-gray-200 border-2 border-gray-900 rounded-lg">
              <h2 className="text-lg font-bold text-black">Average Grade</h2>
              <p className="text-xl text-black">B+</p>
            </div>
          </div>
        </div>
        {this.renderGradesTable()}
      </main>
    );
  }
}

export default Grades;
