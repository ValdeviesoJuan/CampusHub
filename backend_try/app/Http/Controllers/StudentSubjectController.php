<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\SubjectEnrolled;
use App\Models\Instructor;
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
                }, 'student.section', 'instructor' => function ($query) {
                    $query->select('id', 'name', 'email');
                }])
                ->get(['subject_id', 'student_id', 'instructor_id', 'class_schedule', 'location', 'remarks']);

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

    public function getStudentsByInstructor()
    {
        $user = auth()->user();
        $instructor = Instructor::where('user_id', $user->id)->first();
        $instructorId = $instructor->id;

        $students = SubjectEnrolled::where('instructor_id', $instructorId)
        ->with(['student' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'section_id')
                  ->with('section:id,name'); // Eager load the section relationship
        }])
        ->with('subject:id,subject_code,title,credit_unit') // Eager load subject relationship with required fields
        ->get();

        return response()->json($students);
    }
}
