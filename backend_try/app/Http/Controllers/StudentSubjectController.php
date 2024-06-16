<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentSubjectController extends Controller
{
    public function getStudentSubjects($student_id)
    {
        try {
            $student = Student::findOrFail($student_id);

            $subjects = $student->subjectsEnrolled()
                ->with(['subject' => function ($query) {
                    $query->select('id', 'subject_code', 'title', 'credit_unit');
                }, 'student.section', 'student.user:id,name'])
                ->get(['subject_id', 'student_id', 'midterm_grade', 'final_grade', 'remarks']);

            $studentName = $student->first_name;
            
            return response()->json([
                'enrolledSubjects' => $subjects,
                'studentName' => $studentName,
            ]);

        } catch (\Exception $e) {
            // Handle any errors like student not found
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function getStudentScheduleTeachers($student_id)
    {
        try {
            $student = Student::findOrFail($student_id);

            $subjects = $student->subjectsEnrolled()
                ->with(['subject' => function ($query) {
                    $query->select('id', 'subject_code', 'title', 'credit_unit');
                }, 'student.section'])
                ->get(['subject_id', 'student_id', 'instructor_id', 'class_schedule', 'remarks']);

            $studentName = $student->first_name;
            
            return response()->json([
                'enrolledSubjects' => $subjects,
                'studentName' => $studentName,
            ]);

        } catch (\Exception $e) {
            // Handle any errors like student not found
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
