<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubjectEnrolled;
use App\Rules\Grade;


class SubjectEnrolledController extends Controller
{
    public function index()
    {
        $subjectsEnrolled = SubjectEnrolled::all();
        return response()->json($subjectsEnrolled);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'instructor_id' => 'nullable|exists:instructors,id',
            'class_schedule' => 'nullable|string|max:255',
            'midterm_grade' =>  ['nullable', new Grade],
            'final_grade' =>  ['nullable', new Grade],
            'remarks' => 'nullable|string|max:255',
        ]);

        $subjectEnrolled = SubjectEnrolled::create($validatedData);
        return response()->json($subjectEnrolled, 201);
    }

    public function show($id)
    {
        $subjectEnrolled = SubjectEnrolled::findOrFail($id);
        return response()->json($subjectEnrolled);
    }

    public function update(Request $request, $id)
    {
        $subjectEnrolled = SubjectEnrolled::findOrFail($id);

        $validatedData = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'instructor_id' => 'nullable|exists:instructors,id',
            'class_schedule' => 'nullable|string|max:255',
            'midterm_grade' => ['nullable', new Grade],
            'final_grade' => ['nullable', new Grade],
            'remarks' => 'nullable|string|max:255',
        ]);

        $subjectEnrolled->update($validatedData);
        return response()->json($subjectEnrolled);
    }

    public function destroy($id)
    {
        $subjectEnrolled = SubjectEnrolled::findOrFail($id);
        $subjectEnrolled->delete();
        return response()->json(null, 204);
    }
}
