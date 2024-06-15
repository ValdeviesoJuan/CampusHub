<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentSubjectController extends Controller
{
    public function getStudentSubjects($student_id)
    {
        $student = Student::findOrFail($student_id);

        // Load subjects enrolled with additional details like subject_code, title, credit_units
        $subjects = $student->subjectsEnrolled()
            ->with(['subject' => function ($query) {
                $query->select('id', 'subject_code', 'title', 'credit_units');
            }, 'section'])
            ->get(['subject_id', 'section_id', 'midterm_grade', 'final_grade', 'remarks']);

        return response()->json($subjects);
    }
}
