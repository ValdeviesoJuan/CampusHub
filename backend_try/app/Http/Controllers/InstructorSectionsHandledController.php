<?php

namespace App\Http\Controllers;

use App\Models\InstructorSectionsHandled;
use App\Models\Subject;
use App\Models\Instructor;
use App\Models\Section;
use App\Models\SchoolYear;
use App\Models\SubjectEnrolled;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class InstructorSectionsHandledController extends Controller
{
    public function index()
    {
        $instructorSectionsHandled = InstructorSectionsHandled::with(['subject', 'instructor', 'section', 'schoolYear'])->get();
        return response()->json($instructorSectionsHandled);
    }

    public function create()
    {
        $subjects = Subject::all();
        $instructors = Instructor::all();
        $sections = Section::all();
        $schoolYears = SchoolYear::all();

        return view('instructor_sections_handled.create', compact('subjects', 'instructors', 'sections', 'schoolYears'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'instructor_id' => 'required|exists:instructors,id',
            'section_id' => 'required|exists:sections,id',
            'school_year_id' => 'required|exists:school_years,id',
        ]);

        $instructorSectionHandled = InstructorSectionsHandled::create($validatedData);

        DB::table('subjects_enrolled')
            ->join('students', 'subjects_enrolled.student_id', '=', 'students.id')
            ->where('subjects_enrolled.subject_id', $request->subject_id)
            ->where('students.section_id', $request->section_id)
            ->where('students.school_year_id', $request->school_year_id)
            ->whereNull('subjects_enrolled.instructor_id')
            ->update(['subjects_enrolled.instructor_id' => $request->instructor_id]);

        return response()->json($instructorSectionHandled, 201);
    }

     /**
     * Display the specified resource.
     *
     * @param  \App\Models\InstructorSectionsHandled  $instructorSectionsHandled
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $instructorSectionHandled = InstructorSectionsHandled::with(['subject', 'instructor', 'section', 'schoolYear'])->findOrFail($id);
        return response()->json($instructorSectionHandled);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'instructor_id' => 'required|exists:instructors,id',
            'section_id' => 'required|exists:sections,id',
            'school_year_id' => 'required|exists:school_years,id',
        ]);

        $instructorSectionHandled = InstructorSectionsHandled::findOrFail($id);
        $instructorSectionHandled->update($validatedData);

        DB::table('subjects_enrolled')
            ->join('students', 'subjects_enrolled.student_id', '=', 'students.id')
            ->where('subjects_enrolled.subject_id', $request->subject_id)
            ->where('students.section_id', $request->section_id)
            ->where('students.school_year_id', $request->school_year_id)
            ->whereNull('subjects_enrolled.instructor_id')
            ->update(['subjects_enrolled.instructor_id' => $request->instructor_id]);

        return response()->json($instructorSectionHandled);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InstructorSectionsHandled  $instructorSectionsHandled
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $instructorSectionHandled = InstructorSectionsHandled::findOrFail($id);
        $instructorSectionHandled->delete();
        return response()->json(null, 204);
    }

    public function checkExistence(Request $request)
    {
        $exists = InstructorSectionsHandled::where('subject_id', $request->subject_id)
            ->where('instructor_id', $request->instructor_id)
            ->where('section_id', $request->section_id)
            ->where('school_year_id', $request->school_year_id)
            ->exists();

        return response()->json(['exists' => $exists]);
    }
}
