<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use App\Models\InstructorSectionsHandled;
use App\Models\SubjectEnrolled;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class InstructorController extends Controller
{
    public function index()
    {
        $instructors = Instructor::all();
        return response()->json($instructors);
    }

    public function enroll(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'contact_number' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
        ]);

        $user = auth()->user();

        Instructor::updateOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $request->name,
                'birthdate' => $request->birthdate,
                'contact_number' => $request->contact_number,
                'email' => $request->email,
            ]
        );

        return response()->json(['message' => 'Instructor Enrollment completed successfully']);
    }

    public function isEnrolled()
    {
        $user = auth()->user();
        $instructor = Instructor::where('user_id', $user->id)->first();
        
        if ($instructor) {
            return response()->json(['isEnrolled' => true, 'instructorId' => $instructor->id]);
        } else {
            return response()->json(['isEnrolled' => false, 'instructorId' => null]);
        }
    }

    public function getEnrolledSubjects(Request $request)
    {
        $user = auth()->user();
        $instructor = Instructor::where('user_id', $user->id)->first();

        $enrolledSubjects = DB::table('instructor_sections_handled AS ish')
            ->join('subjects_enrolled as sube', 'sube.instructor_id', '=', 'ish.instructor_id')
            ->join('students as st', function ($join) {
                $join->on('st.id', '=', 'sube.student_id')
                    ->on('st.section_id', '=', 'ish.section_id')
                    ->on('st.school_year_id', '=', 'ish.school_year_id');
            })
            ->join('sections as se', 'se.id', '=', 'ish.section_id')
            ->join('subjects as sub', 'sub.id', '=', 'ish.subject_id')
            ->where('ish.instructor_id', $instructor->id)
            ->select('sub.subject_code', 
                     'sub.title', 
                     'se.name', 
                     'sube.class_schedule',
                     'sube.location')
            ->groupBy('sub.subject_code', 'sub.title', 'se.name', 'sube.class_schedule', 'sube.location')
            ->get();

        return response()->json(['enrolledSubjects' => $enrolledSubjects, 'instructorName' => $instructor->name]);
    }
}
