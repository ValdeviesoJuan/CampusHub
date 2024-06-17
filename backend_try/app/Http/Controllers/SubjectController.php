<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Section; 
use App\Models\Student;
use App\Models\SubjectEnrolled;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function getSectionSchedules()
    {
        DB::statement("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
        
        try {
            $subjects = SubjectEnrolled::select(
                'subjects_enrolled.id as subjects_enrolled_id',
                'sect.name as section_name',
                'sub.subject_code',
                'sub.title',
                'sub.credit_unit',
                'subjects_enrolled.class_schedule',
                'ins.name as instructor_name',
                'ins.email as instructor_email'
            )
            ->join('subjects as sub', 'sub.id', '=', 'subjects_enrolled.subject_id')
            ->join('students as st', 'st.id', '=', 'subjects_enrolled.student_id')
            ->leftJoin('sections as sect', 'sect.id', '=', 'st.section_id')
            ->leftJoin('instructors as ins', 'ins.id', '=', 'subjects_enrolled.instructor_id')
            ->groupBy( 
                'sect.name',
                'sub.subject_code',
                'sub.title',
                'sub.credit_unit',
                'subjects_enrolled.class_schedule',
                'ins.name',
                'ins.email'
            )
            ->get();

            return response()->json($subjects);

        } catch (\Exception $e) {
            // Handle any errors like student not found
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function updateSchedule(Request $request, $id)
    {
        $request->validate([
            'class_schedule' => 'required|string|max:255',
        ]);

        $subjectEnrolled = SubjectEnrolled::findOrFail($id);

        $student = Student::findOrFail($subjectEnrolled->student_id);
        $section = Section::findorFail($student->section_id);
        $sectionName = $section->name;


        SubjectEnrolled::where('subject_id', $subjectEnrolled->subject_id)
            ->whereHas('student', function ($query) use ($sectionName) {
                $query->whereHas('section', function ($query) use ($sectionName) {
                    $query->where('name', $sectionName);
                });
            })
            ->update(['class_schedule' => $request->class_schedule]);

        return response()->json(['message' => 'Schedule updated successfully.']);
    }
}
