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

    public function getStudentsByInstructor(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'section_id' => 'required|exists:sections,id',
            'school_year_id' => 'required|exists:school_years,id',
        ]);

        $user = auth()->user();
        $instructor = Instructor::where('user_id', $user->id)->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found'], 404);
        }

        $instructorId = $instructor->id;
        
        $students = SubjectEnrolled::where('instructor_id', $instructorId)
            ->where('subject_id', $request->subject_id)
            ->whereHas('student', function ($query) use ($request) {
                $query->where('section_id', $request->section_id)
                      ->where('school_year_id', $request->school_year_id);
            })
            ->with('student')
            ->with('student.section')
            ->with('subject')
            ->get();

        return response()->json($students);
    }
}
