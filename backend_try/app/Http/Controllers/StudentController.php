<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Instructor;
use App\Models\Section;
use App\Models\YearLevel;
use App\Models\SchoolYear;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    public function enroll(Request $request)
    {
        // Validate the form data
        $request->validate([
            'program_id' => 'required|exists:programs,id',
            'year_level_id' => 'required|exists:year_levels,id',
            'semester_id' => 'required|exists:semesters,id',
            'section_id' => 'required|exists:sections,id',
            'school_year_id' => 'required|exists:sections,id',
        ]);

        // Assume the logged in user is a student
        $user = auth()->user();

        // Create or update the student's enrollment information
        $student = Student::updateOrCreate(
            ['user_id' => $user->id],
            [
                'program_id' => $request->program_id,
                'year_level_id' => $request->year_level_id,
                'semester_id' => $request->semester_id,
                'section_id' => $request->section_id,
                'school_year_id' => $request->school_year_id,
            ]
        );

        // Automatically enroll the student in subjects for the specified program, year level, and semester
        $this->autoEnrollSubjects($student);

        return response()->json(['message' => 'Enrollment completed successfully']);
    }

    private function autoEnrollSubjects($student)
    {
        // Fetch subjects based on program, year level, and semester
        $subjects = $this->getSubjectsForEnrollment($student->program_id, $student->year_level_id, $student->semester_id);

        foreach ($subjects as $subject) {

            $student->subjectsEnrolled()->create([
                'subject_id' => $subject->id,
                'instructor_id' => null,
                'class_schedule' => '',
                'midterm_grade' => null,
                'final_grade' => null,
                'remarks' => '',
            ]);
        }
    }

    private function getSubjectsForEnrollment($programId, $yearLevelId, $semesterId)
    {
        // Fetch subjects based on program, year level, and semester
        return Subject::where('program_id', $programId)
                      ->where('year_level_id', $yearLevelId)
                      ->where('semester_id', $semesterId)
                      ->get();
    }

    public function isEnrolled()
    {
        $user = auth()->user();
        $student = Student::where('user_id', $user->id)->first();
        
        if ($student) {
            return response()->json(['isEnrolled' => true, 'studentId' => $student->id]);
        } else {
            return response()->json(['isEnrolled' => false, 'studentId' => null]);
        }
    }

    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validatedData = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'year_level_id' => 'required|exists:year_levels,id',
            'semester_id' => 'required|exists:semesters,id',
            'section_id' => 'required|exists:sections,id',
            'school_year_id' => 'required|exists:school_years,id',
        ]);

        $student->update($validatedData);
        return response()->json($student);
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json(null, 204);
    }
}
