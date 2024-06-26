<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubjectEnrolled;
use App\Models\AdminSettings;

class GradeController extends Controller
{
    /**
     * Update the grades (midterm, final, remarks) for a specific student enrolled in a subject.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $studentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateGrade(Request $request, $subject_enrolled_id)
    {
        $request->validate([
            'midterm_grade' => 'nullable|string|max:10',
            'final_grade' => 'nullable|string|max:10',
            'remarks' => 'nullable|string|max:255',
        ]);

        try {
            // Check if grade submission is open
            $adminSettings = AdminSettings::firstOrFail();
            if (!$adminSettings->is_grade_submission_open) {
                return response()->json(['message' => 'Grade submission is closed'], 403);
            }

            $subjectEnrolled = SubjectEnrolled::findOrFail($subject_enrolled_id);

            if ($request->has('midterm_grade')) {
                if ($subjectEnrolled->is_midterm_submitted) {
                    return response()->json(['message' => 'Midterm grade has already been submitted'], 403);
                }
                $subjectEnrolled->midterm_grade = $request->midterm_grade !== '' ? $request->midterm_grade : null;
                $subjectEnrolled->is_midterm_submitted = true;
            }

            if ($request->has('final_grade')) {
                if ($subjectEnrolled->is_final_submitted) {
                    return response()->json(['message' => 'Final grade has already been submitted'], 403);
                }
                $subjectEnrolled->final_grade = $request->final_grade !== '' ? $request->final_grade : null;
                $subjectEnrolled->is_final_submitted = true;
            }

            if ($request->has('remarks')) {
                $subjectEnrolled->remarks = $request->remarks !== '' ? $request->remarks : null;
            }

            $subjectEnrolled->save();

            return response()->json(['message' => 'Grades posted successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update grades', 'error' => $e->getMessage()], 500);
        }
    }
}
