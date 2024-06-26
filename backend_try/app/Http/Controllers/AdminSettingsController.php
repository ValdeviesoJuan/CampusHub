<?php

namespace App\Http\Controllers;

use App\Models\AdminSettings;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    /**
     * Update the admin settings.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSettings(Request $request)
    {
        try {
            $settings = AdminSettings::firstOrFail();

            $settings->update([
                'is_grade_submission_open' => $request->input('is_grade_submission_open', false),
            ]);

            return response()->json(['message' => 'Grade Submission updated successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update admin settings', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Fetch the admin settings.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchSettings()
    {
        try {
            $settings = AdminSettings::firstOrFail(); // Assuming only one row of admin settings

            return response()->json([
                'allowGradeSubmission' => (bool) $settings->is_grade_submission_open,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Admin settings not found'], 404);
        }
    }
}
