<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubjectEnrolled;

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
            $data = [
                'midterm_grade' => $request->midterm_grade !== '' ? $request->midterm_grade : null,
                'final_grade' => $request->final_grade !== '' ? $request->final_grade : null,
                'remarks' => $request->remarks !== '' ? $request->remarks : null,
            ];

            var_dump($data['midterm_grade']);
            var_dump($data['final_grade']);
            var_dump($data['remarks']);

            \DB::enableQueryLog();

            $subjectEnrolled = SubjectEnrolled::where('id', $subject_enrolled_id)
                ->update($data);

            $queries = \DB::getQueryLog();
            \Log::info($queries); // Log the queries to investigate

            if ($subjectEnrolled) {
                return response()->json(['message' => 'Grades updated successfully'], 200);
                
            } else {
                return response()->json(['message' => 'Student not found or unable to update grades'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update grades', 'error' => $e->getMessage()], 500);
        }
    }
}
